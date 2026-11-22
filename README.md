# ALearn — Burmese to English Writing Practice

A Next.js web application for practicing English writing skills from Burmese (`မြန်မာဘာသာ`) prompts, featuring animated typing feedback, word-level answer analysis, lesson categories, and custom random category generation backed by SQLite.

## Features

- **Burmese Prompts (`မြန်မာဘာသာ`)**: Authentic everyday, workplace, travel, dining, grammar, and opinion prompts with expandable hints and grammar notes.
- **Animated English Typing Studio**: Live keystroke rhythm indicator, spring-animated word chips, shake feedback on retry, confetti celebration burst on correct answers, and word-by-word diff comparison.
- **Lesson Categories**: Choose from 6 seeded categories with per-category progress tracking persisted in SQLite.
- **Random Categories**:
  - **Instant Random Mix**: Quickly shuffle 8 prompts across all categories.
  - **Make Random Category**: Build and save custom random practice categories (choose name, question count, and difficulty pool) directly into SQLite.

## Tech Stack

- **Framework**: Next.js (App Router, React 19, TypeScript)
- **Package Manager & Runtime**: Bun
- **Database**: SQLite (`bun:sqlite`) stored locally at `data/alearn.sqlite`
- **State Management**: Zustand
- **Styling & Animations**: Tailwind CSS v4 + Framer Motion + Lucide Icons
- **Linting & Formatting**: Biome (Next.js & React recommended rules)
- **Git Commits**: Conventional Commits (`@commitlint/config-conventional`)

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The SQLite database is automatically created and seeded on first run.

## Scripts

- `bun run dev` — Start the Next.js development server on Bun
- `bun run build` — Create a production build
- `bun run start` — Start the production server
- `bun run lint` — Run Biome lint and formatting checks
- `bun run lint:fix` — Auto-fix formatting and lint issues with Biome
- `bun run typecheck` — Run TypeScript type checking

## Deploying to Vercel

This project includes [`vercel.json`](./vercel.json) configured for the Next.js framework and Vercel's native Bun runtime (`bunVersion: "1.x"`).

> **Note on SQLite on Vercel:** When deployed to Vercel (`VERCEL=1`), the app automatically stores its SQLite file at `/tmp/alearn.sqlite` because serverless project directories are read-only. Seeded categories and lessons load automatically on cold start, while user attempts and custom random categories stored in `/tmp` are ephemeral across serverless cold starts. For durable cloud persistence later, swap the SQLite repository for a hosted database (e.g. Turso/LibSQL or Postgres).
