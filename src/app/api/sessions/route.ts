import { NextRequest } from "next/server";
import {
  createChallengeSession,
  type ParticipationMode,
  type TeamSize,
} from "@/lib/challenge-session-store";

export const runtime = "nodejs";

const participationModes: ParticipationMode[] = [
  "Da Nang",
  "Mendoza",
  "Online LATAM",
  "Other online",
];

const teamSizes: TeamSize[] = ["", "solo", "duo"];

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const participationMode = String(
    body.participationMode ?? "",
  ) as ParticipationMode;
  const teamSize = String(body.teamSize ?? "") as TeamSize;

  if (!email || !email.includes("@")) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }

  if (!participationModes.includes(participationMode)) {
    return Response.json(
      { error: "Participation mode is required." },
      { status: 400 },
    );
  }

  if (!teamSizes.includes(teamSize)) {
    return Response.json({ error: "Invalid team size." }, { status: 400 });
  }

  const result = await createChallengeSession({
    email,
    name: String(body.name ?? ""),
    teamName: String(body.teamName ?? ""),
    participationMode,
    teamSize,
    userAgent: request.headers.get("user-agent"),
    referrer: request.headers.get("referer"),
  });

  return Response.json(result, { status: 201 });
}
