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
