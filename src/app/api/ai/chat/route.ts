import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { message } = await req.json();

    // 1. Fetch current system state for context
    const [flightCount, gateCount, emergencyCount, lastAudit] = await Promise.all([
      prisma.flight.count(),
      prisma.gate.count(),
      prisma.flight.count({ where: { isEmergency: true } }),
      prisma.aiAuditLog.findFirst({ orderBy: { createdAt: 'desc' } })
    ]);

    // 2. Tactical Response Logic (Mocking LLM behavior with System Knowledge)
    const lowerMsg = message.toLowerCase();
    let response = "";
    let tacticalData = null;

    if (lowerMsg.includes("status") || lowerMsg.includes("summary")) {
      response = `System report for ${session.user?.name}. Currently tracking ${flightCount} active flight vectors across ${gateCount} resource nodes. ${emergencyCount > 0 ? `WARNING: ${emergencyCount} critical emergency states detected.` : "No critical threats currently active."} Last tactical move: ${lastAudit?.message || "None."}`;
    } else if (lowerMsg.includes("emergency") || lowerMsg.includes("conflict")) {
      const emergencies = await prisma.flight.findMany({ where: { isEmergency: true } });
      response = emergencies.length > 0 
        ? `Detecting ${emergencies.length} critical conflicts. Priority flight ${emergencies[0].number} is currently in RE-EVALUATION. AI Dispatcher is clearing path to optimal gating.`
        : "Scanning causality logs... No conflicts detected in the current 60-minute window.";
    } else if (lowerMsg.includes("gate") || lowerMsg.includes("congested")) {
      const gates = await prisma.gate.findMany({ include: { flights: true } });
      const busy = gates.filter(g => g.flights.length > 0).length;
      response = `Terminal occupancy is at ${Math.round((busy / gateCount) * 100)}%. Zone NORTH is seeing high traffic density. Recommend enabling Heatmap mode on the Tactical Map for spatial analysis.`;
      tacticalData = { occupancy: Math.round((busy / gateCount) * 100) };
    } else {
      response = "Acknowledged. Standing by for tactical directives. I can provide status reports, conflict summaries, or terminal occupancy analysis.";
    }

    return NextResponse.json({
      role: "assistant",
      content: response,
      timestamp: new Date().toISOString(),
      tacticalData
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);
    return NextResponse.json({ error: "Intelligence core offline" }, { status: 500 });
  }
}
