import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        gate: true,
        milestones: {
          orderBy: { timestamp: 'desc' },
          take: 5
        },
        auditLogs: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
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
