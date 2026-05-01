import { prisma } from "./prisma";
import { FlightStatus, PriorityLevel, AuditSeverity, GateSize, GateType, GateStatus } from "@prisma/client";

async function main() {
  console.log("🌪️ INITIALIZING HARDENED INSANE SEED...");

  // 1. Create Gates with different capabilities
  const gateData = [
    { name: "A101", terminal: "T1", zone: "NORTH", size: GateSize.LARGE, type: GateType.INTERNATIONAL, isVip: true, mapX: 150, mapY: 200, taxiTime: 3 },
    { name: "B202", terminal: "T1", zone: "NORTH", size: GateSize.MEDIUM, type: GateType.DOMESTIC, isVip: false, mapX: 325, mapY: 200, taxiTime: 4 },
    { name: "E999", terminal: "T1", zone: "INTERNATIONAL", size: GateSize.HEAVY, type: GateType.INTERNATIONAL, isVip: true, status: GateStatus.OPEN, mapX: 850, mapY: 300, taxiTime: 12 },
    { name: "G101", terminal: "T1", zone: "SOUTH", size: GateSize.SMALL, type: GateType.DOMESTIC, isVip: false, mapX: 150, mapY: 400, taxiTime: 8 },
    { name: "C303", terminal: "T1", zone: "SOUTH", size: GateSize.MEDIUM, type: GateType.DOMESTIC, isVip: false, mapX: 325, mapY: 400, taxiTime: 6 },
  ];

  for (const g of gateData) {
    await prisma.gate.upsert({
      where: { name: g.name },
      update: g as any,
      create: g as any,
    });
  }
  console.log("✅ Gates initialized with capabilities.");

  // 2. Create Flights with high-fidelity data
  const flights = [
    {
      number: "SW911",
      airline: "SkyWOW Air",
      aircraftType: "Boeing 777-300ER",
      origin: "Tokyo (NRT)",
      destination: "Sky Hub",
      departureTime: new Date(),
      arrivalTime: new Date(Date.now() + 14400000),
      status: FlightStatus.AI_OPTIMIZING,
      priority: PriorityLevel.EMERGENCY,
      isEmergency: true,
      impactScore: 95,
    },
    {
      number: "SW101",
      airline: "Oceanic Air",
      aircraftType: "Airbus A320",
      origin: "Sydney (SYD)",
      destination: "Sky Hub",
      departureTime: new Date(),
      arrivalTime: new Date(Date.now() + 7200000),
      status: FlightStatus.SCHEDULED,
      priority: PriorityLevel.NORMAL,
      impactScore: 40,
    }
  ];

  for (const f of flights) {
    // Find an appropriate gate for the seed
    const gate = await prisma.gate.findFirst({
      where: f.number === "SW911" ? { name: "B202" } : { name: "A101" }
    });

    const flight = await prisma.flight.upsert({
      where: { number: f.number },
      update: { ...f, gateId: gate?.id },
      create: { ...f, gateId: gate?.id },
    });

    // 3. Create initial milestones with ordering
    await prisma.flightMilestone.create({
      data: {
        flightId: flight.id,
        state: "SCHEDULED",
        order: 1,
        triggeredBy: "SYSTEM",
      }
    });

    // 4. Create an AI Audit Log entry with Severity
    await prisma.aiAuditLog.create({
      data: {
        flightId: flight.id,
        action: "INITIAL_SCAN",
        message: `Detected ${f.number} (${f.aircraftType}) with Impact Score ${f.impactScore}. Prioritizing...`,
        severity: AuditSeverity.INFO,
        confidenceScore: 0.98,
      }
    });
    
    if (f.isEmergency) {
       await prisma.aiAuditLog.create({
        data: {
          flightId: flight.id,
          action: "EMERGENCY_DETECTED",
          message: `CRITICAL: Flight ${f.number} is in Emergency state. High-impact re-evaluation triggered.`,
          severity: AuditSeverity.CRITICAL,
          confidenceScore: 1.0,
        }
      });
    }
  }

  console.log("✅ Hardened flights and audit logs seeded.");
  console.log("🚀 System is now ready for deep AI re-evaluation.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
