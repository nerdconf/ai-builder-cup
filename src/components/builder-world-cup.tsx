"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { FormEvent } from "react";
import type {
  ChallengeSession,
  ParticipationMode,
  TeamSize,
} from "@/lib/challenge-session-store";
import {
  type BuildContractKey,
  type Language,
  buildAgentPrompt,
  getChallengeContent,
  uiCopy,
} from "@/lib/challenge-content";

type SessionResponse = {
  session: ChallengeSession;
  storage?: "supabase" | "local-dev";
};

type BuildContractState = Record<BuildContractKey, string>;

type FormState = {
  email: string;
  name: string;
  teamName: string;
  participationMode: ParticipationMode;
  teamSize: TeamSize;
};

const STORAGE_KEY = "builder-world-cup-session-v1";
const CHALLENGE_MS = 60 * 60 * 1000;
const CREDITS_TUTORIAL_URL = "https://x.com/nerdconf_ar";
const partnerLogos = [
  {
    name: "Nebius",
    href: "https://nebius.com/",
    src: "/logos/nebius.svg",
    width: 131,
    height: 36,
    className: "h-[29px] w-auto object-contain",
    tier: "primary",
  },
  {
    name: "NOUS Research",
    href: "https://nousresearch.com/",
    src: "/logos/noussquare.png",
    width: 353,
    height: 358,
    className: "h-9 w-9 object-contain",
    tier: "primary",
    unoptimized: true,
  },
  {
    name: "Hermes Agent",
    href: "https://hermes-agent.nousresearch.com/",
    src: "/logos/hermesagent-normalized.png",
    width: 1000,
    height: 120,
    className: "-ml-1 h-7 w-auto object-contain",
    tier: "primary",
    unoptimized: true,
  },
  {
    name: "KAST",
    href: "https://www.kast.xyz/",
    src: "/logos/kast.svg",
    width: 1020,
    height: 214,
    className: "h-[22px] w-auto object-contain",
    tier: "secondary",
  },
  {
    name: "Tavily",
    href: "https://tavily.com/",
    src: "/logos/tavily.svg",
    width: 62,
    height: 24,
    className: "h-[23px] w-auto object-contain",
    tier: "secondary",
  },
  {
    name: "YODL",
    href: "https://yodl.me/",
    src: "/logos/yodl.svg",
    width: 123,
    height: 36,
    className: "h-[27px] w-auto object-contain",
    tier: "secondary",
  },
];

const participationModes: ParticipationMode[] = [
  "Da Nang",
  "Mendoza",
  "Online LATAM",
  "Other online",
];

const buildContractKeys: BuildContractKey[] = [
  "problem",
  "user",
  "beforeAfter",
  "tool",
  "demo",
];

const initialForm: FormState = {
  email: "",
  name: "",
  teamName: "",
  participationMode: "Da Nang",
  teamSize: "",
};

const initialBuildContract: BuildContractState = {
  problem: "",
  user: "",
  beforeAfter: "",
  tool: "",
  demo: "",
};

let storedSessionSnapshotRaw: string | null = null;
let storedSessionSnapshot: ChallengeSession | null = null;

function readStoredSession() {
  if (typeof window === "undefined") return null;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === storedSessionSnapshotRaw) return storedSessionSnapshot;

    storedSessionSnapshotRaw = saved;
    storedSessionSnapshot = saved
      ? (JSON.parse(saved) as ChallengeSession)
      : null;
    return storedSessionSnapshot;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    storedSessionSnapshotRaw = null;
    storedSessionSnapshot = null;
    return null;
  }
}

function subscribeStoredSession() {
  return () => {};
}

function LanguageToggle({
  label,
  language,
  onChange,
}: {
  label: string;
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div
      aria-label={label}
      className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/[0.035] px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/48"
      role="group"
    >
      <button
        aria-pressed={language === "en"}
        className={`h-5 px-2 transition ${
          language === "en" ? "text-neon" : "hover:text-white/72"
        }`}
        onClick={() => onChange("en")}
        type="button"
      >
        EN
      </button>
      <span
        aria-hidden
        className="mx-0.5 h-4 w-1 -skew-x-[22deg] bg-white/14"
      />
      <button
        aria-pressed={language === "es"}
        className={`h-5 px-2 transition ${
          language === "es" ? "text-neon" : "hover:text-white/72"
        }`}
        onClick={() => onChange("es")}
        type="button"
      >
        ES
      </button>
    </div>
  );
}

function createBrowserSession(form: FormState): ChallengeSession {
  const now = new Date();

  return {
    id: crypto.randomUUID(),
    email: form.email.trim().toLowerCase(),
    name: form.name.trim() || null,
    team_name: form.teamName.trim() || null,
    participation_mode: form.participationMode,
    team_size: form.teamSize || null,
    selected_pack: null,
    x_post_url: null,
    started_at: now.toISOString(),
    ends_at: new Date(now.getTime() + CHALLENGE_MS).toISOString(),
    created_at: now.toISOString(),
    user_agent: navigator.userAgent,
    referrer: document.referrer || null,
  };
}

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function SectionLabel({
  number,
  label,
  tone = "muted",
}: {
  number: string;
  label: string;
  tone?: "muted" | "teal" | "yellow" | "orange";
}) {
  const toneClass = {
    muted: "border-white/12 bg-white/[0.04] text-white/48",
    teal: "border-neon/35 bg-neon/10 text-neon",
    yellow: "border-neon/35 bg-neon/10 text-neon",
    orange: "border-neon/35 bg-neon/10 text-neon",
  }[tone];
  const textClass = {
    muted: "text-white/42",
    teal: "text-neon",
    yellow: "text-neon",
    orange: "text-neon",
  }[tone];

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex h-6 min-w-8 items-center justify-center rounded-full border px-2 font-mono text-[11px] font-semibold ${toneClass}`}
      >
        {number}
      </span>
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${textClass}`}>
        {label}
      </p>
    </div>
  );
}

export function BuilderWorldCup() {
  const storedSession = useSyncExternalStore(
    subscribeStoredSession,
    readStoredSession,
    () => null,
  );
  const [showGate, setShowGate] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showCreditsModal, setShowCreditsModal] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [activeSession, setSession] = useState<ChallengeSession | null>(null);
  const session = activeSession ?? storedSession;
  const [form, setForm] = useState(initialForm);
  const [now, setNow] = useState(() => Date.now());
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState("");
  const [buildContract, setBuildContract] =
    useState<BuildContractState>(initialBuildContract);
  const [xPostUrl, setXPostUrl] = useState("");
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const problemSheetRef = useRef<HTMLDivElement>(null);
  const sessionId = session?.id;
  const copy = uiCopy[language];
  const challenge = getChallengeContent(language);
  const problemPacks = challenge.problemPacks;
  const universalSubmission = challenge.universalSubmission;
  const buildContractFields = buildContractKeys.map((key) => ({
    key,
    ...copy.buildBrief.fields[key],
  }));

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(
      "builder-world-cup-language",
    );
    let timeout: number | undefined;

    if (savedLanguage === "en" || savedLanguage === "es") {
      timeout = window.setTimeout(() => setLanguage(savedLanguage), 0);
    }

    return () => {
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!sessionId) return;
    let ignore = false;

    fetch(`/api/sessions/${sessionId}`)
      .then((response) => {
        if (!response.ok) return null;
        return response.json() as Promise<SessionResponse>;
      })
      .then((data) => {
        if (ignore || !data?.session) return;
        setSession(data.session);
        setXPostUrl(data.session.x_post_url ?? "");
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data.session));
      })
      .catch(() => {
        if (!ignore) {
          setNotice(copy.notices.browserTimer);
        }
      });

    return () => {
      ignore = true;
    };
  }, [sessionId, copy.notices.browserTimer]);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const remainingMs = useMemo(() => {
    if (!session) return CHALLENGE_MS;
    return new Date(session.ends_at).getTime() - now;
  }, [now, session]);

  const selectedPack = session?.selected_pack ?? "";
  const selectedPackData = problemPacks.find((pack) => pack.id === selectedPack);
  const isExpired = remainingMs <= 0;
  const selectedAgentPrompt = selectedPackData
    ? buildAgentPrompt(selectedPackData, language)
    : "";

  async function copyText(label: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1600);
  }

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("builder-world-cup-language", nextLanguage);
  }

  function openRulesModal() {
    setRulesAgreed(false);
    setShowRulesModal(true);
  }

  function acceptRules() {
    if (!rulesAgreed) return;
    setShowRulesModal(false);
    setShowGate(true);
  }

  async function startChallenge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice("");

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const error = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(error?.error ?? copy.notices.couldNotStart);
      }

      const data = (await response.json()) as SessionResponse;
      setSession(data.session);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data.session));

      if (data.storage === "local-dev") {
        setNotice(copy.notices.localDevPersistence);
      }
    } catch (error) {
      const fallback = createBrowserSession(form);
      setSession(fallback);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
      setNotice(
        error instanceof Error
          ? `${error.message} ${copy.notices.fallbackBrowserTimer}`
          : copy.notices.fallbackBrowserTimer,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateSession(patch: Partial<ChallengeSession>) {
    if (!session) return;
    const next = { ...session, ...patch };
    setSession(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

    await fetch(`/api/sessions/${session.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selectedPack: patch.selected_pack,
        xPostUrl: patch.x_post_url,
      }),
    }).catch(() => {
      setNotice(copy.notices.savedInBrowser);
    });
  }

  async function selectPack(packId: string) {
    await updateSession({ selected_pack: packId });
    window.setTimeout(() => {
      problemSheetRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  async function saveXPostUrl(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSavingUrl(true);
    setNotice("");
    await updateSession({ x_post_url: xPostUrl.trim() || null });
    setIsSavingUrl(false);
    setNotice(copy.notices.xPostSaved);
  }

  if (session) {
    return (
      <main className="min-h-screen bg-page text-white">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-page/94 px-4 py-3 backdrop-blur-xl sm:px-5">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Image
                  alt="NERDCONF organizer"
                  className="h-5 w-auto object-contain opacity-75"
                  height={30}
                  src="/logos/nerdconf.svg"
                  width={283}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="rounded-full border border-neon/25 bg-neon/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase leading-normal tracking-[0.14em] text-neon/80 shadow-[0_0_14px_rgba(0,255,0,0.08)] transition hover:border-neon/45 hover:bg-neon/10 hover:text-neon hover:shadow-[0_0_18px_rgba(0,255,0,0.14)]"
                    onClick={() => setShowCreditsModal(true)}
                    style={{ borderRadius: 9999, minHeight: 0 }}
                    type="button"
                  >
                    {copy.creditsButton}
                  </button>
                  <LanguageToggle
                    label={copy.language}
                    language={language}
                    onChange={changeLanguage}
                  />
                </div>
              </div>
              <p className="mt-2 text-xs leading-5 text-white/52">
                {copy.sessionHeader.subtitle}
              </p>
            </div>
            <div className="sm:flex sm:flex-col sm:items-end">
              <div
                aria-label={copy.timer.ariaLabel(formatRemaining(remainingMs))}
                aria-live="polite"
                className="rounded-2xl border border-neon/25 bg-neon/[0.06] px-4 py-3 shadow-[0_0_34px_rgba(0,255,0,0.12)] sm:min-w-56"
                role="timer"
              >
                <div className="flex items-end justify-between gap-5">
                  <div className="flex items-end gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neon/78">
                      {copy.timer.label}
                    </span>
                    <span className="font-mono text-3xl font-semibold leading-none text-neon sm:text-4xl">
                      {formatRemaining(remainingMs)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex max-w-[min(100%,300px)] flex-wrap items-center gap-x-3 gap-y-2 sm:max-w-[420px] sm:justify-end">
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  {copy.timer.poweredBy}
                </span>
                <Image
                  alt="Nebius"
                  className="h-3.5 w-auto max-w-[72px] object-contain opacity-45 grayscale"
                  height={36}
                  loading="eager"
                  src="/logos/nebius.svg"
                  width={131}
                />
                <Image
                  alt="Hermes Agent"
                  className="h-3.5 w-auto max-w-[124px] object-contain opacity-45 grayscale"
                  height={120}
                  loading="eager"
                  src="/logos/hermesagent-normalized.png"
                  unoptimized
                  width={1000}
                />
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-5 sm:py-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div ref={problemSheetRef}>
            {!selectedPackData ? (
              <section className="rounded-2xl border border-neon/20 bg-neon/[0.06] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-8">
                <SectionLabel
                  number="01"
                  label={copy.emptyTrackState.section}
                  tone="yellow"
                />
                <h1 className="mt-4 max-w-3xl text-4xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-6xl">
                  {copy.emptyTrackState.title}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
                  {copy.emptyTrackState.body}
                </p>
              </section>
            ) : (
              <article className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neon">
                      {copy.packSheet.track}
                    </p>
                    <h1 className="mt-3 text-4xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-6xl">
                      {selectedPackData.title}
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">
                      {selectedPackData.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6">
                  <section className="rounded-2xl border border-neon/30 bg-neon/[0.08] p-6 shadow-[0_0_42px_rgba(0,255,0,0.12)] sm:p-8">
                    <SectionLabel
                      number="01"
                      label={copy.packSheet.goal}
                      tone="yellow"
                    />
                    <p className="mt-4 max-w-4xl text-3xl font-bold uppercase leading-[1.04] tracking-[0.02em] text-white sm:text-5xl">
                      {selectedPackData.goal}
                    </p>
                  </section>

                  <section className="p-1">
                    <SectionLabel
                      number="02"
                      label={copy.packSheet.caseFile}
                      tone="teal"
                    />
                    <div className="mt-5 max-w-3xl space-y-4 text-lg leading-8 text-white/72">
                      {selectedPackData.caseFile.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    {selectedPackData.exampleWorlds?.length ? (
                      <details className="group mt-5 max-w-3xl rounded-2xl border border-white/10 p-4">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white/72">
                          {copy.packSheet.exampleWorlds}
                          <span className="text-xs uppercase tracking-[0.14em] text-white/38 group-open:hidden">
                            {copy.open}
                          </span>
                          <span className="hidden text-xs uppercase tracking-[0.14em] text-white/38 group-open:inline">
                            {copy.close}
                          </span>
                        </summary>
                        <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/64">
                          {selectedPackData.exampleWorlds.map((example) => (
                            <li key={example}>{example}</li>
                          ))}
                        </ul>
                      </details>
                    ) : null}
                  </section>

                  <section className="p-1">
                    <SectionLabel
                      number="03"
                      label={copy.packSheet.constraints}
                    />
                    <ul className="mt-4 grid gap-3 text-sm leading-6 text-white/68 sm:grid-cols-2">
                      {selectedPackData.constraints.map((constraint) => (
                        <li
                          className="rounded-xl border border-white/10 px-3 py-3"
                          key={constraint}
                        >
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="p-1">
                    <SectionLabel
                      number="04"
                      label={copy.packSheet.buildGuidance}
                    />
                    <h2 className="mt-3 text-2xl font-bold uppercase leading-[1.02] tracking-[0.02em]">
                      {copy.packSheet.buildGuidanceTitle}
                    </h2>
                    <div className="mt-3 max-w-3xl space-y-3 leading-7 text-white/68">
                      {selectedPackData.buildGuidance.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </section>

                  {selectedPackData.id !== "Stupid App, Real Distribution" ? (
                    <details className="group rounded-2xl border border-white/10 p-5">
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/42">
                              {copy.optional}
                            </p>
                            <h2 className="mt-2 text-xl font-semibold">
                              {copy.buildBrief.title}
                            </h2>
                          </div>
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/42 group-open:hidden">
                            {copy.open}
                          </span>
                          <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/42 group-open:inline">
                            {copy.close}
                          </span>
                        </div>
                      </summary>
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">
                        {copy.buildBrief.description}
                      </p>
                      <div className="mt-5 grid gap-4">
                        {buildContractFields.map((field) => (
                          <label className="grid gap-2" key={field.key}>
                            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="text-sm font-semibold text-white">
                                {field.label}
                              </span>
                              <span className="text-xs leading-5 text-white/48">
                                {field.question}
                              </span>
                            </span>
                            <textarea
                              className="min-h-16 resize-y rounded-xl border border-white/10 bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/28 focus:border-neon"
                              onChange={(event) =>
                                setBuildContract((current) => ({
                                  ...current,
                                  [field.key]: event.target.value,
                                }))
                              }
                              placeholder={field.placeholder}
                              value={buildContract[field.key]}
                            />
                          </label>
                        ))}
                      </div>
                    </details>
                  ) : null}

                  <section className="p-1">
                    <SectionLabel number="05" label={copy.helpSection.label} />
                    <div className="mt-4 max-w-3xl space-y-3 text-sm leading-6 text-white/68">
                      <p>
                        {copy.helpSection.body}
                      </p>
                    </div>
                    <details className="group mt-4 rounded-2xl border border-white/10 p-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-white/72">
                        {copy.helpSection.promptTitle}
                        <span className="text-xs uppercase tracking-[0.14em] text-white/38 group-open:hidden">
                          {copy.open}
                        </span>
                        <span className="hidden text-xs uppercase tracking-[0.14em] text-white/38 group-open:inline">
                          {copy.close}
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        {copy.helpSection.promptDescription}
                      </p>
                      <button
                        aria-label={copy.helpSection.copyAria}
                        className="mt-4 rounded-xl border border-neon/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/72 transition hover:border-neon/70 hover:text-white"
                        onClick={() =>
                          copyText("agent-main", selectedAgentPrompt)
                        }
                        type="button"
                      >
                        {copied === "agent-main"
                          ? copy.copied
                          : copy.helpSection.copyIdle}
                      </button>
                    </details>
                  </section>

                  <section className="rounded-2xl border border-neon/25 bg-neon/[0.045] p-5">
                    <SectionLabel
                      number="06"
                      label={copy.submission.label}
                      tone="orange"
                    />
                    <h2 className="mt-3 text-2xl font-semibold">
                      {copy.submission.title}
                    </h2>
                    <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/70">
                      {universalSubmission.map((item) => (
                        <li
                          className={
                            item.startsWith("Tag ")
                              ? "font-semibold text-neon"
                              : undefined
                          }
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </article>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {notice ? (
              <p className="rounded-2xl border border-neon/30 bg-neon/[0.06] p-4 text-sm text-neon">
                {notice}
              </p>
            ) : null}

            <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {copy.sidebar.pickTrack}
                </h2>
                <span className="font-mono text-xs text-white/38">
                  {selectedPackData ? "1/1" : "0/1"}
                </span>
              </div>
              <div className="mt-4 grid gap-2">
                {problemPacks.map((pack) => {
                  const active = selectedPack === pack.id;
                  return (
                    <button
                      aria-pressed={active}
                      className={`rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-neon/50 bg-neon/[0.06] shadow-[0_0_22px_rgba(0,255,0,0.12)]"
                          : "border-white/10 bg-black/15 hover:border-white/35"
                      }`}
                      key={pack.id}
                      onClick={() => selectPack(pack.id)}
                      type="button"
                    >
                      <span className="text-xs font-semibold uppercase text-white/38">
                        {active ? copy.sidebar.selected : copy.sidebar.track}
                      </span>
                      <p className="mt-2 font-semibold">{pack.title}</p>
                      <p className="mt-1 text-xs leading-5 text-white/55">
                        {pack.summary}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {isExpired ? (
              <form
                className="rounded-2xl border border-neon/30 bg-neon/[0.06] p-5"
                onSubmit={saveXPostUrl}
              >
                <h2 className="text-lg font-semibold">
                  {copy.expiredSubmissionForm.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {copy.expiredSubmissionForm.description}
                </p>
                <label className="mt-4 grid gap-2 text-sm text-white/70">
                  {copy.expiredSubmissionForm.xPostUrl}
                  <input
                    className="w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none focus:border-neon"
                    onChange={(event) => setXPostUrl(event.target.value)}
                    placeholder={copy.expiredSubmissionForm.placeholder}
                    type="url"
                    value={xPostUrl}
                  />
                </label>
                <button
                  className="mt-3 w-full rounded-xl bg-neon px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black disabled:opacity-60"
                  disabled={isSavingUrl}
                  type="submit"
                >
                  {isSavingUrl
                    ? copy.expiredSubmissionForm.saveLoading
                    : copy.expiredSubmissionForm.saveIdle}
                </button>
              </form>
            ) : null}
          </aside>
        </section>
        {showCreditsModal ? (
          <div
            aria-modal="true"
            className="fixed inset-0 z-40 grid place-items-center bg-black/55 px-4 backdrop-blur-sm"
            role="dialog"
          >
            <div className="relative w-full max-w-sm rounded-2xl border border-neon/25 bg-page/96 p-5 shadow-[0_0_54px_rgba(0,255,0,0.16)]">
              <button
                aria-label={copy.creditsModal.closeAria}
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 text-sm text-white/55 transition hover:border-white/30 hover:text-white"
                onClick={() => setShowCreditsModal(false)}
                type="button"
              >
                x
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neon">
                {copy.creditsModal.eyebrow}
              </p>
              <h2 className="mt-3 pr-8 text-2xl font-bold uppercase leading-[1.02] tracking-[0.02em]">
                {copy.creditsModal.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/68">
                {copy.creditsModal.body}
              </p>
              <p className="mt-3 text-xs leading-5 text-white/45">
                {copy.creditsModal.extra}
              </p>
              <a
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-neon px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-neon-hover"
                href={CREDITS_TUTORIAL_URL}
                rel="noreferrer"
                target="_blank"
              >
                {copy.creditsModal.cta}
              </a>
            </div>
          </div>
        ) : null}
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-page text-white">
      <div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[260px] w-[min(92vw,420px)] -translate-x-1/2 rounded-full bg-neon/[0.05] blur-[74px]"
        aria-hidden
      />
      <section className="relative z-10 mx-auto grid min-h-screen max-w-6xl content-center gap-10 px-4 py-8 sm:px-5 lg:grid-cols-[1fr_380px] lg:items-center">
        <div>
          <a
            aria-label="Open NERDCONF"
            className="mb-6 inline-block opacity-90 transition hover:opacity-100"
            href="https://nerdconf.com/"
            rel="noreferrer"
            target="_blank"
          >
            <Image
              alt="NERDCONF"
              className="h-7 w-auto object-contain sm:h-8"
              height={30}
              priority
              src="/logos/nerdconf.svg"
              width={283}
            />
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neon">
              {copy.hero.eyebrow}
            </p>
            <LanguageToggle
              label={copy.language}
              language={language}
              onChange={changeLanguage}
            />
          </div>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold uppercase leading-[0.98] tracking-[0.02em] sm:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-white/65">
            {copy.hero.description}
          </p>

        </div>

        <div className="p-5">
          {!showGate ? (
            <div className="grid gap-8">
              <div>
                <p className="text-xs font-semibold uppercase text-white/42">
                  {copy.hero.partners}
                </p>
                <div className="mt-4 space-y-4">
                  {["primary", "secondary"].map((tier) => (
                    <div
                      className={`flex items-center gap-x-4 gap-y-4 ${
                        tier === "primary" ? "flex-nowrap" : "flex-wrap"
                      }`}
                      key={tier}
                    >
                      {partnerLogos
                        .filter((logo) => logo.tier === tier)
                        .map((logo) => (
                          <a
                            aria-label={`Open ${logo.name}`}
                            href={logo.href}
                            key={logo.name}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <Image
                              alt={logo.name}
                              className={`${logo.className} opacity-80 grayscale transition hover:opacity-100`}
                              height={logo.height}
                              loading="eager"
                              src={logo.src}
                              unoptimized={logo.unoptimized}
                              width={logo.width}
                            />
                          </a>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="w-full rounded-xl bg-neon px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neon-hover hover:shadow-[0_0_26px_rgba(0,255,0,0.28)]"
                onClick={openRulesModal}
                type="button"
              >
                {copy.hero.startButton}
              </button>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={startChallenge}>
              <div>
                <h2 className="text-2xl font-semibold">
                  {copy.startForm.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  {copy.startForm.description}
                </p>
              </div>
              <label className="grid gap-2 text-sm text-white/65">
                {copy.startForm.email}
                <input
                  className="rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none focus:border-neon"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  required
                  type="email"
                  value={form.email}
                />
              </label>
              <label className="grid gap-2 text-sm text-white/65">
                {copy.startForm.participationMode}
                <select
                  className="rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none focus:border-neon"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      participationMode: event.target.value as ParticipationMode,
                    }))
                  }
                  value={form.participationMode}
                >
                  {participationModes.map((mode) => (
                    <option key={mode}>{mode}</option>
                  ))}
                </select>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-white/65">
                  {copy.startForm.name}
                  <input
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none placeholder:text-white/30 focus:border-neon"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder={copy.startForm.namePlaceholder}
                    value={form.name}
                  />
                </label>
                <label className="grid gap-2 text-sm text-white/65">
                  {copy.startForm.teamName}
                  <input
                    className="rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none placeholder:text-white/30 focus:border-neon"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        teamName: event.target.value,
                      }))
                    }
                    placeholder={copy.startForm.teamNamePlaceholder}
                    value={form.teamName}
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm text-white/65">
                {copy.startForm.teamSize}
                <select
                  className="rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white outline-none focus:border-neon"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      teamSize: event.target.value as TeamSize,
                    }))
                  }
                  value={form.teamSize}
                >
                  <option value="">{copy.startForm.teamSizeOptional}</option>
                  <option value="solo">{copy.startForm.solo}</option>
                  <option value="duo">{copy.startForm.duo}</option>
                </select>
              </label>
              <button
                className="rounded-xl bg-neon px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neon-hover hover:shadow-[0_0_26px_rgba(0,255,0,0.28)] disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting
                  ? copy.startForm.submitLoading
                  : copy.startForm.submitIdle}
              </button>
              {notice ? (
                <p className="text-sm leading-6 text-neon">{notice}</p>
              ) : null}
            </form>
          )}
        </div>
      </section>

      {showRulesModal ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-md"
          role="dialog"
        >
          <div className="w-full max-w-lg rounded-2xl border border-neon/25 bg-page/95 p-5 shadow-[0_0_60px_rgba(0,255,0,0.18)] sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neon">
              {copy.rulesModal.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase leading-[1.02] tracking-[0.02em]">
              {copy.rulesModal.title}
            </h2>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/72">
              {copy.rulesModal.rules.map((rule) => (
                <li className="flex gap-3" key={rule}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <label className="mt-6 flex items-center gap-3 text-sm font-semibold text-white/75">
              <input
                checked={rulesAgreed}
                className="h-4 w-4 accent-neon"
                onChange={(event) => setRulesAgreed(event.target.checked)}
                type="checkbox"
              />
              {copy.rulesModal.agree}
            </label>
            <button
              className="mt-5 w-full rounded-xl bg-neon px-5 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neon-hover disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!rulesAgreed}
              onClick={acceptRules}
              type="button"
            >
              {copy.rulesModal.continue}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
