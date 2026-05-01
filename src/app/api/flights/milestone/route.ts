import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GroundState, FlightStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { flightId, state, triggeredBy } = await req.json();

    if (!flightId || !state) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const currentState = state as GroundState;

    // 1. Update the Flight Ground Truth
    const updatedFlight = await prisma.flight.update({
      where: { id: flightId },
      data: {
        groundState: currentState,
        // If ground work is complete, move flight to next major lifecycle phase
        status: currentState === GroundState.COMPLETE ? FlightStatus.READY_PUSHBACK : undefined,
      },
    });

    // 2. Create the Milestone Audit Entry
    await prisma.flightMilestone.create({
      data: {
        flightId,
        state: currentState,
        triggeredBy: triggeredBy || "GROUND_STAFF",
        order: getMilestoneOrder(currentState),
      }
    });

    // 3. Log a system audit for the AI dispatcher to see
    await prisma.aiAuditLog.create({
      data: {
        flightId,
        action: "GROUND_UPDATE",
        message: `Flight ${updatedFlight.number} ground state updated to ${currentState} by ${triggeredBy || "staff"}.`,
        confidenceScore: 1.0,
      }
    });

    return NextResponse.json({ success: true, flight: updatedFlight });

  } catch (error) {
    console.error("MILESTONE ERROR:", error);
    return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
  }
}

function getMilestoneOrder(state: GroundState): number {
  switch (state) {
    case GroundState.CLEANING: return 10;
    case GroundState.REFUELING: return 20;
    case GroundState.BOARDING: return 30;
    case GroundState.COMPLETE: return 40;
    default: return 0;
  }
}
