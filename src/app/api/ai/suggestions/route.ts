import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SuggestionStatus } from "@prisma/client";

export async function GET() {
  try {
    const now = new Date();
    
    // 1. Auto-apply expired suggestions
    const expired = await prisma.aiSuggestion.findMany({
      where: {
        status: SuggestionStatus.PENDING,
        expiresAt: { lt: now }
      }
    });

    for (const s of expired) {
      await prisma.$transaction([
        prisma.flight.update({
          where: { id: s.flightId },
          data: { gateId: s.newGateId }
        }),
        prisma.aiSuggestion.update({
          where: { id: s.id },
          data: { status: SuggestionStatus.APPROVED }
        }),
        prisma.aiAuditLog.create({
          data: {
            flightId: s.flightId,
            action: "AUTO_APPROVE",
            message: "Decision window expired. System auto-applied optimized gate assignment.",
            confidenceScore: 1.0
          }
        })
      ]);
    }

    // 2. Fetch Active Suggestions with full gate info
    const suggestions = await prisma.aiSuggestion.findMany({
      where: { status: SuggestionStatus.PENDING },
      include: { 
        flight: {
          include: { gate: true }
        },
        newGate: true,
        oldGate: true
      }
    });

    // Format for UI
    const formatted = suggestions.map(s => ({
      ...s,
      newGateName: s.newGate.name
    }));
    
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET SUGGESTIONS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { suggestionId, action } = await req.json();

    if (action === 'APPROVE') {
      const suggestion = await prisma.aiSuggestion.findUnique({
        where: { id: suggestionId }
      });

      if (!suggestion) return NextResponse.json({ error: "Not found" }, { status: 404 });

      await prisma.$transaction([
        prisma.flight.update({
          where: { id: suggestion.flightId },
          data: { gateId: suggestion.newGateId }
        }),
        prisma.aiSuggestion.update({
          where: { id: suggestionId },
          data: { status: SuggestionStatus.APPROVED }
        }),
        prisma.aiAuditLog.create({
          data: {
            flightId: suggestion.flightId,
            action: "MANUAL_APPROVE",
            message: "Admin approved AI dispatch suggestion.",
            confidenceScore: 1.0
          }
        })
      ]);

      return NextResponse.json({ success: true });
    } else if (action === 'REJECT') {
      await prisma.aiSuggestion.update({
        where: { id: suggestionId },
        data: { status: SuggestionStatus.REJECTED }
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
