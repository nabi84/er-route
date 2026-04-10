## Quick Start (Run Locally)

### 1) Prerequisites
- Node.js 18+ (or 20+ recommended)
- npm 9+

### 2) Install and Run
```bash
git clone https://github.com/nabi84/er-route.git
cd er-route
npm install
npm run dev
```

### 3) Open in Browser
- Go to: `http://localhost:5173`

### 4) Optional Checks
```bash
npm run build
npm test
```

### Troubleshooting
- `Port 5173 already in use`: run `npm run dev -- --port 5174` and open `http://localhost:5174`
- `Node version error`: check with `node -v` and use Node 18+ (Node 20+ recommended)

---

ER Route

---

Who it’s for

ER Route is designed for people who need to make a fast decision about where to go for emergency care.

Primary users include:

* Parents seeking care for their children
* Individuals experiencing sudden symptoms
* Caregivers making decisions under pressure
* Travelers unfamiliar with nearby hospitals

These users are often:

* Under stress
* Time-constrained
* Lacking visibility into wait times or facility differences

---

Problem

When people need emergency care, they typically go to the **nearest ER**, not the **fastest one**.

This leads to:

* Long and unpredictable wait times
* Overcrowded emergency rooms
* Delayed treatment
* Increased stress during already critical moments

There is no simple way today to answer:

 “Where will I be treated the fastest for my situation?”

---

Solution

ER Route is a voice-first care routing experience that helps users quickly find the ER with the shortest time-to-treatment.

The product:

1. Captures context through a lightweight voice interaction
2. Calculates a recommended ER based on:

   * Travel time
   * Estimated wait time
   * Patient context
3. Presents a single, confident recommendation
4. Allows users to “Save their spot” through a guided intake experience before arrival

The experience is designed to:

* Reduce decision time to seconds
* Eliminate comparison fatigue
* Feel calm and assistive under stress

---

Why this matters

Emergency care is time-sensitive, but decision-making tools are not.

Most solutions today:

* Show lists of hospitals
* Require users to interpret complex information
* Do not optimize for actual treatment time

ER Route reframes the problem:

> The goal is not to find the closest ER — it’s to get treated faster.

By focusing on time-to-treatment, this product:

* Improves patient outcomes
* Reduces unnecessary waiting
* Distributes demand more efficiently across facilities

---

Key decisions and tradeoffs

1. Single recommendation vs list

* Chose to show one recommended ER instead of multiple options
* Tradeoff: less user control
* Benefit: faster decisions, reduced cognitive load

---

2. Voice-first interaction

* Prioritized voice to reduce friction in high-stress situations
* Tradeoff: not all users are comfortable with voice
* Mitigation: provided a manual input fallback

---

3. Simulated data instead of real integrations

* Used mocked data for wait times and routing
* Tradeoff: not production-accurate
* Benefit: allowed focus on UX, interaction design, and core product concept

---

4. Lightweight “Save Your Spot” instead of real check-in

* Designed a conversational pre-arrival intake
* Tradeoff: no real hospital integration
* Benefit: demonstrates how time-to-treatment can be reduced beyond navigation

---

5. Minimal feature scope

* Focused on a single end-to-end flow
* Tradeoff: no breadth of features
* Benefit: depth, polish, and clarity

---

What I intentionally didn’t build

* Real-time hospital integrations
* Full symptom checker or diagnosis system
* Insurance handling or cost estimation
* Account creation / login system
* Multi-option comparison flows
* Backend services or persistence

These were excluded to:

* Maintain focus on the core decision moment
* Prioritize experience quality over feature breadth

---

Next steps with more time

With more time, I would expand in three key areas:

1. Data accuracy and integrations

* Integrate real-time hospital wait times
* Improve time-to-treatment modeling
* Partner with health systems for data reliability

---

2. Save Your Spot → real pre-arrival workflow

* Send structured intake data to hospitals
* Enable true digital check-in
* Reduce on-site intake time

---

3. Personalization

* Save user preferences (e.g., pediatric defaults)
* Caregiver profiles
* History and repeat usage

---

4. Expanded care routing

* Urgent care and telehealth options
* Smarter triage guidance
* Broader healthcare navigation

---

5. System-level impact

* Better distribution of patient volume across ERs
* Insights for hospitals on demand patterns

---

Closing Thought

ER Route is built on a simple idea:
> In an emergency, people shouldn’t have to guess where to go.
