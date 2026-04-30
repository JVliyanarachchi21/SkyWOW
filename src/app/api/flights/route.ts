import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        gate: true,
      },
      orderBy: {
        departureTime: 'asc',
      },
    });

    return NextResponse.json(flights);
  } catch (error) {
    console.error("API ERROR [FLIGHTS]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
