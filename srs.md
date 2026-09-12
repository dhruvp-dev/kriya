# KRIYA — Software Requirements Specification

**Product:** Kriya
**Tagline:** *Turn action into progress.*
**Version:** 1.1 — FROZEN
**Status:** Locked for implementation

---

## 1. Product

Kriya is a full-stack web application that converts real-world tasks into RPG-style progression.

Users create and complete quests based on real-life activities. Completing quests provides immediate feedback through **XP, Gold, attribute progression, streaks, achievements, and levels**.

The product is designed around the principle:

> **Real-world action → Immediate reward → Visible progression → Long-term motivation**

The application must use real database persistence, authentication, and strict per-user data isolation. Primary application data must **not** rely on localStorage.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Phosphor Icons (domain/game elements), Lucide (UI/utility elements) |
| Avatars | DiceBear (deterministic, seed-based) |
| Backend / BaaS | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Authorization | Supabase Row Level Security (RLS) |
| Server-side orchestration | Next.js Server Actions / Route Handlers |
| Atomic RPG operations | PostgreSQL Functions / RPC |
| Deployment | Vercel |
| Version Control | Git + GitHub |
| Testing | Vitest |

### Architecture

```
                         KRIYA
                           │
                    ┌──────▼──────┐
                    │   Next.js   │
                    │ App Router  │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        Server Actions   Server       Client
        / Route Handlers Components   Components
              │                         │
              └────────────┬────────────┘
                           │
                    ┌──────▼──────┐
                    │  Supabase   │
                    ├─────────────┤
                    │ Auth        │
                    │ PostgreSQL  │
                    │ RLS         │
                    │ RPC         │
                    └─────────────┘
                           │
                    ┌──────▼──────┐
                    │   Vercel    │
                    └─────────────┘
```

---

## 3. Users

Registered users can: sign up, log in, log out, manage profile, create/edit/delete/complete quests, earn XP, earn Gold, increase attributes, maintain streaks, purchase Shop items, view inventory, unlock achievements, view activity history, view progression, and participate in the leaderboard.

All private user data must be isolated through Supabase RLS.

---

## 4. Authentication

### 4.1 Signup

User provides: Email, Password.

System:
1. Validates credentials.
2. Creates Supabase Auth user.
3. Creates application profile.
4. Creates one character.
5. Initializes four attributes.
6. Initializes progression.
7. Captures and stores the user's timezone for streak calculations.

Initial state:
```
Level: 1
XP: 0
Gold: 0
Current Streak: 0
Longest Streak: 0
```

### 4.2 Login

Users authenticate via Supabase Auth. Session persists across page refreshes and supported devices.

### 4.3 Logout

The authenticated session is terminated.

### 4.4 Security

The frontend must **never be trusted** for: XP, Gold, attribute values, level, streak, achievement unlocking, inventory ownership.

Authorization is enforced server-side through Supabase RLS and secure server-side operations.

---

## 5. Character System

Each user owns one persistent character.

**Initial Character:**
```
Level: 1
Total XP: 0
Gold: 0
Current Streak: 0
Longest Streak: 0
```

**Fixed Attributes** (exactly four, each starting at 0):
```
Strength
Intellect
Discipline
Creativity
```

---

## 6. Quest System

A quest contains:
```
id, user_id, title, description, category, difficulty,
attribute, xp_reward, gold_reward, status,
is_recurring, recurrence, created_at, completed_at
```

### 6.1 Create Quest

User selects: title, description, category, difficulty, attribute, and whether it is recurring. The user **does not provide XP or Gold values** — rewards are calculated server-side from difficulty.

### 6.2 Edit Quest

A quest may only be edited while `status = pending`. Completed quests cannot be edited.

### 6.3 Delete Quest

Users can delete only their own quests.

### 6.4 Recurring Quests

```
is_recurring = true
recurrence = daily
```

Daily quests automatically become `pending` on a new calendar day, via lazy reset on app load or scheduled server-side processing. One-time quests remain completed permanently.

---

## 7. Quest Completion

Quest completion is the core transaction of Kriya.

```
User clicks Complete
        ↓
Send quest ID
        ↓
Validate authentication
        ↓
Validate ownership
        ↓
Check completion status
        ↓
Look up difficulty reward
        ↓
Award XP
        ↓
Award Gold
        ↓
Increase mapped attribute
        ↓
Update streak
        ↓
Check achievements
        ↓
Check level-up
        ↓
Record history
        ↓
Commit transaction
        ↓
Return progression result
```

The frontend sends **only action intent** — `completeQuest(questId)` — and must never send reward values directly.

---

## 8. Difficulty & Rewards

Fixed reward table, determined exclusively server-side:

| Difficulty | XP | Gold |
|---|--:|--:|
| Easy | 20 | 5 |
| Medium | 50 | 15 |
| Hard | 100 | 30 |
| Epic | 200 | 60 |

---

## 9. XP & Level System

Cumulative XP required to reach Level N:
```
threshold(N) = 100 × N^1.5
```

Level-up logic (supports multi-level jumps in a single completion):
```
while total_xp >= threshold(level + 1):
    level += 1
```

---

## 10. Attribute System

Every quest maps to exactly one attribute: Strength, Intellect, Discipline, or Creativity.

On successful completion, the mapped attribute increases by +1, applied server-side.

Example:
```
Quest: Build React Feature
Attribute: Intellect
Completion: +100 XP, +30 Gold, +1 Intellect
```

---

## 11. Streak System

A streak represents consecutive calendar days on which the user completes at least one quest. Streak calculations use the user's stored local timezone.

**Stored values:** `current_streak`, `longest_streak`, `last_activity_date`, `timezone`

**Rules:**
- First activity → streak = 1
- Activity on consecutive calendar day → streak increases
- Miss a full day → current streak resets to 0
- `longest_streak` never decreases
- Recalculated on app load and quest completion; no silent midnight job required
- A streak-freeze item is deferred to a future Shop release

---

## 12. Economy

Gold is Kriya's spendable currency.

- **Sources:** successful quest completion only
- **Usage:** spendable only through the Shop
- All balance changes happen server-side

---

## 13. Shop

Shop item fields: `id, name, description, price, type, metadata`

Supported types: Theme, Badge, Avatar Item, Profile Decoration, Consumable

**Purchase Flow:**
```
Authenticate
    ↓
Validate item
    ↓
Check availability
    ↓
Check Gold balance
    ↓
Check duplicate/unique rules
    ↓
Deduct Gold
    ↓
Create inventory record
    ↓
Commit transaction
```

Purchase must be atomic — Gold deduction and inventory insertion happen in a single database transaction (see §21).

---

## 14. Inventory

Users have a private inventory of purchased/unlocked items (Themes, Badges, Avatar items, Profile decorations, Consumables). Users can view owned items and, where applicable, equip/use them.

---

## 15. Achievements

Achievements are data-driven. Definitions contain: `id, name, description, trigger_type, threshold, reward, metadata`

**Supported trigger types:**
```
first_quest_completed
level_reached(N)
streak_reached(N)
quest_count_reached(N)
gold_earned_total(N)
```

Achievement logic must evaluate definitions against user progression data — no hardcoded per-achievement conditionals.

---

## 16. History

Every successful quest completion creates a history record: quest title, XP gained, Gold gained, attribute, attribute amount, timestamp. History is user-specific, persistent, chronological, and queryable.

---

## 17. Leaderboard

**Purpose:** optional competitive progression between users.

**Visibility:** opt-in. `leaderboard_visible` defaults to `false`, toggled on from Settings.

**Ranking order:**
```
1. Level DESC
2. Total XP DESC
3. Level-reached timestamp ASC (earlier attainment wins ties)
```

**Public leaderboard data is limited to:** display name, avatar, level, XP, rank.

**Must never expose:** email, quest titles, private history, personal task information.

> Note: Leaderboard is a product addition beyond the original brief and requires corresponding database/RLS implementation.

---

## 18. Application Pages

**Public:**
```
/
/login
/signup
```

**Authenticated:**
```
/dashboard
/quests
/character
/history
/achievements
/shop
/inventory
/leaderboard
/settings
```

This SRS defines functionality and information architecture only; visual UI direction is a separate design phase (see §26).

---

## 19. Dashboard Data

**Character:** Level, XP, Gold, Strength, Intellect, Discipline, Creativity, Current streak, Longest streak

**Quests:** Today's quests, Pending quests, Recently completed quests

**Other:** Recent achievements, Inventory summary, Activity history

---

## 20. Database (Conceptual)

```
auth.users
     │
     ▼
profiles
     │
     ▼
characters
     │
     ▼
attributes


profiles
   │
   ├── quests
   │      └── quest_completions
   │
   ├── inventory ─────── shop_items
   │
   └── user_achievements ─ achievements
```

**Application tables:**
```
profiles
characters
attributes
quests
quest_completions
shop_items
inventory
achievements
user_achievements
```

Supabase's `auth.users` remains the authentication source.

---

## 21. Security Architecture & Transaction Ownership

**Client can request:** create quest, edit quest, delete quest, complete quest, purchase item.

**Server/Database determines:** ownership, rewards, XP, Gold, attributes, level, streak, achievements, inventory.

**RLS:** every user-owned table must enforce `authenticated user == record owner`. No user can access another user's private records.

### Transaction Ownership (explicit)

**PostgreSQL RPC owns all authoritative RPG transactions.** A Next.js Server Action/Route Handler may authenticate and orchestrate the request, but it does not independently update XP, Gold, attributes, streaks, achievements, or history.

```
Client
   ↓
Next.js
   ↓
complete_quest(quest_id)
   ↓
┌──────── PostgreSQL Transaction ────────┐
│ Validate user/ownership                │
│ Validate quest state                   │
│ Determine reward                       │
│ Insert completion                      │
│ Award XP                               │
│ Award Gold                             │
│ Increase attribute                     │
│ Update streak                          │
│ Calculate level                        │
│ Unlock achievements                    │
│ Write history/completion data          │
└─────────────────────────────────────────┘
   ↓
COMMIT ALL
or
ROLLBACK ALL
```

Same principle applies to `purchase_shop_item(item_id)`: Gold deduction and inventory insertion happen in one database transaction.

This directly supports the requirement for a secure backend that prevents easy stat manipulation.

---

## 22. Edge Cases

The application must handle: empty quest title, invalid quest data, duplicate quest completion, completing another user's quest, insufficient Gold, duplicate unique purchase, expired session, database failure, network failure, refresh during progression, multiple level-ups, rapid repeated completion requests, streak crossing midnight, timezone differences, mobile layouts, keyboard-only navigation.

Quest completion and purchases must be idempotent/atomic where appropriate.

---

## 23. Quest Completion UX (Optimistic with Rollback)

Quest completion is optimistic with rollback:

```
Complete
   ↓
Immediate pending/reward feedback
   ↓
RPC transaction
   ├── Success → confirm + reward/level-up animation
   └── Failure → rollback UI + error toast
```

**Enforced nuance:** the UI may immediately show the quest as completed, but the authoritative celebration — Level Up / Achievement Unlocked — must use the values returned by the server. Kriya never celebrates a reward that the transaction ultimately rejects.

---

## 24. Performance

The application must: load quickly, minimize redundant database requests, use loading skeletons, use optimistic UI where safe, avoid optimistic updates for irreversible/server-authoritative operations unless rollback is properly handled (see §23), maintain smooth transitions, optimize assets, avoid unnecessary client-side JavaScript.

---

## 25. Accessibility

The application must support: keyboard navigation (Tab, Enter, Space), semantic HTML, screen readers, accessible forms, accessible dialogs, visible focus states, sufficient contrast, non-color-only information. The interface must remain usable without relying solely on animation, color, or visual effects.

---

## 26. Responsive Design

Kriya must work across Mobile, Tablet, and Desktop. Layout must adapt without loss of functionality.

---

## 27. Design Direction

**Duolingo mechanics + RPG skin.** Not a literal fantasy-game interface.

**Design principles:** modern, minimal, clean, strong whitespace, clear hierarchy, character-sheet influence, game-like progression, subtle RPG accents, reward-focused motion.

The interface should feel like a real modern product that happens to have RPG mechanics, rather than a fantasy game disguised as a productivity application. This supports the brief's warning against generic dashboards and its emphasis on polished, cohesive UX.

---

## 28. Non-Functional Evaluation Targets

Kriya optimizes for five judging pillars:

- **Design & UX** — premium, cohesive, non-generic interface
- **Performance & SEO** — fast loading, optimized assets, semantic structure, appropriate metadata
- **Creativity & Gamification** — progression that feels meaningful, not XP bolted onto a todo list
- **Robustness** — graceful handling of failures, invalid input, duplicate actions, network problems
- **Accessibility & Responsiveness** — keyboard navigation, screen-reader support, mobile/tablet/desktop compatibility

---

## 29. Minimum Testing Requirement

Vitest is used for the following required unit tests:
```
XP threshold calculation
Level calculation / multi-level jumps
Difficulty → XP/Gold reward mapping
```

One integration test for duplicate quest completion/idempotency is added if time permits, since robustness is an explicit judging criterion. Test coverage is deliberately scoped, not exhaustive.

---

## 30. Deployment & Submission

Final submission must include:

```
Public GitHub Repository
        │
        ├── Next.js application
        ├── Supabase integration
        ├── README.md
        └── .env.example

Live deployed application
        │
        └── Vercel

Walkthrough video
        │
        ├── Signup/Login
        ├── Create quest
        ├── Complete quest
        ├── Level progression
        └── Refresh → persistence
```

The repository must contain at least three chronological commits. The walkthrough video must be publicly accessible, between 90–180 seconds, and under 100 MB.

---

## 31. Core Product Loop

```
          REAL LIFE
              │
              ▼
        Create Quest
              │
              ▼
        Choose Difficulty
              │
              ▼
        Complete Quest
              │
              ▼
     ┌────────┼────────┐
     ▼        ▼        ▼
    XP       Gold   Attribute
     │        │        │
     ▼        ▼        ▼
   Level     Shop   Character
     │        │
     ▼        ▼
Achievements Inventory
     │
     └───────┬────────┘
             ▼
          HISTORY
```

---

## Status

🔒 **FROZEN for implementation.** Product requirements will not change further unless implementation reveals an actual blocker.

**Next step:** Database Schema v1.0 — enums, tables/columns, PK/FK relationships, CHECK/UNIQUE constraints, indexes, RLS policies, auth signup trigger, `complete_quest()` RPC, `purchase_shop_item()` RPC, achievement evaluation, leaderboard query/view.