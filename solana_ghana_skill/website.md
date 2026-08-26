# Solana Ghana Community Website — PRD
**Version:** 1.0  
**Status:** Ready to build  
**Owner:** Kwasi Awuah + Founding Team

---

## 1. Product Overview

A multi-page public website for the Solana Ghana Community — the primary entry point for Ghanaian builders, universities, sponsors, and the Solana Foundation to understand what the community is doing and how to join.

**Single job:** Convert visitors into community members, contributors, and partners.

---

## 2. Pages & Content Map

| Page | Primary audience | Key action |
|---|---|---|
| Home | Everyone | See the vision, join, discover ChainPay |
| Learn | Students, developers | Start the Solana Core Course |
| Build | Builders, partners | Discover projects, contribute |
| Security | Developers, sponsors | Understand the assurance culture |
| Events | Local community | Attend Q1 events |
| Community | Potential members | Join Discord/Telegram |

---

## 3. Design System

**Typography:**
- Display: Space Grotesk (weight 700–900, letter-spacing -0.04em)
- Body: Inter (weight 400–600)

**Color Palette:**
| Name | Hex | Role |
|---|---|---|
| Background | #07070C | Page canvas (warm near-black) |
| Surface | #0D0D16 | Raised sections, stats bar |
| Card | #11111C | Cards, containers |
| Ghana Gold | #FCD116 | Primary accent, headlines, CTAs |
| Ghana Green | #006B3F | Secondary accent, security events |
| Ghana Red | #CE1126 | Tertiary, security lab |
| Solana Green | #14F195 | "Live" tags, Solana references |
| Solana Purple | #9945FF | ChainPay gradient, protocol elements |
| Muted | #5A5A7A | Supporting text |
| MutedLight | #8888A8 | Body text on dark |

**Component rules:**
- Stadium cards: 40px border radius (Mastercard pattern)
- Pill buttons: 999px border radius
- Section cards: 22–28px border radius
- Ghost watermark: enormous gold text at 3.3% opacity behind each section
- Orbital arc: 0.75px gold SVG curve connecting team portraits
- Ghana flag stripe: 3px tricolor bar (Red/Gold/Green) on the hero bottom
- Eyebrow: 5px gold dot + uppercase 10px text, 0.12em tracking
- Dot grid texture: 34px spaced 1.3px radial-gradient dots in hero

---

## 4. Content Requirements

### Home
- Hero: "Akwaaba." (Ghana Gold, 108px) + mission statement (real, from founding doc)
- Stats: 4 founders, 1+ university, 30+ Q1 target, $200 self-funded
- Mission: "Not an event. Infrastructure." + 4 feature mini-cards
- ChainPay featured project card (live link: chainpay-frontend.onrender.com)
- Events preview: 3 Q1 events

### Learn
- Solana Core Course: 4-step curriculum (Rust → Solana → Anchor → Capstone)
- Based on open-source rssol-memory GitHub curriculum
- Ambassador program: responsibilities, recognition, growth path
- University partners: Ghana Telecom University (active), 2 TBD

### Build
- ChainPay featured (flagship, live on devnet)
- Akwaaba Faucet (in development)
- Ghana Speed Test (planning)
- Stablecoin Sandbox (concept)
- Ghana Stablecoin Payments Sandbox detail section

### Security
- Lab overview: assurance culture, zero tolerance policy
- 10 training topics (from founding doc verbatim)
- 6 lab events
- 5 public goods outputs
- 12-month targets (5 metrics)

### Events
- Q1 programme structure: Meetup → Workshop → Sprint → Demo
- 3 Q1 events with outcomes
- Future: Validator School Ghana (funding-dependent)

### Community
- Team: 4 founders (KA, BR1ANTT_, 2 TBD)
- Orbital arc between circular portraits
- Join channels: Discord, Telegram, GitHub
- Superteam Ghana vision statement

---

## 5. What Makes This Not Generic

1. "Akwaaba" (Twi for Welcome) prominently as the hero headline — culturally specific
2. Ghana flag tricolor stripe (Red/Gold/Green) on the hero
3. Ghana Gold (#FCD116) as the primary accent, not the crypto-default purple/blue
4. Real content from the founding doc — no placeholder stats
5. ChainPay as a real, live project with a working link
6. Honest framing: "$200 self-funded," "not officially recognized"
7. Ghost watermark text per section (Mastercard editorial gesture on dark)
8. Orbital arc connecting team portraits (Mastercard signature)
9. Adinkra-inspired dot-grid texture in hero
10. Local-specific content: Ghana Telecom University, Twi language in goods list

---

## 6. Technical Stack

- **Framework:** React (JSX artifact)
- **Styling:** Inline styles with design token object
- **Fonts:** Google Fonts (Space Grotesk + Inter)
- **Navigation:** useState-based routing, useEffect scroll-to-top
- **External link:** ChainPay live demo (target="_blank")
- **No dependencies beyond React**

---

## 7. Future Pages (not in v1)

- Blog / State of Solana Ghana Reports
- Events calendar with registration
- Member directory (opt-in)
- Solana Ghana Cup (inter-university competition)
- Bounties / contribution challenges