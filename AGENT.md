# AGENTS.md — Kriya

This file tells any AI coding agent (Claude Code, Cursor, Copilot Workspace, etc.) how to work in this repository. Read this before writing any code. The full product spec lives in `Kriya_SRS_v1.1.md` — treat it as frozen and authoritative for product behavior. This file is authoritative for *how to implement it*.

---

## 1. What Kriya is

Kriya converts real-world tasks into RPG-style progression: users complete quests, earn XP/Gold, level up, grow attributes, keep streaks, buy Shop items, and unlock achievements. Full spec: `Kriya_SRS_v1.1.md`.

Core principle, repeated because it drives every architectural decision below:

> **The frontend never decides rewards. It only expresses intent. The database decides truth.**

---

## 2. Tech stack (do not substitute)

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Phosphor (domain/game icons) + Lucide (UI/utility icons) — never mix both for the same concept |
| Avatars | Pixel Art Preset-based Avatar System (2D programmatic canvas sprites, palette swaps & equipment overlays) |
| Backend | Supabase (Auth, Postgres, RLS, RPC) |
| Server orchestration | Next.js Server Actions / Route Handlers |
| Authoritative RPG logic | PostgreSQL functions, called via RPC — never in application code |
| Testing | Vitest |
| Deployment | Vercel |

Do not introduce a different state manager, ORM, CSS framework, or auth provider without flagging it — these were deliberate choices in the SRS.

---

## 3. Absolute rules (violating these breaks the security model)

1. **Never compute XP, Gold, attribute increases, streaks, levels, or achievement unlocks in TypeScript/JavaScript.** These are computed exclusively inside PostgreSQL RPC functions (`complete_quest`, `purchase_shop_item`). Server Actions call the RPC and relay its result — they do not perform the calculation themselves, even "just to display a preview."
2. **Never accept reward values from the client.** A quest completion request looks like `completeQuest(questId)`. It never looks like `completeQuest(questId, { xp: 100 })`. If you find yourself writing an API that accepts an XP or Gold number from the frontend, stop — that's the exact anti-pattern the SRS calls out (§7, §21).
3. **Every RPG-state-mutating operation is one atomic transaction.** `complete_quest` and `purchase_shop_item` each do all their writes (XP, Gold, attribute, streak, level, achievements, history / inventory) inside a single Postgres function body. Partial writes on failure are not acceptable — commit all or rollback all.
4. **RLS is mandatory on every user-owned table.** No table holding per-user data ships without a policy enforcing `auth.uid() == user_id` (or the equivalent join). Don't rely on application-level checks as a substitute.
5. **Reward values come only from the fixed difficulty table** (§8 of the SRS: Easy/Medium/Hard/Epic → fixed XP/Gold). Don't let a quest carry an arbitrary custom reward.
6. **Achievement logic is data-driven.** Add new achievements as rows (`trigger_type`, `threshold`), never as new `if` branches in code. If a new trigger type is genuinely needed, that's a schema change, not a one-off conditional.
7. **The authoritative level-up / achievement-unlock animation only fires on server-confirmed data.** The quest card itself can update optimistically; the celebration cannot (SRS §23).

---

## 4. Repository conventions

```
/app                    → Next.js App Router pages (see SRS §18 for the route list)
/components             → shared UI components
/lib/supabase           → Supabase client setup (server + client variants, kept separate)
/lib/actions            → Server Actions (thin orchestration layer only — see rule 1)
/supabase/migrations    → SQL migrations: tables, enums, constraints, indexes, RLS, RPC functions
/supabase/seed.sql      → seed data (shop items, achievement definitions)
/tests                  → Vitest unit/integration tests
Kriya_SRS_v1.1.md       → frozen product spec (do not edit without explicit sign-off)
AGENTS.md               → this file
```

- SQL is the source of truth for RPG logic. If a PR changes reward math, level formula, or achievement evaluation, the diff should be in `/supabase/migrations`, not `/lib` or `/app`.
- Server Actions in `/lib/actions` should read like: authenticate → call RPC → return result. If one grows past ~20 lines of actual logic (not error handling), that's a sign business logic leaked out of Postgres — move it back.

---

## 5. Required formulas (do not re-derive — copy exactly)

**XP threshold (cumulative, to reach level N):**
```
threshold(N) = 100 * N^1.5
```

**Level-up (must support multi-level jumps in one completion):**
```sql
WHILE total_xp >= threshold(level + 1) LOOP
  level := level + 1;
END LOOP;
```

**Difficulty → reward table (fixed, never computed dynamically):**

| Difficulty | XP | Gold |
|---|--:|--:|
| Easy | 20 | 5 |
| Medium | 50 | 15 |
| Hard | 100 | 30 |
| Epic | 200 | 60 |

**Streak rule:** consecutive calendar days (user's stored timezone) with ≥1 completed quest. Miss a day → reset to 0. `longest_streak` is monotonic. Recalculated on load/completion, not via a scheduled job.

**Leaderboard ranking:** `Level DESC, Total XP DESC, level_reached_at ASC` (earlier attainment wins ties). Only users with `leaderboard_visible = true` appear. Never expose email, quest titles, or history — display name, avatar, level, XP, rank only.

---

## 6. Testing expectations

Minimum required (SRS §29) — do not skip these, they're what a judge/reviewer will check first for robustness:
- Unit test: XP threshold calculation
- Unit test: level calculation, including multi-level jumps from a single large XP award
- Unit test: difficulty → XP/Gold mapping
- If time allows: integration test for duplicate/rapid-repeat quest completion (idempotency)

Don't build out a large test suite beyond this scope — it's intentionally minimal per the SRS. Extending it is fine only if explicitly requested.

---

## 7. UX behavior to preserve

- Quest completion: optimistic UI (immediate visual "completing" state) + rollback with an error toast if the RPC fails.
- Level-up / achievement-unlock celebration animations: only triggered from the RPC's returned payload, never predicted client-side.
- Avatars: Preset-based Pixel Art avatar (2D HTML5 Canvas), stored as `avatar_config` JSONB per profile. Rendered as 2D pixel art canvas in header/character/settings/signup and directly in leaderboard rows.
- Icon usage: Phosphor for game/domain concepts (streak flame, gold, quests, achievements, swords/shields), Lucide for interface chrome (nav, settings, form controls, close/edit/delete).

---

## 8. When in doubt

If a task isn't covered by this file or the SRS, prefer the option that:
1. Keeps reward/state logic in Postgres, not application code.
2. Keeps the frontend expressing intent only, never values.
3. Matches the "modern product with RPG mechanics" design direction (SRS §27) over literal fantasy-game UI.

If a genuine product ambiguity comes up that isn't resolved by the SRS, flag it rather than silently deciding — the SRS is frozen and changes should be deliberate, not incidental to an implementation detail.

---

## 9. Design References — Study, Do Not Copy

Use design references ONLY as sources of design principles, mood, interaction ideas, composition patterns, and visual inspiration.

### Curated Reference Library

* **[Chillbert Therapy](https://andrealmo.com/chillbert%20therapy%20design)** — Primary reference for Kriya's *professional + warm earthy palette + pixel characters* balance. Combines pixel characters with a professional grid/layout and warm earth tones.
* **[Stardew Valley](https://www.stardewvalley.net/)** — Cozy world-building and pixel-art personality (not UI or artwork). Identity deeply tied to pixel art and progression.
* **[FocusPixel](https://www.focuspixel.app/)** — Productivity/focus functionality coexisting with cozy pixel-art character and progression.
* **[Pixeldoro](https://pixeldoro.io/)** — Turning productivity into a cozy game-like experience without turning the product into a conventional RPG.
* **[A1 Pixelated Landing Pages](https://www.a1.gallery/websites/pixelated-landing)** — Modern pixel/retro-digital landing page composition.
* **[One Page Love — Pixel Art Websites](https://onepagelove.com/style/pixel-art)** — Broad reference library of real pixel-art landing pages.
* **[Webflow Pixel Collection](https://webflow.com/made-in-webflow/pixel)** — Modern interactions, pixel transitions, typography, and layout experiments.

### Strict Originality & Anti-Copying Rules

```text
==================================================
DESIGN REFERENCES — STUDY, DO NOT COPY
==================================================

Use the following references ONLY as sources of
design principles, mood, interaction ideas,
composition patterns, and visual inspiration:

- Chillbert Therapy
- Stardew Valley
- FocusPixel
- Pixeldoro
- A1 Pixelated Landing Pages
- One Page Love Pixel Art collection
- Webflow Pixel collection

IMPORTANT COPYRIGHT / ORIGINALITY RULE:

Do NOT copy, trace, recreate, or closely imitate any
reference's:

- logo
- brand identity
- illustrations
- characters
- artwork
- icons
- layouts
- exact component designs
- typography combinations
- copywriting
- color palette as a complete system
- distinctive visual motifs
- screenshots
- CSS
- HTML
- source code
- proprietary assets

Do NOT reproduce any recognizable character,
environment, logo, mascot, illustration, or branded
visual from these references.

Do NOT create a KRIYA interface that could reasonably
be mistaken for one of the referenced products.

Instead, extract HIGH-LEVEL DESIGN PRINCIPLES.

For example:

From cozy pixel-art products:
→ use pixel art as personality
→ use warm restrained palettes
→ create collectible visual elements
→ use small moments of delight

From modern productivity products:
→ use strong hierarchy
→ prioritize whitespace
→ keep navigation simple
→ make actions obvious
→ minimize visual noise

From retro-digital websites:
→ use subtle pixel geometry
→ use segmented visual elements
→ use occasional bitmap-inspired details
→ use nostalgic texture sparingly

Then create an ORIGINAL KRIYA visual language.

KRIYA must have its own:
- logo
- symbol
- avatar characters
- illustrations
- iconography
- typography system
- color system
- layouts
- component shapes
- copy
- animations
- interaction patterns

The references are inspiration only.

The final design must be recognizably KRIYA.
```

### Deconstruction & Translation Workflow

If a reference contains a particularly attractive component, do not reproduce that component directly.

Instead, ask:
> **"What design principle makes this work?"**

Then rebuild that principle using KRIYA's own visual language.

* **BAD**: Copying a Stardew-style inventory screen.
* **GOOD**: Studying why an inventory feels collectible and satisfying, then designing an original KRIYA inventory using KRIYA's warm parchment, terracotta, sage, and navy design system.