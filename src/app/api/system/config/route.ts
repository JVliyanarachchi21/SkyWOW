import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

interface RawSystemState {
  id: string;
  simulationSpeed: number;
  isAiAutonomous: boolean;
  weatherStatus: string;
  lastPulseAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    // BYPASS: Using Raw SQL to avoid Prisma Client sync issues
    const states = await prisma.$queryRaw<RawSystemState[]>`SELECT * FROM "SystemState" WHERE id = 'GLOBAL_STATE' LIMIT 1`;
    const rawState = states[0];

    if (!rawState) {
      await prisma.$executeRaw`
        INSERT INTO "SystemState" (id, "simulationSpeed", "isAiAutonomous", "weatherStatus", "lastPulseAt", "updatedAt")
        VALUES ('GLOBAL_STATE', 1, false, 'CLEAR', NOW(), NOW())
      `;
      return NextResponse.json({
        id: "GLOBAL_STATE",
        simulationSpeed: 1,
        isAiAutonomous: false,
        weatherStatus: "CLEAR",
        lastPulseAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Explicit Mapping for Frontend
    return NextResponse.json({
      id: rawState.id,
      simulationSpeed: rawState.simulationSpeed,
      isAiAutonomous: rawState.isAiAutonomous,
      weatherStatus: rawState.weatherStatus,
      lastPulseAt: rawState.lastPulseAt,
      updatedAt: rawState.updatedAt
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ 
      error: "Raw Config Load Failed", 
      details: message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // BYPASS: Direct SQL Update
    await prisma.$executeRaw`
      UPDATE "SystemState"
      SET "simulationSpeed" = ${body.simulationSpeed},
          "isAiAutonomous" = ${body.isAiAutonomous},
          "weatherStatus" = ${body.weatherStatus},
          "lastPulseAt" = NOW(),
          "updatedAt" = NOW()
      WHERE id = 'GLOBAL_STATE'
    `;

    const freshStates = await prisma.$queryRaw<RawSystemState[]>`SELECT * FROM "SystemState" WHERE id = 'GLOBAL_STATE' LIMIT 1`;
    const finalState = freshStates[0];

    return NextResponse.json({
      id: finalState.id,
      simulationSpeed: finalState.simulationSpeed,
      isAiAutonomous: finalState.isAiAutonomous,
      weatherStatus: finalState.weatherStatus,
      lastPulseAt: finalState.lastPulseAt,
      updatedAt: finalState.updatedAt
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Update Failed", details: message }, { status: 500 });
  }
}
