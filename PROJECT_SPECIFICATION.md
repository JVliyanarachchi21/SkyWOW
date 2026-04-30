# ✈️ SkyWOW: Project Requirement Specification (PRS)
**Document Version:** 1.0.0  
**Author:** Janithi Liyanaarachchi (Full Team Lead)  
**Project Goal:** To engineer a next-generation, AI-driven Airport Management System using the A-CDM (Airport Collaborative Decision Making) framework.

---

## 👥 1. System Actors
To move beyond a "basic crud," we define actors with specific data-driven goals:

| Actor | Role | Objective |
| :--- | :--- | :--- |
| **Airport Manager (Admin)** | Human Authority | Overrides AI, handles emergencies, and sets VIP priorities. **"The Strategic Mind."** |
| **Ground Staff / Pilot** | Source of Truth | Updates real-time state changes (Boarding, Pushback). **"The Pulse of the Airport."** |
| **AI Dispatcher** | Background Brain | Constantly re-evaluates assignments, congestion, and delays. **"The Proactive Optimizer."** |
| **Passenger (User)** | Active Consumer | Interacts with smart gate changes and AI-recommended arrival times. **"The Informed Traveler."** |

---

## 🚀 2. Innovative Features (Beyond CRUD)
We focus on **Intelligence** over just "Reporting."

### A. Intelligent Gate Allocation (IGA)
*   **Problem:** Manual gate assignment is slow and often causes taxi-way congestion.
*   **Innovation:** Uses Gemini AI to match flights to gates based on aircraft size, turnaround time, and terminal distance.
*   **IPO (Input-Process-Output):**
    *   **Input:** Flight Schedule (Arrival/Departure times, Aircraft Type).
    *   **Process:** AI heuristic matches flight requirements to Gate capabilities.
    *   **Output:** An optimized "Execution Plan" on the Dashboard.

### B. The "Always Thinking" Dispatch Loop
*   **Innovation:** Unlike reactive systems, SkyWOW's AI runs in the background. It doesn't wait for a click; it monitors the ground truth and suggests shifts before delays happen.
*   **Interaction:** If Ground Staff reports a delay, the AI instantly triggers a "Gate Cascade" to prevent follow-up conflicts.

### C. Emergency & Priority Override
*   **Innovation:** A dedicated "Emergency Protocol" for Managers. When active, the AI yields all resources to the emergency flight, recalculating the entire airport's schedule in seconds.

---

## 🔄 3. The Dynamic Flight Lifecycle (The "How")
A flight in SkyWOW is not a static row in a database; it is a living entity with 9 critical states:

1.  **SCHEDULED**: Initial plan.
2.  **AI_OPTIMIZING**: AI is scanning for the most efficient gate.
3.  **ASSIGNED**: Gate is locked (AI or Manager).
4.  **IN_FLIGHT**: Approaching Sky Hub.
5.  **LANDED**: ATC confirmation (Ground Truth start).
6.  **DOCKING**: Real-time gate occupancy start.
7.  **BOARDING**: Ground staff state update.
8.  **READY_PUSHBACK**: Pilot state update.
9.  **DEPARTED**: Off the gate, resource released.

---

## 🛠 3. Technical Stack & Design System
We chose technologies that are used in **modern enterprise cockpits.**

*   **Frontend:** Next.js 14 (App Router) + Framer Motion (Animations).
*   **Backend:** Next.js Server Actions + API Routes.
*   **Database:** Prisma 7 + SQLite (Portable but powerful relational structure).
*   **Styling:** "Midnight Control Room" Design System.
    *   **Primary:** `#0F172A` (Deep Space Blue)
    *   **Accent:** `#22D3EE` (Cyan / UI Light)
    *   **Alert:** `#F59E0B` (Amber / Warning)
*   **Typography:** Inter / JetBrains Mono (For that "Radar" feel).

---

## 📅 4. Implementation Phases

### Phase 1: Foundation & "WOW" Factor (COMPLETED ✅)
*   Setup Next.js & Custom CSS Theme.
*   Build the High-Fidelity Landing Page & Dashboard Mockups.
*   **Status:** Git pushed to `develop`.

### Phase 2: The Intelligence Core (COMPLETED ✅)
*   Design Prisma Schema (Flights, Gates, Staff).
*   Implement Prisma 7 Adapter & Seed Data.
*   **Status:** Database is live and seeded.

### Phase 3: Integration & AI Handlers (IN PROGRESS 🏗️)
*   Connect Dashboard components to real-time API.
*   Implement `assign-gate` logic with Conflict Validation.
*   Integrate Gemini Pro for optimization suggestions.

### Phase 4: Passenger Experience & Final Polish
*   Real-time "Boarding" simulation.
*   Final animation tuning (transitions, hover effects).
*   Comprehensive Testing (Unit tests for AI logic).

---

## 📝 5. Research Notes: A-CDM Standard
Real-world airports focus on **Milestones**. 
1. **ATC Clearance** -> 2. **Boarding Start** -> 3. **Pushback Ready** -> 4. **Take-off**.
*SkyWOW will implement these milestones in the Flight Board to show real industry knowledge.*
