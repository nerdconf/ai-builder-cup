# Builder World Cup Site

Local Next.js App Router app for the `Tiny Tools World Cup` challenge page.

## Local Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build
 
```bash
npm run lint
npm run build
```

## Session Persistence

The app creates a 60-minute challenge session through `POST /api/sessions`.

If Supabase env vars are missing, the app remains build-safe and uses:

- in-memory route-handler storage for local API responses
- `localStorage` in the browser for timer persistence across refreshes

This is enough for local testing but not enough for production participant proof.

## Supabase Env Vars

Set these in `.env.local` for local Supabase testing and in Vercel project env vars for deploy:

```bash
SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
```

`SUPABASE_SERVICE_ROLE_KEY` is required because the API route is server-only. Do not expose this key to the browser with a `NEXT_PUBLIC_` prefix.

## Supabase SQL

```sql
create extension if not exists pgcrypto;

create table if not exists public.challenge_sessions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  team_name text,
  participation_mode text not null check (
    participation_mode in ('Da Nang', 'Mendoza', 'Online LATAM', 'Other online')
  ),
  team_size text check (team_size in ('solo', 'duo')),
  started_at timestamptz not null,
  ends_at timestamptz not null,
  selected_pack text,
  x_post_url text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists challenge_sessions_email_idx
  on public.challenge_sessions (email);

create index if not exists challenge_sessions_started_at_idx
  on public.challenge_sessions (started_at desc);
```

The current path is server-only service role access from the Next.js route handlers.
