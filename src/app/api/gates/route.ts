import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const gates = await prisma.gate.findMany({
      include: {
        flights: {
          take: 1,
          orderBy: {
            departureTime: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json(gates);
  } catch (error) {
    console.error("API ERROR [GATES]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
