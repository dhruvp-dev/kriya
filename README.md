# KRIYA — Action Into Progress

> **Premium Aesthetic SaaS × Productivity × RPG Progression**  
> Handle personal progression without the habit app chaos. Turn daily action into compound momentum.

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-SSR_%26_Postgres-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

---

## 🌟 Overview & Hackathon Submission

Most habit trackers fail because they either feel like **punitive chore lists** that users abandon after two weeks, or they lean into **gimmicky pixel-art games** that feel awkward and infantilizing for ambitious builders, creators, and professionals.

**KRIYA** reimagines personal productivity by merging the **sleek, focused elegance of modern SaaS** (Linear, Raycast, Notion) with the **intrinsic psychological rewards of RPG character progression**. 

In Kriya, your real-world tasks and recurring habits are quests. Completing them compounds real RPG attributes (*Strength*, *Intellect*, *Discipline*, *Creativity*), levels up your character, unlocks cosmetic rewards in the shop, and earns your place on the global podium leaderboard.

---

## 🚀 Key Features

### 1. Dual-System Avatar Engine (Blob & Pixel)
- **8 Distinct Persona Archetypes**:
  - 🏛️ **The Architect**: Systemic planning, structure, and vision.
  - 📚 **The Scholar**: Deep focus, intellect, and relentless curiosity.
  - 🛠️ **The Maker**: Craftsmanship, tactile execution, and hands-on grit.
  - 🏃 **The Runner**: Energy, physical vitality, and endurance.
  - 🎨 **The Creator**: Unbounded imagination, aesthetics, and expressive flow.
  - 🏗️ **The Builder**: Heavy construction, scalable engineering, and velocity.
  - 🧭 **The Explorer**: Novel pathways, adaptability, and high discovery.
  - ♟️ **The Strategist**: Long-range foresight, tactical precision, and leverage.
- **Dual Visual Modes**: Switch seamlessly between modern, playful **SVG Blob Avatars** and nostalgic **Pixel Avatars**.
- **Cosmetic Frames**: Unlock dynamic corner frames (*Default*, *Coral Notch*, *Navy Tech*, *Seasonal Star*, *Gold Tier*, *Achievement Emerald*) earned through consistency.

### 2. Deep RPG Progression System
- **4 Compounding Attributes**: Every quest attributes XP to one of four core pillars:
  - **Strength**: Physical fitness, health, and stamina.
  - **Intellect**: Coding, reading, analysis, and problem-solving.
  - **Discipline**: Habit consistency, deep work sessions, and routines.
  - **Creativity**: Writing, design, brainstorming, and innovation.
- **Dynamic Difficulty Tiers**: Easy (+15 XP, +5 Gold), Medium (+30 XP, +10 Gold), Hard (+60 XP, +25 Gold), Epic (+120 XP, +60 Gold).
- **Timezone-Aware Streak Engine**: Accurately tracks consecutive active days without timezone drift or punishing edge cases.

### 3. Visual Podium Leaderboard
- **Top 3 Spotlight Podium**: Visually dominant podium highlighting rank 1, 2, and 3 with custom tier badges, level indicators, and XP tallies.
- **Ranked Productivity Feed**: Transparent global ranking powered by Supabase with live rank delta tracking.

### 4. Economy, Shop & Inventory
- **In-Game Gold Currency**: Earn gold exclusively through completed quests and achievements.
- **Cosmetic Shop**: Spend gold on exclusive avatar frames, badges, and profile accents.
- **Full Inventory System**: Equip and unequip owned items with instant preview reflection.

### 5. Milestone Achievements & Quests History
- **Automatic Trigger Engine**: Unlocks achievements for first quest completed, level thresholds, streak milestones, and total gold accumulated.
- **Confetti & Level-Up Celebrations**: Instant, tactile feedback upon leveling up or reaching streak records.
- **Completion Audit Trail**: Detailed chronological history of completed quests and attribute deltas.

---

## 🛠️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js 15 App Router                   │
│   (React 19 Server Components + Client Islands + Actions)   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
    ┌──────────▼──────────┐        ┌──────────▼──────────┐
    │  Tailwind CSS UI    │        │ Server Actions API  │
    │  • Plus Jakarta     │        │ • auth.ts           │
    │  • Satoshi Brand    │        │ • quests.ts         │
    │  • Framer Motion    │        │ • shop.ts           │
    │  • Phosphor / Lucide│        │ • character.ts      │
    └─────────────────────┘        └──────────┬──────────┘
                                              │
                                   ┌──────────▼──────────┐
                                   │  Supabase Backend   │
                                   │  • Postgres DB      │
                                   │  • SSR Auth Cookies │
                                   │  • Row Level Sec    │
                                   └─────────────────────┘
```

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15.1 (App Router) | Server-rendered speed, static route optimization, modern routing |
| **UI Library** | React 19 | Cutting-edge concurrent rendering and state primitives |
| **Styling** | Tailwind CSS 3.4 | Ultra-custom palette (`#070709`, `#F9FAFB`, `#1D64EC`), responsive layout |
| **Animation** | Framer Motion & Canvas Confetti | Smooth micro-interactions, level-up celebration overlays |
| **Icons** | Phosphor Icons & Lucide React | High-contrast, clean iconography across SaaS navigation |
| **Backend & DB** | Supabase (PostgreSQL) | Secure user authentication, relational schemas, SSR session management |
| **Type Safety** | TypeScript 5 & Zod | Strict end-to-end typing from database schemas to client components |

---

## 📦 Project Structure

```
kriya/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx         # Sleek sign-in portal
│   │   └── signup/page.tsx        # Onboarding & archetype selector
│   ├── achievements/page.tsx      # Unlocked badges & rewards
│   ├── avatars/page.tsx           # Full-screen avatar customizer
│   ├── character/page.tsx         # Attribute radar & character stats
│   ├── dashboard/page.tsx         # Main quest hub & daily overview
│   ├── history/page.tsx           # Quest completion audit log
│   ├── inventory/page.tsx         # Equipped cosmetic frames & badges
│   ├── leaderboard/page.tsx       # Top 3 podium & ranked productivity list
│   ├── quests/page.tsx            # Filterable quest manager
│   ├── settings/page.tsx          # Profile & account configuration
│   ├── shop/page.tsx              # Cosmetic store & gold economy
│   ├── layout.tsx                 # Root layout & font definitions
│   └── page.tsx                   # High-converting SaaS landing page
├── components/
│   ├── avatars/                   # Blob & Pixel SVG avatar engines
│   ├── landing/                   # Modular landing sections (Hero, Bento, Sky)
│   ├── navigation/                # Responsive Sidebar, Header, Mobile Nav
│   ├── rpg/                       # Quest cards, progression bars, sidebars
│   └── ui/                        # Reusable buttons, cards, toasts, modals
├── lib/
│   ├── actions/                   # Next.js Server Actions (CRUD, quest complete, shop)
│   ├── supabase/                  # Server, client & middleware clients
│   └── utils/                     # Formatting, calculations, cn helper
└── types/
    ├── actions.types.ts           # Server action payload contracts
    ├── avatar.types.ts            # Avatar & archetype models
    └── database.types.ts          # Postgres schema models & dashboard types
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: >= 18.18.0
- **npm** or **pnpm**
- A **Supabase** project (free tier works great)

### 1. Clone the repository
```bash
git clone git@github.com:dhruvp-dev/kriya.git
cd kriya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
Run the SQL migration script located in your Supabase SQL editor to instantiate tables:
- `profiles`
- `characters`
- `attributes`
- `quests`
- `quest_completions`
- `shop_items`
- `inventory_items`
- `achievements`
- `user_achievements`

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build & Test
```bash
npm run build
npm run test
```

---

## 🏆 Hackathon Highlights

1. **Zero Slop, Pure Taste**: Designed from the ground up with high typography standards (Satoshi + Plus Jakarta Sans), crisp contrast, subtle borders, and intentional whitespace.
2. **Instant Feedback Loops**: Real-time attribute accumulation and level calculations performed atomically via Server Actions.
3. **Inclusive Dual Visual Language**: Accommodates both modern SaaS users with high-fidelity vector Blobs and classic gamers with nostalgic Pixel art.
4. **Resilient Offline / Skeleton States**: Built with robust fallback states that eliminate flash-of-dummy-data (FODD) and maintain layout stability.

---

## 📄 License

MIT License. Crafted with discipline by [Dhruv](https://github.com/dhruvp-dev).
