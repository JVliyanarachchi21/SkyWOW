import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { flightId, gateId } = await request.json();

    if (!flightId || !gateId) {
      return NextResponse.json(
        { error: "Missing flightId or gateId" },
        { status: 400 }
      );
    }

    // 1. Check if the gate is available (Status Check)
    const gate = await prisma.gate.findUnique({
      where: { id: gateId },
      include: { flights: true }
    });

    if (!gate) {
      return NextResponse.json({ error: "Gate not found" }, { status: 404 });
    }

    if (gate.status !== "OPEN") {
      return NextResponse.json(
        { error: `Gate ${gate.name} is currently ${gate.status} and cannot accept flights.` },
        { status: 400 }
      );
    }

    // 2. Check for Occupancy (Conflict Check)
    // In a real system, we would check for time overlaps. 
    // For now, we'll check if any flight is currently assigned to this gate.
    const occupyingFlight = await prisma.flight.findFirst({
      where: { 
        gateId: gateId,
        NOT: { id: flightId } // Don't conflict with itself
      }
    });

    if (occupyingFlight) {
      return NextResponse.json(
        { error: `Gate Conflict! Flight ${occupyingFlight.number} is already at Gate ${gate.name}.` },
        { status: 409 }
      );
    }

    // 3. If clear, proceed with assignment
    const updatedFlight = await prisma.flight.update({
      where: { id: flightId },
      data: { gateId },
      include: { gate: true },
    });

    return NextResponse.json({
      message: "Flight assigned successfully",
      flight: updatedFlight
    });
  } catch (error) {
    console.error("API ERROR [ASSIGN_GATE]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
