import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const events = await prisma.aiAuditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        flight: true
      }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("EVENTS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
