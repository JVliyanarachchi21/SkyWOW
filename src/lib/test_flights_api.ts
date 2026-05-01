import { prisma } from "./prisma";

async function test() {
  try {
    const flights = await prisma.flight.findMany({
      include: { gate: true },
      orderBy: { departureTime: 'asc' }
    });
    console.log("✅ FLIGHTS FETCHED:", flights.length);
  } catch (error) {
    console.error("❌ FETCH FAILED:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
