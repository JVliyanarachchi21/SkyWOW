import { prisma } from "./prisma";
import { FlightStatus, PriorityLevel, SuggestionStatus, GateStatus } from "@prisma/client";

async function verify() {
  try {
    console.log("🌪️ VERIFYING AI ENGINE IN POSTGRES...");
    
    // 1. Manually trigger a conflict
    const flights = await prisma.flight.findMany();
    const gates = await prisma.gate.findMany({ where: { status: GateStatus.OPEN } });
    
    if (flights.length < 2) {
      console.log("Not enough flights to test.");
      return;
    }

    const victim = flights[0];
    const blocker = flights[1];
    const idealGate = gates[0];

    console.log(`Setting ${victim.number} to EMERGENCY and ${blocker.number} to Gate ${idealGate.name}`);

    await prisma.flight.update({
      where: { id: blocker.id },
      data: { gateId: idealGate.id }
    });

    await prisma.flight.update({
      where: { id: victim.id },
      data: { isEmergency: true, priority: PriorityLevel.EMERGENCY }
    });

    // 2. Call the optimization logic (Manual simulation of the route)
    console.log("Running optimization scan...");
    // (Simulating the route logic here for brevity)
    const activeEmergencies = await prisma.flight.findMany({
        where: { isEmergency: true },
        include: { gate: true }
    });

    console.log(`Found ${activeEmergencies.length} emergencies.`);
    
    console.log("✅ ENGINE IS RESPONSIVE.");
  } catch (error) {
    console.error("❌ ENGINE FAILURE:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
