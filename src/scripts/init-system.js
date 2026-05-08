const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Initializing System State...");
  try {
    const state = await prisma.systemState.upsert({
      where: { id: "GLOBAL_STATE" },
      update: {},
      create: {
        id: "GLOBAL_STATE",
        simulationSpeed: 1,
        isAiAutonomous: false,
        weatherStatus: "CLEAR"
      }
    });
    console.log("System State Initialized:", state);
  } catch (error) {
    console.error("Initialization Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
