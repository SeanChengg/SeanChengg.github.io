# West World Mechatronic — Professional Case Study
## Content Rewrite + Dapper Agency Layout Mapping

---

## PROJECT IDENTITY

**Project Name:** The Panel Head  
**Role:** Design Engineer — Mechanism Design, CAD, Prototyping, Embedded Control  
**Year:** 2024–2025  
**Tools:** Fusion 360, Zbrush, Arduino / ESP32, Three.js  

---

## SECTION-BY-SECTION CONTENT (Mapped to Dapper Agency Layout)

---

### SECTION 1 — HERO
**Dapper equivalent:** "We make the invisible visible" section

**Headline (large, split across lines):**

> Machines  
> don't need  
> *a human face*

**Subheadline / Descriptor (small text above headline — replaces "Data & Measurement"):**

> The Panel Head

**Body paragraph (replaces the Dapper "Tracking and attribution..." text):**

> Most social robots try to look human to communicate. This project takes a different path. Instead of mimicking skin and facial muscles, it uses a transparent, panel-based mechanical head to show that a robot's physical structure can be its own form of language.

**CTA Button:**

> See the process ↓

---

### SECTION 2 — PROJECT OVERVIEW
**Dapper equivalent:** "Our services" / "Your one-stop-shop..." section

**Section Label (small caps above heading):**

> The Problem

**Heading:**

> Why replicate what already exists?

**Body (2–3 short paragraphs):**

> Most humanoid robots today pursue the same goal: make the machine look and behave as close to a real human as possible. This requires high-fidelity silicone skins, dense actuator arrays mimicking facial muscle groups, and complex control systems — all to achieve an effect that inevitably falls into the uncanny valley.
>
> This project starts from a different premise. If the objective is functional human-machine interaction — not deception — then the machine does not need a human face. It needs a readable, mechanically honest interface that communicates state and intent through motion, without pretending to be something it is not.
>
> Inspired by the panel-based synthetic hosts depicted in HBO's *Westworld*, this design uses seven independently actuated face panels — driven by five geared four-bar linkage sets — to create a robotic head that is deliberately mechanical. There is no skin. There is no attempt at realism. The panels slide open and closed — mechanical motion, not simulated facial expression.

---

### SECTION 3 — PROCESS / PHASE 01
**Dapper equivalent:** Service card grid / Feature section

**Section Label:**

> Phase 01

**Heading:**

> Panel architecture and mechanism mapping

**Body:**

> The head is divided into six regions — midface (forehead to cheekbone to upper lip), left and right cheeks, and lower jaw — with seven panels driven by five mechanism sets. Each set uses the same core principle: an RDS3218 digital servo drives custom-profiled linkage arms, with meshed spur gears at the panel-end pivots — where the arms meet the panel connector — to keep them synchronized and prevent the panel from twisting or drifting under load. The RDS3218 was chosen for its availability, low cost, metal gear construction, 270° rotation range, and 18 kg·cm torque at 6V — more than sufficient for the loads involved. Three mechanism variants — midface, cheek, and jaw — each use a different number of linkage arms and gears, with arm profiles custom-shaped to suit each region's confined geometry and required panel trajectory, but all share the same servo-linkage-gear architecture.

**Key Metrics (displayed as a card grid, like Dapper service cards):**

| Metric | Value |
|--------|-------|
| Face panels | 7 panels across 6 regions |
| Mechanism sets | 5× geared four-bar linkages |
| Mechanism variants | 3 (midface, cheek, jaw) |
| Actuators | 5× RDS3218 metal gear digital servos |
| Servo torque | 18 kg·cm at 6V |
| Controller | Arduino Mega / ESP32 |
| CAD platform | Fusion 360 |

---

### SECTION 4 — FULL-WIDTH IMAGE BREAK
**Dapper equivalent:** Full-bleed image / video section

**Image:** Exploded CAD render showing all 8 panels separated from the skull, with labeled callouts for each linkage arm.

**Caption (optional overlay text):**

> Eight panels. Twelve degrees of freedom. Zero pretence.

---

### SECTION 5 — PROCESS / PHASE 02
**Dapper equivalent:** Second content block

**Section Label:**

> Phase 02

**Heading:**

> Iteration — rethinking the cheek mechanism

**Body:**

> The first revision exposed a fundamental constraint: the cheek panels required lateral displacement along a curved path that could not be achieved with a standard four-bar linkage. The available servo horn travel was insufficient, and the mechanism produced binding at the extremes of its range. Without gears at the distal pivots, the two arms moved at slightly different timings, causing the panel to twist and the linkage to shift axially under load.
>
> The second iteration introduced guiding spur gears at the distal pivot points, effectively creating a geared five-bar configuration. The meshed gears force the distal arms to counter-rotate in exact opposition, eliminating twist and preventing lateral displacement. Combined with custom-profiled linkage arms shaped to clear adjacent mechanisms inside the skull, the cheek panels now travel smoothly through their full stroke without binding. The RDS3218's metal gear output provides the additional rigidity needed at the servo end of the linkage, with its 270° rotation range allowing sufficient travel for the revised cheek panel trajectory.

---

### SECTION 6 — SIDE-BY-SIDE COMPARISON
**Dapper equivalent:** Two-column image + text layout

**Left column — Image:** Version 1 cheek mechanism (the transparent head with visible linkages from screenshot 1)

**Right column — Image:** Version 2 cheek mechanism (the improved spur-gear design from screenshot 2)

**Caption below:**

> Left: Phase 01 — four-bar linkage with spatial conflicts in the cheek region. Right: Phase 02 — six-bar linkage with spur-gear amplification. The revised mechanism is more compact and eliminates binding at full travel.

---

### SECTION 7 — DESIGN RATIONALE
**Dapper equivalent:** Detailed service description section

**Section Label:**

> Design Rationale

**Heading:**

> Why not just add a face?

**Body:**

> The conventional path in social robotics is to cover the mechanism with a silicone skin and tune the actuators until the result passes for human. This project deliberately rejects that path — for three reasons:
>
> **1. Transparency over deception.** A machine that looks human but behaves mechanically creates confusion. A machine that looks mechanical and behaves mechanically creates clarity. The user always knows what they are interacting with.
>
> **2. Simplicity over complexity.** Replicating human facial anatomy requires dozens of actuators, high-resolution sensors, and machine learning models trained on thousands of facial samples. A panel-based system achieves functional communication with eight servos, a single microcontroller, and zero machine learning. The barrier to entry — for researchers, students, and makers — drops by an order of magnitude.
>
> **3. A different vocabulary.** Human faces communicate through micro-expressions — subtle, high-bandwidth, culturally dependent. A panel-based head communicates through macro-movements — discrete, unambiguous, culturally neutral. A panel sliding open means one thing. A panel rotating means another. The vocabulary is small, learnable, and consistent.
>
> This is not a lesser version of a human face. It is a different kind of interface, designed for a different kind of interaction.

---

### SECTION 8 — TECHNICAL SPECIFICATIONS
**Dapper equivalent:** Brand statement / mission section

**Section Label:**

> Technical Specifications

**Heading:**

> Under the panels

**Specifications (displayed as a clean list or card layout):**

1. **Panel material:** 3D-printed PLA (prototyping) / Aluminium (final)
2. **Linkage material:** Laser-cut acetal (Delrin) — low friction, high fatigue life
3. **Servo specification:** RDS3218 — 18 kg·cm torque at 6V, metal gear, 270° rotation
4. **Communication protocol:** Serial UART → I²C multiplexer → PWM servo driver (PCA9685)
5. **Frame rate:** 30 FPS real-time control via ElectronBotStudio interface
6. **Power architecture:** 6V 10A regulated supply, capacitor bank for servo inrush current
7. **Assembly method:** Press-fit joints with M2 fasteners — fully disassemblable for maintenance

---

### SECTION 9 — INTERACTIVE DEMO
**Dapper equivalent:** Final showcase / CTA section (maps to ElectronBotStudio)

**Section Label:**

> Interactive Demo

**Heading:**

> Control the panel system

**Body:**

> The ElectronBotStudio interface provides real-time, browser-based control over every face panel. Adjust servo angles, sequence panel movements, and record keyframe animations — all rendered in a 3D viewport powered by Three.js. The interface was designed to make the mechanical behaviour of the head immediately understandable: move a slider, watch a panel respond.

**Embedded element:** ElectronBotStudio 3D interface (the existing `head.html` viewer, embedded as an iframe or full-width section)

---

### SECTION 10 — FOOTER / NEXT PROJECT
**Dapper equivalent:** "Next case" + footer section

**Next case link:** → Next Project (link to your next portfolio piece)

**Footer info:**

> © 2025 Sean Cheng · Design & Engineering Portfolio

---

## SIDEBAR NAVIGATION (Sticky Table of Contents)

Modeled after [crscao.com/ambulo-id](https://crscao.com/ambulo-id) — a sticky left-side nav that scrolls with the viewer and highlights the active section.

| # | Nav Title | Scrolls To |
|---|-----------|------------|
| 1 | Overview | Section 1 — Hero |
| 2 | The Problem | Section 2 — Project Overview |
| 3 | Panel Architecture | Section 3 — Phase 01 |
| 4 | Exploded View | Section 4 — Full-Width Image Break |
| 5 | Iteration | Section 5 — Phase 02 |
| 6 | Panel Movements | Section 6 — Side-by-Side (4-card turntable demo) |
| 7 | Design Rationale | Section 7 — Design Rationale |
| 8 | Technical Specs | Section 8 — Technical Specifications |
| 9 | Cost Breakdown | Section 8b — Cost Table |
| 10 | Interactive Demo | Section 9 — ElectronBotStudio |

Each title is a clickable link. On the live webpage, clicking a title smooth-scrolls to that section. The currently visible section's title is highlighted (bold or accent color).

---

## HOW TO MAP THIS ONTO THE DAPPER FIGMA LAYOUT

The Dapper agency template you imported into Figma already has these sections. Here's the direct mapping:

| Dapper Section | → Your Section | What to Change |
|---------------|---------------|----------------|
| "Data & Measurement" | "The Panel Head" | Replace subtitle text |
| "We make the invisible visible" | "Interaction without Imitation" | Replace hero headline |
| "Tracking and attribution..." paragraph | "Most social robots try to look human..." body text | Replace body copy |
| "Discover more" button | "See the process ↓" | Replace button text |
| "Our services" heading | "Design Process" section label | Replace section label |
| "Your one-stop-shop..." heading | "Why replicate what already exists?" | Replace heading |
| Service cards (Dashboarding, etc.) | Phase 01 metrics (Panels, Actuators, etc.) | Replace card titles + descriptions |
| Hero images (office, woman) | CAD renders of the robotic head | Replace with your renders |
| Additional content sections | Phase 02, Design Rationale, Technical Specs | Add or duplicate sections |
| Footer | Next Project + © Sean Cheng | Update footer text |

### Text nodes to update in Figma (from the scan):

| Layer ID | Current Text | → New Text |
|----------|-------------|------------|
| `435:111` | "Data & Measurement" | "The Panel Head" |
| `435:114` | "We" | "Interaction" |
| `435:116` | "make" | (remove — "without" goes on next line) |
| `435:118` | "the" | "without" |
| `435:120` | "invisible" | (remove — keep blank or merge into next) |
| `435:122` | "visible" | "Imitation" |
| `435:124` | "Tracking and attribution..." | "Most social robots try to look human to communicate. This project takes a different path. Instead of mimicking skin and facial muscles, it uses a transparent, panel-based mechanical head to show that a robot's physical structure can be its own form of language." |
| `435:125` | "Discover more" | "See the process" |
| `435:164` | "Our services" | "Design Process" |
| `435:167` | "Your" | "Eight" |
| `435:168` | "one-stop-shop" | "panels." |
| `435:188` | "Dashboarding" | "Panel Architecture" |
| `435:194` | "Server side tracking" | "Linkage Design" |
| `435:200` | "Self Reported Attribution" | "Servo Integration" |
| `435:206` | "CRM implementation..." | "Digital Control System" |

### Images to replace in Figma:

| Current Image | → Replace With |
|---------------|---------------|
| Office scene (left) | Transparent head render (side view — from screenshot 1) |
| Woman with headphones (right) | Front-facing head render with panels open (from screenshot 2) |
| Service card thumbnails | Close-up renders of each mechanism region |

---

## SUMMARY

This case study reframes your project from a casual description ("This project began with an interest in panel-based robotic faces...") into a professional engineering portfolio piece that:

1. **Opens with a clear position** — "Machines don't need a human face"
2. **Frames the problem** — why mimicking humans is the wrong goal for most applications
3. **Proposes an alternative** — a simpler, transparent, panel-based interface
4. **Documents the engineering iteration** — Phase 01 → Phase 02, with specific mechanism rationale
5. **Articulates the design rationale** — transparency over deception, simplicity over complexity, a different vocabulary
6. **Provides technical credibility** — specifications, materials, communication protocols
7. **Ends with an interactive demo** — ElectronBotStudio as the culminating experience

The tone throughout avoids words like "lifelike," "organic," "expressive," "emotional," or "human-like." The project is consistently framed as an *alternative* to those approaches — simpler, more honest, and designed for a different kind of interaction.
