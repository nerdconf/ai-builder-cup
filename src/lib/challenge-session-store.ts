import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ParticipationMode =
  | "Da Nang"
  | "Mendoza"
  | "Online LATAM"
  | "Other online";

export type TeamSize = "solo" | "duo" | "";

export type ChallengeSession = {
  id: string;
  email: string;
  name: string | null;
  team_name: string | null;
  participation_mode: ParticipationMode;
  team_size: TeamSize | null;
  selected_pack: string | null;
  x_post_url: string | null;
  started_at: string;
  ends_at: string;
  created_at: string;
  user_agent: string | null;
  referrer: string | null;
};

export type CreateSessionInput = {
  email: string;
  name?: string;
  teamName?: string;
  participationMode: ParticipationMode;
  teamSize?: TeamSize;
  userAgent?: string | null;
  referrer?: string | null;
};

export type UpdateSessionInput = {
  selectedPack?: string | null;
  xPostUrl?: string | null;
};

const CHALLENGE_MS = 60 * 60 * 1000;
const memorySessions = new Map<string, ChallengeSession>();
let supabase: SupabaseClient | null = null;

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabase) {
    supabase = createClient(url, key, {
      auth: {
        persistSession: false,
      },
    });
  }

  return supabase;
}

function normalizeOptional(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function toPublicSession(data: Record<string, unknown>): ChallengeSession {
  return {
    id: String(data.id),
    email: String(data.email),
    name: data.name ? String(data.name) : null,
    team_name: data.team_name ? String(data.team_name) : null,
    participation_mode: data.participation_mode as ParticipationMode,
    team_size: data.team_size ? (String(data.team_size) as TeamSize) : null,
    selected_pack: data.selected_pack ? String(data.selected_pack) : null,
    x_post_url: data.x_post_url ? String(data.x_post_url) : null,
    started_at: String(data.started_at),
    ends_at: String(data.ends_at),
    created_at: String(data.created_at),
    user_agent: data.user_agent ? String(data.user_agent) : null,
    referrer: data.referrer ? String(data.referrer) : null,
  };
}

function createLocalSession(input: CreateSessionInput): ChallengeSession {
  const startedAt = new Date();
  const session: ChallengeSession = {
    id: crypto.randomUUID(),
    email: input.email.trim().toLowerCase(),
    name: normalizeOptional(input.name),
    team_name: normalizeOptional(input.teamName),
    participation_mode: input.participationMode,
    team_size: input.teamSize || null,
    selected_pack: null,
    x_post_url: null,
    started_at: startedAt.toISOString(),
    ends_at: new Date(startedAt.getTime() + CHALLENGE_MS).toISOString(),
    created_at: startedAt.toISOString(),
    user_agent: input.userAgent ?? null,
    referrer: input.referrer ?? null,
  };

  memorySessions.set(session.id, session);
  return session;
}

export async function createChallengeSession(input: CreateSessionInput) {
  const client = getSupabase();

  if (!client) {
    return { session: createLocalSession(input), storage: "local-dev" as const };
  }

  const startedAt = new Date();
  const insert = {
    email: input.email.trim().toLowerCase(),
    name: normalizeOptional(input.name),
    team_name: normalizeOptional(input.teamName),
    participation_mode: input.participationMode,
    team_size: input.teamSize || null,
    started_at: startedAt.toISOString(),
    ends_at: new Date(startedAt.getTime() + CHALLENGE_MS).toISOString(),
    user_agent: input.userAgent ?? null,
    referrer: input.referrer ?? null,
  };

  const { data, error } = await client
    .from("challenge_sessions")
    .insert(insert)
    .select("*")
    .single();

  if (error) {
    console.error("Supabase insert failed, using local session fallback", error);
    return { session: createLocalSession(input), storage: "local-dev" as const };
  }

  return {
    session: toPublicSession(data as Record<string, unknown>),
    storage: "supabase" as const,
  };
}

export async function getChallengeSession(id: string) {
  const client = getSupabase();

  if (!client) {
    return memorySessions.get(id) ?? null;
  }

  const { data, error } = await client
    .from("challenge_sessions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return toPublicSession(data as Record<string, unknown>);
}

export async function updateChallengeSession(
  id: string,
  input: UpdateSessionInput,
) {
  const patch: Record<string, string | null> = {};

  if ("selectedPack" in input) {
    patch.selected_pack = input.selectedPack?.trim() || null;
  }

  if ("xPostUrl" in input) {
    patch.x_post_url = input.xPostUrl?.trim() || null;
  }

  const client = getSupabase();

  if (!client) {
    const existing = memorySessions.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch };
    memorySessions.set(id, updated);
    return updated;
  }

  const { data, error } = await client
    .from("challenge_sessions")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return null;
  }

  return toPublicSession(data as Record<string, unknown>);
}
