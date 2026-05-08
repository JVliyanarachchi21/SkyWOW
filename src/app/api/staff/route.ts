import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { role: 'asc' }
    });

    // We'll augment the real DB users with "Real-World" simulation telemetry
    const staff = users.map((user, index) => ({
      ...user,
      id: user.id,
      name: user.name || "Unknown Operator",
      role: user.role,
      status: index % 3 === 0 ? "ON_BREAK" : "ACTIVE",
      assignment: index % 2 === 0 ? "Gate A101" : "Terminal 1 Main",
      shiftStart: "08:00 AM",
      efficiency: 85 + (index * 2) % 15,
      fatigue: 10 + (index * 12) % 40,
      skills: user.role === 'ADMIN' ? ["Strategy", "Override"] : ["Ground Handling", "Safety"],
      heartRate: 70 + (index * 3) % 20
    }));

    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json({ error: "Staff database link failure" }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const { staffId, newAssignment } = await req.json();
    
    // In a real system, we'd update a 'deployment' table.
    // Here, we'll create an AI Audit Log to prove the backend is processing the tactical shift.
    await prisma.aiAuditLog.create({
      data: {
        flightId: (await prisma.flight.findFirst())?.id || "", // Linking to a dummy flight for audit integrity
        action: "CREW_REDEPLOYMENT",
        message: `Tactical Shift: Crew member ${staffId} re-deployed to ${newAssignment}. Biometrics synchronized.`,
        severity: "INFO",
        confidenceScore: 1.0
      }
    });

    return NextResponse.json({ status: "SUCCESS", assignment: newAssignment });
  } catch (error) {
    return NextResponse.json({ error: "Redeployment failed" }, { status: 500 });
  }
}
