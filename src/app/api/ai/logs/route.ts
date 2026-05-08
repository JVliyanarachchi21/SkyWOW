import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const flightId = searchParams.get("flightId");
    const gateId = searchParams.get("gateId");

    let logs = await prisma.aiAuditLog.findMany({
      where: flightId ? { flightId } : {},
      include: { flight: { select: { number: true } } },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    // Fallback: If searching for a specific flight yields no results, show recent global logs
    if (flightId && logs.length === 0) {
      logs = await prisma.aiAuditLog.findMany({
        include: { flight: { select: { number: true } } },
        orderBy: { createdAt: "desc" },
        take: 10
      });
    }

    return NextResponse.json(logs);
  } catch (error) {
    console.error("LOG FETCH ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch tactical logs" }, { status: 500 });
  }
}
