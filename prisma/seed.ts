import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';
import { 
  FlightStatus, 
  PriorityLevel, 
  GroundState, 
  GateStatus,
  GateSize,
  GateType
} from '@prisma/client';

async function main() {
  console.log('🌱 Starting Dynamic Seed (SkyWOW v2)...');
  
  try {
    // 1. Create Gates with Advanced Status
    const gateData = [
      { name: 'A101', terminal: 'T1', zone: 'NORTH', status: GateStatus.OPEN, size: GateSize.MEDIUM, mapX: 150, mapY: 200, taxiTime: 3 },
      { name: 'B202', terminal: 'T1', zone: 'NORTH', status: GateStatus.OPEN, size: GateSize.MEDIUM, mapX: 325, mapY: 200, taxiTime: 4 },
      { name: 'C303', terminal: 'T1', zone: 'SOUTH', status: GateStatus.MAINTENANCE, size: GateSize.MEDIUM, mapX: 325, mapY: 400, taxiTime: 6 },
      { name: 'E999', terminal: 'T1', zone: 'INTERNATIONAL', status: GateStatus.EMERGENCY_ONLY, size: GateSize.HEAVY, mapX: 850, mapY: 300, taxiTime: 12 },
    ];

    const gates = [];
    for (const g of gateData) {
      const gate = await prisma.gate.upsert({
        where: { name: g.name },
        update: g as any,
        create: g as any,
      });
      gates.push(gate);
    }

    // 2. Create Dynamic Flights
    const flightData = [
      { 
        number: 'SW102', airline: 'SkyLink', aircraftType: 'Boeing 737', origin: 'LONDON', destination: 'SKY_HUB', 
        status: FlightStatus.BOARDING, groundState: GroundState.BOARDING, priority: PriorityLevel.NORMAL,
        gateId: gates[0].id 
      },
      { 
        number: 'SW777', airline: 'SkyLink', aircraftType: 'Boeing 777', origin: 'SINGAPORE', destination: 'SKY_HUB', 
        status: FlightStatus.IN_FLIGHT, priority: PriorityLevel.VIP,
        gateId: gates[1].id 
      },
      { 
        number: 'SW911', airline: 'SkyLink', aircraftType: 'Boeing 777', origin: 'TOKYO', destination: 'SKY_HUB', 
        status: FlightStatus.LANDED, priority: PriorityLevel.EMERGENCY, isEmergency: true,
        gateId: null 
      },
      { 
        number: 'SW001', airline: 'SkyLink', aircraftType: 'Boeing 737', origin: 'NEW YORK', destination: 'SKY_HUB', 
        status: FlightStatus.AI_OPTIMIZING, priority: PriorityLevel.NORMAL,
        gateId: null 
      },
    ];

    for (const f of flightData) {
      await prisma.flight.upsert({
        where: { number: f.number },
        update: {
          status: f.status,
          priority: f.priority,
          isEmergency: f.isEmergency || false,
          groundState: f.groundState || null,
          gateId: f.gateId
        },
        create: {
          ...f,
          departureTime: new Date(Date.now() + 3600000),
          arrivalTime: new Date(Date.now() + 18000000),
        },
      });
    }

    // 3. Create Users (Staff)
    const hashedPassword = await bcrypt.hash('skywow123', 10);

    const userData = [
      { name: 'Janithi Liyanaarachchi', role: 'ADMIN', email: 'janithi@skywow.com', password: hashedPassword },
      { name: 'Alex Thompson', role: 'GROUND_CREW', email: 'alex@skywow.com', password: hashedPassword },
      { name: 'Commander Sky', role: 'PILOT', email: 'pilot@skywow.com', password: hashedPassword },
    ];

    for (const u of userData) {
      await prisma.user.upsert({
        where: { email: u.email },
        update: {
          password: u.password,
          name: u.name,
          role: u.role as any
        },
        create: u,
      });
    }

    console.log('✅ Dynamic Seed finished successfully!');
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('❌ SEED ERROR:', e);
    process.exit(1);
  });
