import { PrismaClient } from '../src/generated/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import fs from 'fs';

async function main() {
  console.log('🌱 Starting seed (Prisma 7 PrismaBetterSqlite3 Factory)...');
  
  // Setup the driver adapter factory for Prisma 7
  const adapterFactory = new PrismaBetterSqlite3({ url: 'C:/Users/USER/.gemini/antigravity/scratch/skywow-app/dev.db' });
  
  // In Prisma 7, we pass the factory directly to the client
  // @ts-ignore - Prisma types might be evolving
  const prisma = new PrismaClient({ adapter: adapterFactory });

  try {
    // 1. Create Gates
    const gates = await Promise.all([
      prisma.gate.upsert({
        where: { name: 'A101' },
        update: {},
        create: { name: 'A101', terminal: 'TERMINAL 1', status: 'OPEN' },
      }),
      prisma.gate.upsert({
        where: { name: 'B202' },
        update: {},
        create: { name: 'B202', terminal: 'TERMINAL 2', status: 'OPEN' },
      }),
      prisma.gate.upsert({
        where: { name: 'C303' },
        update: {},
        create: { name: 'C303', terminal: 'TERMINAL 3', status: 'MAINTENANCE' },
      }),
    ]);

    // 2. Create Flights
    const flightData = [
      { number: 'SW102', origin: 'LONDON (LHR)', destination: 'SKY_HUB', status: 'ON TIME', gateId: gates[0].id },
      { number: 'SW245', origin: 'SKY_HUB', destination: 'TOKYO (HND)', status: 'BOARDING', gateId: gates[1].id },
      { number: 'SW981', origin: 'NEW YORK (JFK)', destination: 'SKY_HUB', status: 'DELAYED', gateId: null },
    ];

    for (const f of flightData) {
      await prisma.flight.upsert({
        where: { number: f.number },
        update: {},
        create: {
          ...f,
          departureTime: new Date(Date.now() + 3600000), // Mocking dates
          arrivalTime: new Date(Date.now() + 18000000),
        },
      });
    }

    // 3. Create Staff
    const staffData = [
      { name: 'Janithi Liyanaarachchi', role: 'ADMIN', email: 'janithi@skywow.com' },
      { name: 'Alex Thompson', role: 'GROUND_CREW', email: 'alex@skywow.com' },
      { name: 'Captain Sarah', role: 'PILOT', email: 'sarah@skywow.com' },
    ];

    for (const s of staffData) {
      await prisma.staff.upsert({
        where: { email: s.email },
        update: {},
        create: s,
      });
    }

    console.log('✅ Seed finished successfully!');
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
