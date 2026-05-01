import { prisma } from "./prisma";
import { SuggestionStatus } from "@prisma/client";

async function test() {
  try {
    console.log("🔍 TESTING SUGGESTIONS API LOGIC...");
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
    console.log("✅ SUCCESS:", suggestions.length, "suggestions found.");
  } catch (error) {
    console.error("❌ FAILED:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
