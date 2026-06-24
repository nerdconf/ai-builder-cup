import { NextRequest } from "next/server";
import {
  getChallengeSession,
  updateChallengeSession,
} from "@/lib/challenge-session-store";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/sessions/[id]">,
) {
  const { id } = await context.params;
  const session = await getChallengeSession(id);

  if (!session) {
    return Response.json({ error: "Session not found." }, { status: 404 });
  }

  return Response.json({ session });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext<"/api/sessions/[id]">,
) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  if (!body) {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const updated = await updateChallengeSession(id, {
    selectedPack:
      "selectedPack" in body ? String(body.selectedPack ?? "") : undefined,
    xPostUrl: "xPostUrl" in body ? String(body.xPostUrl ?? "") : undefined,
  });

  if (!updated) {
    return Response.json({ error: "Session not found." }, { status: 404 });
  }

  return Response.json({ session: updated });
}
