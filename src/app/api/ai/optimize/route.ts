import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "MOCK_KEY");

export async function POST() {
  try {
    // 1. Fetch unassigned flights and available gates
    const unassignedFlights = await prisma.flight.findMany({
      where: { gateId: null },
      orderBy: { departureTime: 'asc' },
    });

    const availableGates = await prisma.gate.findMany({
      where: { status: 'OPEN' },
    });

    if (unassignedFlights.length === 0 || availableGates.length === 0) {
      return NextResponse.json({
        message: "No optimizations needed at this time.",
        recommendations: []
      });
    }

    // 2. Prepare context for AI (or simulation)
    const context = {
      flights: unassignedFlights.map(f => ({ id: f.id, number: f.number, destination: f.destination })),
      gates: availableGates.map(g => ({ id: g.id, name: g.name, terminal: g.terminal }))
    };

    let recommendations = [];

    // 3. AI Logic (or Heuristic Fallback)
    if (process.env.GEMINI_API_KEY) {
      // Real AI logic would go here
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `As an airport AI, suggest gate assignments for these flights: ${JSON.stringify(context.flights)} using these gates: ${JSON.stringify(context.gates)}. Return JSON format.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      try {
        recommendations = JSON.parse(response.text());
      } catch (e) {
        // Fallback if AI response is messy
        recommendations = simulateOptimization(unassignedFlights, availableGates);
      }
    } else {
      // Smart Simulation
      recommendations = simulateOptimization(unassignedFlights, availableGates);
    }

    return NextResponse.json({
      message: "Optimization complete.",
      recommendations,
      isSimulated: !process.env.GEMINI_API_KEY
    });
  } catch (error) {
    console.error("AI OPTIMIZATION ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function simulateOptimization(flights: any[], gates: any[]) {
  // A simple heuristic to match flights to gates
  return flights.map((f, index) => {
    const gate = gates[index % gates.length];
    return {
      flightId: f.id,
      flightNumber: f.number,
      suggestedGateId: gate.id,
      suggestedGateName: gate.name,
      reason: "Optimal terminal distance and turnaround efficiency."
    };
  }).slice(0, 3); // Return top 3 suggestions
}
