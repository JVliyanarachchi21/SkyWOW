# ✈️ SkyWOW: Project Requirement Specification (PRS)
**Document Version:** 1.0.0  
**Author:** Janithi Liyanaarachchi (Full Team Lead)  
**Project Goal:** To engineer a next-generation, AI-driven Airport Management System using the A-CDM (Airport Collaborative Decision Making) framework.

---

## 👥 1. System Actors
To move beyond a "basic crud," we define actors with specific data-driven goals:

| Actor | Role | Objective |
| :--- | :--- | :--- |
| **Airport Manager (Admin)** | Human | High-level decision making and system overrides. |
| **Ground Staff / Pilot** | Field | Update real-time status (Ready to Pushback, Boarding Complete). |
| **AI Dispatcher** | System | Automated optimization of gates and resources using Gemini Pro. |
| **Passenger (Guest)** | End-User | View real-time flight boards and "Smart-Gate" assignments. |

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

### B. Predictive Turnaround Monitoring (PTM)
*   **Innovation:** Real-time countdowns that alert when a flight is lagging behind its "Target Off-Block Time" (TOBT).
*   **Output:** Visual "Warning" pulses on the dashboard when a delay is predicted.

### C. Resource Congestion Analytics
*   **Innovation:** A heat-map simulation of gate occupancy over a 24-hour period.

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
