import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { 
  FlightStatus, 
  PriorityLevel, 
  SuggestionStatus, 
  AuditSeverity, 
  GateStatus 
} from "@prisma/client";

export async function POST() {
  try {
    const now = new Date();

    // 1. Fetch current state with full context
    const [flights, gates] = await Promise.all([
      prisma.flight.findMany({
        include: { gate: true },
        where: {
          OR: [
            { status: { notIn: [FlightStatus.DEPARTED, FlightStatus.LANDED] } },
            { status: FlightStatus.LANDED, gateId: null }
          ]
        }
      }),
      prisma.gate.findMany()
    ]);

    // Clear old pending suggestions
    await prisma.aiSuggestion.deleteMany({
      where: { status: SuggestionStatus.PENDING }
    });

    const suggestions: any[] = [];
    const auditLogs: any[] = [];
    const lockedGateIds = new Set<string>();

    // Sort flights by priority: EMERGENCY > VIP > NORMAL
    const sortedFlights = [...flights].sort((a, b) => {
      const pA = a.isEmergency ? 3 : a.priority === PriorityLevel.VIP ? 2 : 1;
      const pB = b.isEmergency ? 3 : b.priority === PriorityLevel.VIP ? 2 : 1;
      return pB - pA;
    });

    // 2. The Recursive Cascade Engine
    for (const flight of sortedFlights) {
      if (flight.isEmergency || flight.priority === PriorityLevel.VIP) {
        // High priority flights demand optimal gates
        const idealGate = gates
          .filter(g => g.status === GateStatus.OPEN || g.status === GateStatus.EMERGENCY_ONLY)
          .sort((a, b) => a.taxiTime - b.taxiTime)[0];

        if (idealGate && flight.gateId !== idealGate.id && !lockedGateIds.has(idealGate.id)) {
          const occupant = sortedFlights.find(f => f.gateId === idealGate.id && f.id !== flight.id);

          if (occupant) {
            // RIPPLE EFFECT: Displace the occupant to the next best available gate
            const nextBestGate = gates.find(g => 
              g.id !== idealGate.id && 
              g.status === GateStatus.OPEN &&
              !sortedFlights.some(f => f.gateId === g.id) &&
              !lockedGateIds.has(g.id)
            );

            if (nextBestGate) {
              suggestions.push({
                flightId: occupant.id,
                oldGateId: occupant.gateId,
                newGateId: nextBestGate.id,
                reason: `TACTICAL CASCADE: Displaced by Priority Flight ${flight.number} to Gate ${idealGate.name}.`,
                status: SuggestionStatus.PENDING,
                expiresAt: new Date(now.getTime() + 15000)
              });
              
              lockedGateIds.add(nextBestGate.id);
              
              auditLogs.push({
                flightId: occupant.id,
                action: "EMERGENCY_CASCADE",
                message: `Ripple effect: Moving ${occupant.number} to ${nextBestGate.name} to preserve tactical priority for ${flight.number}.`,
                severity: AuditSeverity.WARNING,
                confidenceScore: 0.98
              });
            }
          }

          // Assign the Priority Flight
          suggestions.push({
            flightId: flight.id,
            oldGateId: flight.gateId,
            newGateId: idealGate.id,
            reason: `OPTIMIZATION: Assigning optimal Gate ${idealGate.name} based on ${flight.isEmergency ? 'EMERGENCY' : 'VIP'} status.`,
            status: SuggestionStatus.PENDING,
            expiresAt: new Date(now.getTime() + 15000)
          });

          lockedGateIds.add(idealGate.id);

          auditLogs.push({
            flightId: flight.id,
            action: "OPTIMIZATION",
            message: `Locked ${flight.number} to Gate ${idealGate.name}. Taxi-time: ${idealGate.taxiTime}m.`,
            severity: flight.isEmergency ? AuditSeverity.CRITICAL : AuditSeverity.INFO,
            confidenceScore: 1.0
          });
        } else if (flight.gateId) {
          lockedGateIds.add(flight.gateId);
        }
      } else if (flight.gateId) {
        // Standard flights keep their gates if not displaced
        lockedGateIds.add(flight.gateId);
      } else {
        // UNASSIGNED FLIGHTS: Find them a home
        const availableGate = gates.find(g => 
          g.status === GateStatus.OPEN && 
          !sortedFlights.some(f => f.gateId === g.id) &&
          !lockedGateIds.has(g.id) &&
          !suggestions.some(s => s.newGateId === g.id)
        );

        if (availableGate) {
          suggestions.push({
            flightId: flight.id,
            oldGateId: null,
            newGateId: availableGate.id,
            reason: `AUTO-ASSIGN: Aligning unassigned flight ${flight.number} to Gate ${availableGate.name}.`,
            status: SuggestionStatus.PENDING,
            expiresAt: new Date(now.getTime() + 15000)
          });
          lockedGateIds.add(availableGate.id);
        }
      }
    }

    // 3. Save and Respond
    if (suggestions.length > 0) {
      // Use individual creates to ensure proper lifecycle handling (uuid, updatedAt)
      await Promise.all([
        ...suggestions.map(s => prisma.aiSuggestion.create({ data: s })),
        ...auditLogs.map(a => prisma.aiAuditLog.create({ data: a }))
      ]);
    }

    return NextResponse.json({
      status: "SUCCESS",
      message: suggestions.length > 0 ? "CASCADE TRIGGERED" : "OPTIMAL",
      suggestions,
      count: suggestions.length
    });

  } catch (error) {
    console.error("AI ENGINE ERROR:", error);
    return NextResponse.json({ error: "Cascade Failed" }, { status: 500 });
  }
}
