# Next Stage — Mechatronics Integration Plan
## The Panel Head: Physical Build + Electronics + Test Run

---

## OVERVIEW

The CAD design and mechanism engineering are complete. This document covers the pragmatic next steps to go from digital model to working physical prototype — 3D printing, aluminum fabrication, electronics integration, and first test run.

---

## THE WIRING BLOCK DIAGRAM — PURPOSE & NEXT STAGE

The wiring block diagram maps the electronics architecture of the Panel Head — from the control interface down to the five face panel actuators. The ESP32 handles serial communication and translates commands into I²C signals for the PCA9685, which manages independent PWM output for each servo. The 6V power rail, buffered through a capacitor bank and stepped down for the logic side, ensures servos can draw peak current without destabilising the microcontroller. This is a system-level overview; the detailed connection work comes next — physically connecting the components, validating each servo channel, completing the control interface and its communication with the hardware, then installing the servos into the skull and calibrating each panel's range of motion.

---

## PHASE 1 — PHYSICAL FABRICATION

### 1A. 3D Printing (PLA Prototype Structure)

**Purpose:** Print the rough structural shell (skull, panel mounts, servo brackets) to validate fit, clearance, and assembly sequence before committing to final materials.

**Parts to print:**
| Part | Qty | Est. Print Time | Notes |
|------|-----|----------------|-------|
| Skull shell (split into 2–3 sections) | 1 set | 12–18 hrs | Print at 0.2mm layer height, 30% infill |
| Panel mounts / hinge brackets | 7 | 4–6 hrs total | 40% infill for rigidity |
| Servo mounting brackets (U-bracket adapters) | 5 | 2–3 hrs total | 60% infill — these take load |
| Bearing housings (3 bearings each) | 2 | 1–2 hrs total | Tight tolerance — test fit bearings |
| Cable routing clips | 10 | 1 hr | Quick prints for wire management |

**Print settings:**
- Material: PLA (1.75mm)
- Nozzle: 0.4mm
- Layer height: 0.2mm (structural), 0.12mm (bearing housings)
- Supports: Tree supports where needed
- Bed: 60°C, Nozzle: 210°C

**Estimated total print time: ~24–30 hours**

### 1B. Aluminum Fabrication (Linkage Components)

**Purpose:** Fabricate the functional linkage arms, rods, and geared components from 5052 aluminum.

**Per mechanism set (jaw reference — scale for other variants):**
| Process | Details | Qty |
|---------|---------|-----|
| Profile-cut parts | Waterjet or laser-cut from 3–4mm 5052 aluminum sheet | 9 |
| Rod stock | 6mm dia. aluminum rod, cut to length | 2 |
| Precision bends | 4 cold-formed bends per set | 4 bends |
| Drilled holes | Various sizes (M2, M3, bearing seats) | 23 |
| Threaded points | M2 and M3 tapped holes | 5 |
| TIG welded sub-assemblies | 2D-cut plates welded to rods | 2 assemblies |

**Total mechanism sets to fabricate: 5** (3 variants × appropriate quantities)
- 2× Midface mechanisms
- 2× Cheek mechanisms  
- 1× Jaw mechanism

**Spur gears:** Source pre-made modular spur gears (Module 0.5 or 0.8) or have them laser-cut from Delrin/acetal sheet.

---

## PHASE 2 — ELECTRONICS INTEGRATION

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CONTROL CHAIN                         │
│                                                          │
│  [PC/Browser]                                           │
│       │ USB Serial (115200 baud)                        │
│       ▼                                                  │
│  [ESP32 DevKit V1]                                      │
│       │ I²C (GPIO 21 SDA, GPIO 22 SCL)                 │
│       ▼                                                  │
│  [PCA9685 — 16-ch PWM Servo Driver]                     │
│       │ PWM (50Hz, 500–2500µs pulse)                    │
│       ├──→ CH0: Servo 1 — Jaw                           │
│       ├──→ CH1: Servo 2 — Midface Left                  │
│       ├──→ CH2: Servo 3 — Midface Right                 │
│       ├──→ CH3: Servo 4 — Left Cheek                    │
│       └──→ CH4: Servo 5 — Right Cheek                   │
│                                                          │
│  [6V 10A PSU] ──→ [Cap Bank] ──→ PCA9685 V+ terminal   │
│                                   → All servo V+        │
└─────────────────────────────────────────────────────────┘
```

### Wiring Specification

**I²C Bus (ESP32 → PCA9685):**
| ESP32 Pin | PCA9685 Pin | Wire Color (suggested) |
|-----------|-------------|----------------------|
| GPIO 21 | SDA | Blue |
| GPIO 22 | SCL | Yellow |
| 3.3V | VCC (logic) | Red |
| GND | GND | Black |

**Note:** Add 4.7kΩ pull-up resistors on SDA and SCL lines to 3.3V.

**Servo Power (PCA9685 → Servos):**
| PCA9685 Terminal | Connection | Notes |
|-----------------|------------|-------|
| V+ (screw terminal) | 6V PSU positive | Through capacitor bank |
| GND (screw terminal) | 6V PSU ground | Common ground with ESP32 |

**Capacitor Bank:**
- 3× 2200µF 16V electrolytic capacitors in parallel (or 4× 1000µF 10V)
- Placed across V+ and GND at the PCA9685 screw terminal
- Purpose: absorb inrush current when multiple servos activate simultaneously
- Without caps: voltage sag causes ESP32 brownout/reset

**Servo Connections (PCA9685 → RDS3225):**
| PCA9685 Channel | Servo | Mechanism | Linkage Variant |
|----------------|-------|-----------|-----------------|
| CH0 | Servo 1 | Jaw | Jaw type |
| CH1 | Servo 2 | Midface Left | Midface type |
| CH2 | Servo 3 | Midface Right | Midface type |
| CH3 | Servo 4 | Left Cheek | Cheek type (6-bar) |
| CH4 | Servo 5 | Right Cheek | Cheek type (6-bar) |

### Servo Specification — RDS3225

| Parameter | Value |
|-----------|-------|
| Model | RDS3225 |
| Torque | 25 kg·cm (at 6V) |
| Rotation | 270° |
| Gear type | Metal gear |
| Voltage | 4.8–6.8V |
| Speed | 0.16 sec/60° (at 6V) |
| Interface | Standard PWM (500–2500µs) |
| Connector | 3-pin (Signal / V+ / GND) |
| Mounting | Standard servo horn + screws |

---

## PHASE 3 — BILL OF MATERIALS (BOM)

### Electronics

| # | Component | Specification | Qty | Est. Unit Cost | Est. Total |
|---|-----------|--------------|-----|---------------|-----------|
| 1 | ESP32 DevKit V1 | 38-pin, USB-C, dual-core 240MHz | 1 | $10.00 | $10.00 |
| 2 | PCA9685 PWM Driver Board | 16-channel, I²C, Adafruit or equivalent | 1 | $12.00 | $12.00 |
| 3 | RDS3225 Servo | 18–25kg·cm, 270°, metal gear | 5 | $13–60 | $65–300 |
| 4 | 6V 10A Switching PSU | AC-DC, barrel jack or screw terminal | 1 | $18.00 | $18.00 |
| 5 | Electrolytic Capacitors | 2200µF 16V (×3) or 1000µF 10V (×4) | 3–4 | $0.50 | $2.00 |
| 6 | Resistors (I²C pull-ups) | 4.7kΩ ¼W | 2 | $0.10 | $0.20 |
| 7 | Breadboard (full-size) | 830 tie-points | 1 | $5.00 | $5.00 |
| 8 | Jumper wire kit | M-M, M-F, F-F assorted | 1 | $6.00 | $6.00 |
| 9 | USB-C cable | Data-capable, 1m | 1 | $5.00 | $5.00 |
| 10 | Toggle switch | SPST, panel mount, 10A rated | 1 | $3.00 | $3.00 |
| 11 | Barrel jack connector | 5.5×2.1mm, panel mount | 1 | $2.00 | $2.00 |
| 12 | Heat-shrink tubing | Assorted sizes | 1 set | $4.00 | $4.00 |
| | | | | **Electronics Subtotal** | **$132.20** |

### Mechanical (Per Mechanism Set — Jaw Reference)

| # | Component | Specification | Cost |
|---|-----------|--------------|------|
| 1 | Profile-cut aluminum parts | 9 parts, 5052 aluminum 3–4mm | $150.00* |
| 2 | 3D-printed bearing housings | 2 housings (3 bearings each) | $30.00 |
| 3 | Industrial fasteners & bearings | Assorted M2, M3, bearings | $82.75 |
| 4 | Servo (included in electronics) | — | — |
| | **Per-joint mechanical subtotal** | | **$262.75** |

*Multiply by 5 mechanism sets for full head:* **$1,313.75**

### 3D Printing

| # | Item | Material | Cost |
|---|------|----------|------|
| 1 | PLA filament | 1.75mm, ~2kg needed | $40.00 |
| 2 | Support material (if dual extrusion) | PVA or breakaway | $25.00 |
| | **3D Print Subtotal** | | **$65.00** |

### TOTAL PROJECT BUDGET

| Category | Cost |
|----------|------|
| Electronics | $132.20 |
| Mechanical (5 sets) | $1,313.75 |
| 3D Printing | $65.00 |
| Contingency (10%) | $151.10 |
| **TOTAL** | **$1,662.05** |

---

## PHASE 4 — ASSEMBLY SEQUENCE

### Step 1: Structural Verification (Week 1)
1. Print all PLA skull sections and panel mounts
2. Dry-fit all pieces — verify clearances, panel travel paths
3. Mark any interference points for CAD revision
4. Re-print corrected parts if needed

### Step 2: Mechanism Assembly (Week 2)
1. Receive fabricated aluminum linkages
2. Press-fit bearings into 3D-printed housings
3. Assemble each linkage set individually on the bench
4. Test each mechanism's range of motion by hand (no motors)
5. Verify gear mesh — gears should turn smoothly with no backlash

### Step 3: Electronics Bench Test (Week 2, parallel)
1. Wire ESP32 → PCA9685 on breadboard
2. Connect one servo to CH0
3. Upload basic sweep test firmware
4. Verify PWM signal with oscilloscope or logic analyzer (if available)
5. Connect all 5 servos, verify independent control
6. Test simultaneous motion — watch for voltage sag
7. Add capacitor bank if brownout occurs

### Step 4: Integration (Week 3)
1. Mount servos into PLA brackets inside skull
2. Connect linkage arms to servo horns
3. Route servo cables through skull interior
4. Connect all servo leads to PCA9685
5. Power up and run each mechanism individually
6. Calibrate servo zero positions (neutral panel state)
7. Map servo angle ranges to panel open/close positions

### Step 5: ElectronBotStudio Integration (Week 3–4)
1. Connect ESP32 to PC via USB
2. Configure serial communication (115200 baud)
3. Map ElectronBotStudio slider values → servo angle commands
4. Test real-time control: move slider → panel responds
5. Record first keyframe animation sequence
6. Fine-tune motion speed, easing, and panel synchronization

---

## PHASE 5 — FIRMWARE OUTLINE

### ESP32 Firmware (Arduino Framework)

```
Libraries needed:
- Wire.h (I²C)
- Adafruit_PWMServoDriver.h (PCA9685)

Setup:
- Initialize I²C on GPIO 21/22
- Initialize PCA9685 at address 0x40
- Set PWM frequency to 50Hz
- Set all servos to neutral position

Loop:
- Read serial commands from ElectronBotStudio
- Parse command format: "S<channel>:<angle>\n"
  Example: "S0:90\n" = Servo 0 to 90°
- Convert angle to PWM pulse width:
  pulse = map(angle, 0, 270, 500, 2500)
- Send to PCA9685 channel
- Respond with acknowledgment
```

### Command Protocol (Serial)
```
PC → ESP32:
  "S0:90"     → Set servo 0 to 90°
  "S3:180"    → Set servo 3 to 180°
  "A:90,45,120,120,60" → Set all 5 servos at once
  "H"         → Home all servos (neutral)
  "E"         → Emergency stop (disable PWM output)

ESP32 → PC:
  "OK"        → Command executed
  "ERR:msg"   → Error with description
```

---

## RISK ASSESSMENT

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| PLA parts too weak under servo load | Medium | Medium | Increase infill to 60–80% at load-bearing points; switch to PETG if needed |
| Servo inrush causes ESP32 brownout | High | High | Capacitor bank (included in BOM); stagger servo startup in firmware |
| Gear teeth don't mesh correctly | Medium | High | Order modular gears from supplier (don't fabricate); verify module matches CAD |
| I²C communication drops under noise | Low | Medium | Use shielded cable; keep I²C wires short (<30cm); add 4.7kΩ pull-ups |
| Aluminum parts don't fit PLA mounts | Medium | Medium | Print test jigs first; verify critical dimensions with calipers |
| USB serial latency causes jerky motion | Low | Low | Buffer commands on ESP32; implement interpolation between keyframes |

---

## IMMEDIATE SHOPPING LIST (Priority Order)

**Buy first (for bench testing):**
1. ESP32 DevKit V1 × 1
2. PCA9685 PWM driver board × 1
3. RDS3225 servo × 5
4. Breadboard + jumper wires
5. USB-C data cable

**Buy second (for power system):**
6. 6V 10A switching power supply
7. 1000µF 10V electrolytic caps × 4
8. Toggle switch + barrel jack

**Buy third (for build):**
9. PLA filament (2 kg)
10. M2 + M3 fastener kits
11. Bearings (per CAD spec)

---

*Document prepared as part of The Panel Head project — Next Stage Mechatronics Integration*
*Updated: March 2026*
