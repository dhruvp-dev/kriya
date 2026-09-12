---
name: design-lab
description: Conduct design interviews, generate distinct UI variations in a temporary design lab with an interactive feedback overlay, collect user feedback, refine, and produce implementation plans. Use when the user wants to explore UI design options, redesign existing components, or create new UI with multiple approaches to compare.
---

# Design Lab Skill

This skill implements a complete design exploration workflow: interview, generate variations, collect visual feedback, refine, preview, and finalize.

## CRITICAL: Cleanup Behavior

**All temporary files MUST be deleted when the process ends, whether by:**
- User confirms final design → cleanup, then generate plan
- User aborts/cancels → cleanup immediately, no plan generated

**Never leave `.design-lab/` or `app/design-lab` / `__design_lab` routes behind.** If the user says "cancel", "abort", "stop", or "nevermind" at any point, confirm and then delete all temporary artifacts.

---

## Phase 0: Preflight Detection

Before starting the interview, automatically detect project parameters:

### Package Manager
Check for lock files in the project root:
- `pnpm-lock.yaml` → use `pnpm`
- `yarn.lock` → use `yarn`
- `package-lock.json` → use `npm`
- `bun.lockb` → use `bun`

### Framework Detection
Check for config files:
- `next.config.js` or `next.config.mjs` or `next.config.ts` → **Next.js**
  - Check for `app/` directory → App Router
  - Check for `pages/` directory → Pages Router
- `vite.config.js` or `vite.config.ts` → **Vite**
- `remix.config.js` → **Remix**
- `nuxt.config.js` or `nuxt.config.ts` → **Nuxt**
- `astro.config.mjs` → **Astro**

### Styling System Detection
Check `package.json` dependencies and config files:
- `tailwind.config.js` or `tailwind.config.ts` → **Tailwind CSS**
- `@mui/material` in dependencies → **Material UI**
- `@chakra-ui/react` in dependencies → **Chakra UI**
- `antd` in dependencies → **Ant Design**
- `styled-components` in dependencies → **styled-components**
- `@emotion/react` in dependencies → **Emotion**
- `.css` or `.module.css` files → **CSS Modules**

### Design Memory Check
Look for existing Design Memory file:
- `docs/design-memory.md`
- `DESIGN_MEMORY.md`
- `.design-lab/design-memory.md`

If found, read it and use to prefill defaults and skip redundant questions.

### Visual Style Inference (CRITICAL)

**DO NOT use generic/predefined styles. Extract visual language from the project:**

**If Tailwind detected**, read `tailwind.config.js` or `tailwind.config.ts`:
```javascript
// Extract and use:
theme.colors       // Color palette
theme.spacing      // Spacing scale
theme.borderRadius // Radius values
theme.fontFamily   // Typography
theme.boxShadow    // Elevation system
```

**If CSS Variables exist**, read `globals.css`, `variables.css`, or `:root` definitions:
```css
:root {
  --color-*     /* Color tokens */
  --spacing-*   /* Spacing tokens */
  --font-*      /* Typography tokens */
  --radius-*    /* Border radius tokens */
}
```

**Always scan existing components** to understand patterns:
- Find 2-3 existing buttons → note their styling patterns
- Find 2-3 existing cards → note padding, borders, shadows
- Find existing forms → note input styles, label placement
- Find existing typography → note heading sizes, body text

**Store inferred styles in the Design Brief** for consistent use across all variants.

---

## Phase 1: Interview

Use the `ask_question` tool for all interview steps. Adapt questions based on Design Memory if it exists.

### Step 1.1: Scope & Target

Ask these questions:

**Question 1: Scope**
- Question: "Are we designing a single component or a full page?"
- Options:
  - "Component" - A reusable UI element (button, card, form, modal, etc.)
  - "Page" - A complete page or screen layout

**Question 2: New or Redesign**
- Question: "Is this a new design or a redesign of something existing?"
- Options:
  - "New" - Creating something from scratch
  - "Redesign" - Improving an existing component/page

If "Redesign" selected, ask:
**Question 3: Existing Path**
- Question: "What is the file path or route of the existing UI?"

### Step 1.2: Pain Points & Inspiration

**Question 1: Pain Points**
- Question: "What are the top pain points with the current design (or what should this new design avoid)?"
- Options:
  - "Too cluttered/dense" - Information overload, hard to scan
  - "Unclear hierarchy" - Primary actions aren't obvious
  - "Poor mobile experience" - Doesn't work well on small screens
  - "Outdated look" - Feels old or inconsistent with brand
- is_multi_select: true

**Question 2: Visual Inspiration**
- Question: "What products or design styles should I reference for visual inspiration?"
- Options:
  - "Stripe" - Clean, minimal, trustworthy
  - "Linear" - Dense, keyboard-first, developer-focused
  - "Notion" - Flexible, content-focused, playful
  - "Apple" - Premium, spacious, refined
- is_multi_select: true

### Step 1.3: Brand & Style Direction

**Question 1: Brand Tone**
- Question: "What adjectives describe the desired brand feel?"
- Options:
  - "Minimal" - Clean, simple, uncluttered
  - "Premium" - High-end, polished, refined
  - "Playful" - Fun, friendly, approachable
  - "Utilitarian" - Functional, efficient, no-nonsense
- is_multi_select: true

**Question 2: Density**
- Question: "What information density do you prefer?"
- Options:
  - "Compact" - More information visible, tighter spacing
  - "Comfortable" - Balanced spacing, easy scanning
  - "Spacious" - Generous whitespace, focused attention

---

## Phase 2: Generate Design Brief

After the interview, create a structured Design Brief as JSON and save to `.design-lab/design-brief.json`:

```json
{
  "scope": "component|page",
  "isRedesign": true,
  "targetPath": "app/components/Example.tsx",
  "targetName": "Example",
  "painPoints": ["Too dense", "Primary action unclear"],
  "inspiration": {
    "visual": ["Stripe", "Linear"],
    "functional": ["Inline validation"]
  },
  "brand": {
    "adjectives": ["minimal", "trustworthy"],
    "density": "comfortable",
    "darkMode": true
  },
  "framework": "nextjs-app",
  "packageManager": "pnpm",
  "stylingSystem": "tailwind"
}
```

Display a summary to the user before proceeding.

---

## Phase 3: Generate Design Lab

### Directory Structure

Create all files under `.design-lab/`:

```
.design-lab/
├── lab/
│   ├── page.tsx                 # Main lab page (framework-specific)
│   ├── variants/
│   │   ├── VariantA.tsx
│   │   ├── VariantB.tsx
│   │   ├── VariantC.tsx
│   │   ├── VariantD.tsx
│   │   └── VariantE.tsx
│   ├── components/
│   │   ├── LabShell.tsx         # Copy from .agents/skills/design-lab/resources/LabShell.tsx
│   │   └── FeedbackOverlay.tsx  # Copy from .agents/skills/design-lab/resources/FeedbackOverlay.tsx
│   └── data/
│       └── fixtures.ts          # Shared mock data
├── design-brief.json
└── run-log.md
```

### Feedback System Setup (CRITICAL - NEVER SKIP)

**The FeedbackOverlay is the PRIMARY feature of the Design Lab.** Without it, users cannot provide interactive feedback. NEVER generate a Design Lab without the FeedbackOverlay.

**Template Source:** Copy directly from `.agents/skills/design-lab/resources/FeedbackOverlay.tsx` into the route directory (e.g. `app/design-lab/FeedbackOverlay.tsx`) or import cleanly.

**Template Shell Source:** Copy `.agents/skills/design-lab/resources/LabShell.tsx` into the route directory (e.g. `app/design-lab/LabShell.tsx`).

### Route Integration

**Next.js App Router:**
Create `app/design-lab/page.tsx` (or `app/__design_lab/page.tsx`) that imports variants and renders `LabShell` & `FeedbackOverlay`.

**Next.js Pages Router:**
Create `pages/design-lab.tsx`.

**Vite / React Router:**
Add route to `/design-lab` or render conditionally in `App.tsx`.

---

## Phase 4: Present Design Lab to User

Output the lab location and instructions clearly:

```
✅ Design Lab created!

I've generated 5 design variants in `.design-lab/lab/`

To view and review them:
1. Ensure your local dev server is running (`npm run dev` or `pnpm dev`)
2. Open: http://localhost:3000/design-lab

Take your time reviewing the variants side-by-side!
```

---

## Phase 5: Collect Feedback

Users can provide feedback by using the interactive `FeedbackOverlay` in their browser and clicking **"Submit & Copy Feedback"**, then pasting the markdown formatted feedback into chat.

---

## Phase 6: Finalize & Clean Up

When user confirms the winner:

1. **Clean up all temporary routes & files:**
   - Delete `.design-lab/` directory
   - Delete `app/design-lab/` or `app/__design_lab/` route folder

2. **Generate Implementation Plan:**
   Create `DESIGN_PLAN.md` in project root:

```markdown
# Design Implementation Plan: [TargetName]

## Summary
- **Scope:** [component/page]
- **Target:** [file path]
- **Winner variant:** [Variant Name]

## Implementation Steps
1. [Step 1]
2. [Step 2]

---
*Generated by Antigravity Design Lab*
```

3. **Update Design Memory:**
   Update `DESIGN_MEMORY.md` with newly learned UI guidelines and preferences.
