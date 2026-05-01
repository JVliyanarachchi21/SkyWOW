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

    // 1. Fetch current state
    const flights = await prisma.flight.findMany({
      include: { gate: true },
      where: {
        status: {
          notIn: [FlightStatus.DEPARTED, FlightStatus.LANDED]
        }
      }
    });

    const gates = await prisma.gate.findMany();

    // Clear old pending suggestions to refresh the brain
    await prisma.aiSuggestion.deleteMany({
      where: { status: SuggestionStatus.PENDING }
    });

    const suggestions = [];
    const auditLogs = [];
    const displacedGateIds = new Set<string>();

    // 2. Intelligence Logic: Emergency & Priority Re-Evaluation
    const emergencies = flights.filter(f => f.isEmergency || f.priority === PriorityLevel.EMERGENCY);
    
    for (const flight of emergencies) {
      // Find the "Ideal" gate: Lowest taxiTime + Capability Match
      const availableGates = gates.filter(g => g.status === GateStatus.OPEN || g.status === GateStatus.EMERGENCY_ONLY);
      
      const idealGate = availableGates
        .sort((a, b) => a.taxiTime - b.taxiTime)[0] || gates[0];
      
      if (idealGate && flight.gateId !== idealGate.id) {
        // CONFLICT DETECTION
        const occupant = flights.find(f => f.gateId === idealGate.id);
        
        if (occupant && occupant.id !== flight.id) {
          // RIPPLE EFFECT: Displace the occupant
          const alternativeGate = gates.find(g => 
            g.id !== idealGate.id && 
            !flights.some(f => f.gateId === g.id) &&
            !displacedGateIds.has(g.id)
          );

          if (alternativeGate) {
            suggestions.push({
              flightId: occupant.id,
              oldGateId: occupant.gateId,
              newGateId: alternativeGate.id,
              reason: `EMERGENCY OVERRIDE: Displaced by ${flight.number}`,
              status: SuggestionStatus.PENDING,
              expiresAt: new Date(now.getTime() + 10000)
            });
            
            displacedGateIds.add(alternativeGate.id);

            auditLogs.push({
              flightId: occupant.id,
              action: "EMERGENCY_CASCADE",
              message: `Moving ${occupant.number} to ${alternativeGate.name} to clear path for Emergency ${flight.number}.`,
              severity: AuditSeverity.WARNING,
              confidenceScore: 0.95
            });
          }
        }

        // Assign the Emergency Flight
        suggestions.push({
          flightId: flight.id,
          oldGateId: flight.gateId,
          newGateId: idealGate.id,
          reason: "CRITICAL: Emergency priority gate assignment required.",
          status: SuggestionStatus.PENDING,
          expiresAt: new Date(now.getTime() + 10000)
        });

        auditLogs.push({
          flightId: flight.id,
          action: "OPTIMIZATION",
          message: `Prioritizing ${flight.number} for Gate ${idealGate.name} due to EMERGENCY status.`,
          severity: AuditSeverity.CRITICAL,
          confidenceScore: 1.0
        });

        // Update last optimized timestamp
        await prisma.flight.update({
          where: { id: flight.id },
          data: { lastOptimizedAt: now }
        });
      }
    }

    // 3. Save Decisions to DB
    if (suggestions.length > 0) {
      await prisma.aiSuggestion.createMany({
        data: suggestions
      });
      
      await prisma.aiAuditLog.createMany({
        data: auditLogs
      });
    }

    return NextResponse.json({
      status: "SUCCESS",
      message: suggestions.length > 0 ? "RE-EVALUATING..." : "STABLE",
      suggestions,
      timestamp: now.toISOString()
    });

  } catch (error) {
    console.error("AI ENGINE ERROR:", error);
    return NextResponse.json({ error: "Optimization Failed" }, { status: 500 });
  }
}
