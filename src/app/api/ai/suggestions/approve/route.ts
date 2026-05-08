import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SuggestionStatus, FlightStatus, AuditSeverity } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { suggestionId } = await req.json();

    // 1. Fetch the suggestion
    const suggestion = await prisma.aiSuggestion.findUnique({
      where: { id: suggestionId },
      include: { flight: true }
    });

    if (!suggestion) {
      return NextResponse.json({ error: "Suggestion not found" }, { status: 404 });
    }

    // 2. Execute the change
    // We use a transaction to ensure atomic updates
    await prisma.$transaction([
      // Update the flight with the new gate
      prisma.flight.update({
        where: { id: suggestion.flightId },
        data: { 
          gateId: suggestion.newGateId,
          status: FlightStatus.AI_OPTIMIZING
        }
      }),
      // Mark suggestion as approved
      prisma.aiSuggestion.update({
        where: { id: suggestionId },
        data: { status: SuggestionStatus.APPROVED }
      }),
      // Log the manual execution
      prisma.aiAuditLog.create({
        data: {
          flightId: suggestion.flightId,
          action: "MANUAL_APPROVAL",
          message: `Admin approved re-deployment of ${suggestion.flight.number} to Gate ${suggestion.newGateId}.`,
          severity: AuditSeverity.INFO,
          confidenceScore: 1.0
        }
      })
    ]);

    return NextResponse.json({ status: "SUCCESS", message: "Decision executed." });

  } catch (error) {
    console.error("APPROVAL ERROR:", error);
    return NextResponse.json({ error: "Failed to apply decision" }, { status: 500 });
  }
}
