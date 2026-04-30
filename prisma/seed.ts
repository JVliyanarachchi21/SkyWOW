import { PrismaClient } from '../src/generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import fs from 'fs';

async function main() {
  console.log('🌱 Starting Dynamic Seed (SkyWOW v2)...');
  
  const adapterFactory = new PrismaBetterSqlite3({ url: 'C:/Users/USER/.gemini/antigravity/scratch/skywow-app/dev.db' });
  const prisma = new PrismaClient({ adapter: adapterFactory });

  try {
    // 1. Create Gates with Advanced Status
    const gates = await Promise.all([
      prisma.gate.upsert({
        where: { name: 'A101' },
        update: {},
        create: { name: 'A101', terminal: 'T1', status: 'OPEN' },
      }),
      prisma.gate.upsert({
        where: { name: 'B202' },
        update: {},
        create: { name: 'B202', terminal: 'T2', status: 'OPEN' },
      }),
      prisma.gate.upsert({
        where: { name: 'C303' },
        update: {},
        create: { name: 'C303', terminal: 'T3', status: 'MAINTENANCE' },
      }),
      prisma.gate.upsert({
        where: { name: 'E999' },
        update: {},
        create: { name: 'E999', terminal: 'T-VIP', status: 'EMERGENCY_ONLY' },
      }),
    ]);

    // 2. Create Dynamic Flights
    const flightData = [
      { 
        number: 'SW102', origin: 'LONDON', destination: 'SKY_HUB', 
        status: 'BOARDING', groundState: 'BOARDING', priority: 'NORMAL',
        gateId: gates[0].id 
      },
      { 
        number: 'SW777', origin: 'SINGAPORE', destination: 'SKY_HUB', 
        status: 'IN_FLIGHT', priority: 'VIP',
        gateId: gates[1].id 
      },
      { 
        number: 'SW911', origin: 'TOKYO', destination: 'SKY_HUB', 
        status: 'LANDED', priority: 'EMERGENCY', isEmergency: true,
        gateId: null 
      },
      { 
        number: 'SW001', origin: 'NEW YORK', destination: 'SKY_HUB', 
        status: 'AI_OPTIMIZING', priority: 'NORMAL',
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

    // 3. Create Staff
    const staffData = [
      { name: 'Janithi Liyanaarachchi', role: 'ADMIN', email: 'janithi@skywow.com' },
      { name: 'Alex Thompson', role: 'GROUND_CREW', email: 'alex@skywow.com' },
      { name: 'Commander Sky', role: 'PILOT', email: 'pilot@skywow.com' },
    ];

    for (const s of staffData) {
      await prisma.staff.upsert({
        where: { email: s.email },
        update: {},
        create: s,
      });
    }

    console.log('✅ Dynamic Seed finished successfully!');
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    const errorLog = `❌ SEED ERROR: ${e}\nStack: ${e.stack}\n`;
    fs.writeFileSync('./prisma/seed_error_internal.log', errorLog);
    process.exit(1);
  });
