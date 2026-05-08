import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FlightStatus, SuggestionStatus, AuditSeverity, GroundState } from "@prisma/client";

interface RawSystemState {
  id: string;
  simulationSpeed: number;
  isAiAutonomous: boolean;
  weatherStatus: string;
}

export async function POST() {
  try {
    const now = new Date();

    // 1. Fetch System State (Raw SQL Bypass)
    const states = await prisma.$queryRaw<RawSystemState[]>`SELECT * FROM "SystemState" WHERE id = 'GLOBAL_STATE' LIMIT 1`;
    let rawState = states[0];

    if (!rawState) {
      await prisma.$executeRaw`
        INSERT INTO "SystemState" (id, "simulationSpeed", "isAiAutonomous", "weatherStatus", "lastPulseAt", "updatedAt")
        VALUES ('GLOBAL_STATE', 1, false, 'CLEAR', NOW(), NOW())
      `;
      const freshStates = await prisma.$queryRaw<RawSystemState[]>`SELECT * FROM "SystemState" WHERE id = 'GLOBAL_STATE' LIMIT 1`;
      rawState = freshStates[0];
    }

    // Mapping for logic
    const simulationSpeed = rawState.simulationSpeed ?? 1;
    const isAiAutonomous = rawState.isAiAutonomous ?? false;
    const weatherStatus = rawState.weatherStatus ?? "CLEAR";

    // 2. Advance Flight Lifecycle
    const activeFlights = await prisma.flight.findMany({
      where: {
        status: {
          notIn: [FlightStatus.DEPARTED]
        }
      }
    });

    const updates = [];
    const pulseAuditLogs: any[] = [];

    for (const flight of activeFlights) {
      // 1. Progress Impact Score for gateless flights
      if (!flight.gateId && flight.status !== FlightStatus.DEPARTED) {
        updates.push(prisma.flight.update({
          where: { id: flight.id },
          data: { impactScore: Math.min(flight.impactScore + (1 * simulationSpeed), 100) }
        }));
      }

      // 2. Transition: LANDED + Gate -> DOCKING
      if (flight.gateId && flight.status === FlightStatus.LANDED) {
        updates.push(prisma.flight.update({
          where: { id: flight.id },
          data: { status: FlightStatus.DOCKING }
        }));
      }

      // 3. Transition: AI_OPTIMIZING -> DOCKING/ASSIGNED
      if (flight.status === FlightStatus.AI_OPTIMIZING) {
        updates.push(prisma.flight.update({
          where: { id: flight.id },
          data: { status: FlightStatus.DOCKING }
        }));
      }

      // 4. Transition: DOCKING -> ASSIGNED (Start Ground Ops)
      if (flight.gateId && flight.status === FlightStatus.DOCKING) {
          updates.push(prisma.flight.update({
            where: { id: flight.id },
            data: { status: FlightStatus.ASSIGNED, groundState: GroundState.CLEANING }
          }));
      }
    }

    // 3. Autonomous AI Decisions
    if (isAiAutonomous) {
      const pendingSuggestions = await prisma.aiSuggestion.findMany({
        where: { status: SuggestionStatus.PENDING },
        include: { flight: true }
      });

      for (const suggestion of pendingSuggestions) {
        updates.push(prisma.flight.update({
          where: { id: suggestion.flightId },
          data: { 
            gateId: suggestion.newGateId,
            status: FlightStatus.AI_OPTIMIZING
          }
        }));

        updates.push(prisma.aiSuggestion.update({
          where: { id: suggestion.id },
          data: { status: SuggestionStatus.APPROVED }
        }));

        pulseAuditLogs.push({
          flightId: suggestion.flightId,
          action: "AUTONOMOUS_EXECUTION",
          message: `Aero-Mind Auto-Applied: Moved ${suggestion.flight.number} to Gate ${suggestion.newGateId} (System Mode: Autonomous).`,
          severity: AuditSeverity.INFO,
          confidenceScore: 1.0
        });
      }
    }

    if (updates.length > 0) {
      await Promise.all(updates);
    }

    if (pulseAuditLogs.length > 0) {
      await prisma.aiAuditLog.createMany({ data: pulseAuditLogs });
    }

    // 5. Update last pulse timestamp (Raw SQL Bypass)
    await prisma.$executeRaw`
      UPDATE "SystemState"
      SET "lastPulseAt" = NOW()
      WHERE id = 'GLOBAL_STATE'
    `;

    return NextResponse.json({
      status: "PULSE_SUCCESS",
      timestamp: now.toISOString(),
      eventsProcessed: updates.length,
      weatherEffect: weatherStatus
    });

  } catch (error: unknown) {
    console.error("PULSE ENGINE ERROR:", error);
    return NextResponse.json({ error: "Pulse Failed" }, { status: 500 });
  }
}
