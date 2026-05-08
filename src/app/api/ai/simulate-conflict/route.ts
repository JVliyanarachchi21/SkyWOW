import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PriorityLevel, FlightStatus } from "@prisma/client";

export async function POST() {
  try {
    console.log("🌪️ SIMULATING SYSTEM CONFLICT...");

    // 1. Reset all flights to NORMAL and assign them to various gates
    const allFlights = await prisma.flight.findMany();
    const allGates = await prisma.gate.findMany({ where: { status: 'OPEN' } });

    if (allFlights.length < 2 || allGates.length < 2) {
      return NextResponse.json({ error: "Need at least 2 flights and 2 gates for conflict." }, { status: 400 });
    }

    // Reset states
    await prisma.flight.updateMany({
      data: {
        priority: PriorityLevel.NORMAL,
        isEmergency: false,
        status: FlightStatus.SCHEDULED
      }
    });

    // 2. Pick a "Victim" (to be emergency) and a "Blocking" flight
    const victim = allFlights[0];
    const blocker = allFlights[1];
    
    // Pick the "Best" gate (e.g., E999)
    const idealGate = allGates.find(g => g.name.startsWith('E')) || allGates[0];

    // 3. Put the Blocker at the Ideal Gate
    await prisma.flight.update({
      where: { id: blocker.id },
      data: { gateId: idealGate.id, status: FlightStatus.ASSIGNED }
    });
    
    // Reset victim gate to null to force a new tactical assignment
    await prisma.flight.update({
      where: { id: victim.id },
      data: { gateId: null }
    });

    // 4. Set the Victim to EMERGENCY
    await prisma.flight.update({
      where: { id: victim.id },
      data: { 
        priority: PriorityLevel.EMERGENCY, 
        isEmergency: true,
        status: FlightStatus.AI_OPTIMIZING
      }
    });

    // 5. Trigger the AI Engine immediately
    // Note: We'll call the logic directly or just let the dashboard poll it
    // For this build, we'll return the setup state
    
    return NextResponse.json({
      message: "CRISIS SIMULATED: Flight " + victim.number + " is in EMERGENCY. Flight " + blocker.number + " is blocking Gate " + idealGate.name + ".",
      victimId: victim.id,
      blockerId: blocker.id,
      gateName: idealGate.name
    });

  } catch (error) {
    console.error("SIMULATION ERROR:", error);
    return NextResponse.json({ error: "Simulation failed" }, { status: 500 });
  }
}
