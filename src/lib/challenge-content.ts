export type Language = "en" | "es";

export type ChallengePack = {
  id: string;
  title: string;
  summary: string;
  pickIf: string;
  goal: string;
  caseFile: string[];
  exampleWorlds?: string[];
  constraints: string[];
  buildGuidance: string[];
};

export type BuildContractKey =
  | "problem"
  | "user"
  | "beforeAfter"
  | "tool"
  | "demo";

type PromptLabels = {
  selectedCase: string;
  pack: string;
  goal: string;
  caseFile: string;
  exampleWorlds: string;
  constraints: string;
  buildGuidance: string;
  submission: string;
};

export const uiCopy = {
  en: {
    language: "Language",
    creditsButton: "Claim Credits",
    copied: "Copied",
    open: "Open",
    close: "Close",
    optional: "Optional",
    timer: {
      poweredBy: "Powered by",
      ariaLabel: (time: string) => `Time remaining ${time}`,
    },
    hero: {
      eyebrow: "Builder World Cup",
      title: "AI World Cup",
      description:
        "A 90-minute AI build challenge. Start the clock, unlock a problem sheet, ship one tiny tool. Argentina vs Vietnam, who's the real goat?",
      partners: "Partners",
      startButton: "Start The Challenge",
    },
    preStart: {
      label: "Before start",
      title: "The challenge unlocks after you enter your email.",
      credits:
        "Get $25 in NEBIUS Token Factory credits to use frontier open models on HERMES AGENT.",
    },
    startForm: {
      title: "Start your clock",
      description: "The challenge appears after this step.",
      email: "Email",
      participationMode: "Participation mode",
      name: "Name",
      namePlaceholder: "optional",
      teamName: "Team name",
      teamNamePlaceholder: "RABID DOGS",
      teamSize: "Team size",
      teamSizeOptional: "optional",
      solo: "solo",
      duo: "duo",
      submitIdle: "Start My 90 Minutes",
      submitLoading: "Starting...",
    },
    sessionHeader: {
      subtitle: "Choose your problem, audience, tiny tool, and demo.",
    },
    emptyTrackState: {
      section: "Track",
      title: "Choose a track.",
      body:
        "You have 10 minutes to read the goal, understand the case, and choose a tiny before/after. Do not start with an app idea. Start with the track.",
    },
    packSheet: {
      track: "Track",
      goal: "Goal",
      caseFile: "Case File",
      exampleWorlds: "Example worlds",
      constraints: "Constraints",
      buildGuidance: "Build Guidance",
      buildGuidanceTitle: "Build the smallest thing that proves the idea.",
    },
    buildBrief: {
      title: "30-second build brief",
      description:
        "Use this if you want to clarify the idea before asking an agent to build.",
      fields: {
        problem: {
          label: "Problem",
          question: "What tension are you solving?",
          placeholder: "Example: the joke is obvious, but the result is boring.",
        },
        user: {
          label: "Who is this for?",
          question: "Who should care?",
          placeholder: "Example: builders who want a screenshot-worthy demo.",
        },
        beforeAfter: {
          label: "Before / After",
          question: "What changes after using it?",
          placeholder: "Example: from vague idea to one shareable punchline.",
        },
        tool: {
          label: "Tiny tool",
          question: "What will you build?",
          placeholder: "Example: a one-screen agent that roasts an app idea.",
        },
        demo: {
          label: "60-second demo",
          question: "What will people see fast?",
          placeholder: "Example: paste the idea, get the shareable output.",
        },
      },
    },
    helpSection: {
      label: "Need Help?",
      body:
        "Ask another person in the event to help you shrink the idea or paste this prompt into your agent to help you order your ideas.",
      promptTitle: "Optional referee agent prompt",
      promptDescription:
        "Copy this only if you want help thinking through the case. It tells the agent not to code unless you ask.",
      copyAria: "Copy optional referee prompt",
      copyIdle: "Copy Referee Prompt",
    },
    sidebar: {
      pickTrack: "Pick a track",
      selected: "Selected",
      track: "Track",
    },
    submission: {
      label: "Submission",
      title: "Submit on X.",
    },
    expiredSubmissionForm: {
      title: "Time is up",
      description: "Post your demo on X. Saving the URL here is optional.",
      xPostUrl: "X post URL",
      placeholder: "https://x.com/...",
      saveIdle: "Save Optional URL",
      saveLoading: "Saving...",
    },
    notices: {
      xPostSaved: "X post URL saved for this session.",
      browserTimer: "Timer is running from this browser session.",
      localDevPersistence:
        "Timer started. Production persistence needs Supabase envs.",
      fallbackBrowserTimer: "Browser timer started instead.",
      savedInBrowser: "Saved in this browser.",
      couldNotStart: "Could not start the challenge.",
    },
    rulesModal: {
      eyebrow: "Challenge rules",
      title: "Before you start",
      rules: [
        "Use Hermes Agent + Nebius Token Factory meaningfully.",
        "Submit publicly on X using the provided keywords. Include a 60-90 second video; screen recording is fine, no voiceover required.",
        "Solo or duo.",
        "Have fun.",
      ],
      agree: "I agree",
      continue: "Continue",
    },
    creditsModal: {
      closeAria: "Close free credits",
      eyebrow: "Free builder credits",
      title: "Unlock Nebius credits",
      body:
        "Every participant gets $25 Nebius Token Factory credits to use frontier open models like GLM 5.2 with Hermes Agent during the challenge.",
      extra:
        "1000 Tavily credits are also available if your build needs web search.",
      cta: "Watch setup tutorial",
    },
  },
  es: {
    language: "Idioma",
    creditsButton: "Reclamar créditos",
    copied: "Copiado",
    open: "Abrir",
    close: "Cerrar",
    optional: "Opcional",
    timer: {
      poweredBy: "Powered by",
      ariaLabel: (time: string) => `Tiempo restante ${time}`,
    },
    hero: {
      eyebrow: "Builder World Cup",
      title: "AI World Cup",
      description:
        "Un desafío de 90 minutos para construir con IA. Arranca el reloj, desbloquea un problema y shippea una tiny tool. Argentina vs Vietnam: ¿quién es el verdadero GOAT?",
      partners: "Partners",
      startButton: "Empezar el challenge",
    },
    preStart: {
      label: "Antes de empezar",
      title: "El challenge se desbloquea cuando ingreses tu email.",
      credits:
        "Recibe $25 en créditos de NEBIUS Token Factory para usar modelos open frontier en HERMES AGENT.",
    },
    startForm: {
      title: "Arranca tu reloj",
      description: "El challenge aparece después de este paso.",
      email: "Email",
      participationMode: "Modo de participación",
      name: "Nombre",
      namePlaceholder: "opcional",
      teamName: "Nombre del equipo",
      teamNamePlaceholder: "RABID DOGS",
      teamSize: "Tamaño del equipo",
      teamSizeOptional: "opcional",
      solo: "solo",
      duo: "duo",
      submitIdle: "Empezar mis 90 minutos",
      submitLoading: "Empezando...",
    },
    sessionHeader: {
      subtitle: "Elige tu problema, audiencia, tiny tool y demo.",
    },
    emptyTrackState: {
      section: "Track",
      title: "Elegí un track.",
      body:
        "Tenés 10 minutos para leer el objetivo, entender el caso y elegir un before/after chico. No arranques con una idea de app. Arrancá por el track.",
    },
    packSheet: {
      track: "Track",
      goal: "Objetivo",
      caseFile: "Caso",
      exampleWorlds: "Mundos de ejemplo",
      constraints: "Restricciones",
      buildGuidance: "Guía de build",
      buildGuidanceTitle: "Construye lo más chico que pruebe la idea.",
    },
    buildBrief: {
      title: "Brief de build en 30 segundos",
      description:
        "Usa esto si quieres aclarar la idea antes de pedirle a un agente que construya.",
      fields: {
        problem: {
          label: "Problema",
          question: "¿Qué tensión estás resolviendo?",
          placeholder: "Ejemplo: el chiste es obvio, pero el resultado es aburrido.",
        },
        user: {
          label: "¿Para quién es?",
          question: "¿A quién debería importarle?",
          placeholder: "Ejemplo: builders que quieren una demo digna de screenshot.",
        },
        beforeAfter: {
          label: "Antes / Después",
          question: "¿Qué cambia después de usarlo?",
          placeholder: "Ejemplo: de idea vaga a punchline compartible.",
        },
        tool: {
          label: "Tiny tool",
          question: "¿Qué vas a construir?",
          placeholder: "Ejemplo: un agente de una pantalla que roastée una idea de app.",
        },
        demo: {
          label: "Demo de 60 segundos",
          question: "¿Qué va a ver la gente rápido?",
          placeholder: "Ejemplo: pega la idea, recibe el output compartible.",
        },
      },
    },
    helpSection: {
      label: "¿Necesitas ayuda?",
      body:
        "Pídele a otra persona del evento que te ayude a achicar la idea, o pega este prompt en tu agente para ordenar tus ideas.",
      promptTitle: "Prompt opcional para agente árbitro",
      promptDescription:
        "Copia esto solo si quieres ayuda para pensar el caso. Le dice al agente que no codee salvo que se lo pidas.",
      copyAria: "Copiar prompt opcional del árbitro",
      copyIdle: "Copiar prompt del árbitro",
    },
    sidebar: {
      pickTrack: "Elegí un track",
      selected: "Seleccionado",
      track: "Track",
    },
    submission: {
      label: "Entrega",
      title: "Sube tu demo a X.",
    },
    expiredSubmissionForm: {
      title: "Se terminó el tiempo",
      description: "Postea tu demo en X. Guardar la URL acá es opcional.",
      xPostUrl: "URL del post en X",
      placeholder: "https://x.com/...",
      saveIdle: "Guardar URL opcional",
      saveLoading: "Guardando...",
    },
    notices: {
      xPostSaved: "URL del post en X guardada para esta sesión.",
      browserTimer: "El reloj está corriendo desde esta sesión del navegador.",
      localDevPersistence:
        "Reloj iniciado. La persistencia en producción necesita las envs de Supabase.",
      fallbackBrowserTimer: "Reloj del navegador iniciado como alternativa.",
      savedInBrowser: "Guardado en este navegador.",
      couldNotStart: "No se pudo iniciar el challenge.",
    },
    rulesModal: {
      eyebrow: "Reglas del challenge",
      title: "Antes de empezar",
      rules: [
        "Usa Hermes Agent + Nebius Token Factory de forma significativa.",
        "Entrega públicamente en X usando las keywords indicadas. Incluye un video de 60-90 segundos; screen recording está perfecto, no hace falta voiceover.",
        "Solo o duo.",
        "Diviértete.",
      ],
      agree: "Acepto",
      continue: "Continuar",
    },
    creditsModal: {
      closeAria: "Cerrar créditos gratis",
      eyebrow: "Créditos gratis para builders",
      title: "Desbloquea créditos Nebius",
      body:
        "Cada participante recibe $25 en créditos de Nebius Token Factory para usar modelos open frontier como GLM 5.2 con Hermes Agent durante el challenge.",
      extra:
        "También hay 1000 créditos de Tavily disponibles si tu build necesita búsqueda web.",
      cta: "Ver tutorial de setup",
    },
  },
} as const;

const esPromptLabels: PromptLabels = {
  selectedCase: "Caso seleccionado",
  pack: "Pack",
  goal: "Objetivo",
  caseFile: "Caso",
  exampleWorlds: "Mundos de ejemplo",
  constraints: "Restricciones",
  buildGuidance: "Guía de build",
  submission: "Entrega",
};

const enPromptLabels: PromptLabels = {
  selectedCase: "Selected Case",
  pack: "Pack",
  goal: "Goal",
  caseFile: "Case File",
  exampleWorlds: "Example Worlds",
  constraints: "Constraints",
  buildGuidance: "Build Guidance",
  submission: "Submission",
};

const enPacks: ChallengePack[] = [
  {
    id: "Internet Money",
    title: "Internet Money",
    summary: "Ana needs the smallest paid promise she can test fast.",
    pickIf:
      "You like micro-SaaS, boring niches, pricing, indie hacking, or paid workflow tools.",
    goal: "Build a tiny AI-powered micro-SaaS someone might actually pay for.",
    caseFile: [
      "Ana is a software developer trying to make her first $1,000 online.",
      "She can build fast, but she keeps making tools that are technically neat and commercially vague. This time she wants to build a tiny AI-powered micro-SaaS for a niche with a painful recurring workflow.",
      "She has one weekend, a small X account, no budget for ads, and no patience for a huge product. The tool needs to be understandable in one sentence, demoable in 60 seconds, and specific enough that someone could imagine paying $5-$20/month for it.",
      "Ana is considering boring niches: freelancers, project managers, marketers, recruiters, dev teams, agencies, creators, event organizers, or any other group with annoying repeat work.",
      "The winner is not the biggest idea. The winner is the smallest paid promise.",
    ],
    constraints: [
      "The SaaS must solve one recurring problem for one specific niche.",
      "The demo must show one clear before/after, not a full product.",
      "The idea should have a plausible path to its first $100.",
    ],
    buildGuidance: [
      "Build the smallest SaaS-shaped tool: one user, one painful input, one AI-powered transformation, one useful output, and one reason someone might pay.",
      "Good shapes include turning messy inputs into useful artifacts, automating a recurring task, diagnosing a problem, generating a sellable asset, or sending a useful notification.",
    ],
  },
  {
    id: "Boring Work Killer",
    title: "Boring Work Killer",
    summary: "Kill one recurring work task people already hate doing.",
    pickIf:
      "You like automation, internal tools, summaries, ops, support, QA, CRM, or productivity workflows.",
    goal: "Build a tiny AI tool that kills one boring recurring work task.",
    caseFile: [
      "Lina works at a small company where important work gets trapped in annoying places: Slack threads, Discord messages, Google Meet transcripts, WhatsApp groups, emails, spreadsheets, Notion docs, Jira tickets, screenshots, PDFs, and voice notes.",
      "None of this work is intellectually hard, but it eats hours. Someone always has to turn the mess into something usable: a clean report, task list, follow-up message, support summary, CRM update, QA bug report, client recap, hiring note, changelog, or decision brief.",
      "Pick a boring task you personally hate doing, or one you know someone loses time doing every week. The task should feel familiar, repetitive, annoying, and small enough that one AI tool can turn one messy input into one useful output.",
    ],
    constraints: [
      "Pick one recurring work task, not an entire company workflow.",
      "The output must be useful without learning a new process.",
      "The before/after should be obvious in 60 seconds.",
    ],
    buildGuidance: [
      "Build the smallest work tool that turns messy work input into a clean artifact, decision, message, table, ticket, brief, summary, or next action.",
    ],
  },
  {
    id: "Stupid App, Real Distribution",
    title: "Stupid App, Real Distribution",
    summary: "Make a dumb internet thing people actually want to share.",
    pickIf:
      "You like weird apps, memes, roasts, quizzes, identity labels, share cards, or viral toys.",
    goal: "Build a tiny weird AI-powered app that someone would actually share.",
    caseFile: [
      "Toni loves tiny internet apps that seem dumb until people start sharing their results.",
      "He is not trying to build a serious SaaS. He wants a small AI-powered app with one simple input and one result people want to screenshot, send to a friend, or post in a group chat.",
      "The app can be funny, brutal, flattering, useful, weirdly accurate, or surprising. It can roast a startup idea, diagnose someone's vibe, translate group chat chaos, rank a bad take, generate an identity label, or make a boring thing feel internet-native.",
      "The danger is confusion. If the joke takes too long to explain, if the output is generic, or if the result does not fit in a screenshot, the app dies.",
      "It can be dumb. It cannot be forgettable.",
    ],
    constraints: [
      "One simple input.",
      "The output should be screenshot-ready or instantly demoable.",
      "Safe to share publicly.",
    ],
    buildGuidance: [
      "Build a tiny AI app where the output is the product: a result, score, diagnosis, roast, badge, card, answer, or transformation that someone wants to show another person.",
    ],
  },
  {
    id: "Autopilot Agents",
    title: "Autopilot Agents",
    summary: "Make an agent wake up, check context, and interrupt only when useful.",
    pickIf:
      "You like agents, automations, alerts, Telegram, WhatsApp, Slack, email, APIs, monitoring, or useful interruptions.",
    goal:
      "Build an agent that wakes up, checks the world, and tells someone only what matters.",
    caseFile: [
      "One of the best things about Hermes Agent is that it can live where you already live: Telegram, WhatsApp, Slack, Discord, email, calendars, APIs, databases, monitoring tools, or any other place where signals appear.",
      "Most AI apps wait for you to open them and ask a question. An Autopilot Agent does the opposite. It wakes up because time passed, something happened, or a real-world trigger fired. Then it checks context, decides if the signal matters, and sends one useful message or action.",
      "This can be personal, operational, protective, money-making, funny, or football-related. The point is not to forward more noise. The point is to interrupt someone only when the agent has something worth saying.",
      "You can use real integrations, simulated integrations, or a mocked Telegram/WhatsApp/Slack notification if that makes the demo clearer in 90 minutes.",
    ],
    exampleWorlds: [
      "World Cup Match Radar: every morning, the agent checks match schedules, timezone, favorite teams, stakes, and your calendar, then sends the one match worth watching today.",
      "Home Alarm Detective: an alarm trigger wakes the agent, checks camera/system context, starts a short monitoring loop, decides if it is a false positive, and notifies you.",
      "Founder Morning Pulse: every morning, the agent checks Stripe or TrustMRR, revenue, signups, churn, support, and inbox, then sends the founder the one thing that needs attention.",
      "Indie Hacker Opportunity Radar: daily heartbeat checks X, Reddit, Hacker News, or niche communities, then maps repeated complaints to one tiny SaaS opportunity.",
      "Event Ops Agent: during an event, the agent checks check-ins, schedule, sponsor needs, and venue notes, then alerts organizers when something needs action.",
      "Life Admin Radar: every morning, the agent checks calendar, weather, bills, errands, travel, or reminders, then sends the one thing that could mess up your day.",
    ],
    constraints: [
      "You must use Hermes Agent meaningfully.",
      "The agent must wake up by heartbeat, schedule, trigger, or simulated trigger.",
      "It must decide what matters instead of forwarding raw data.",
    ],
    buildGuidance: [
      "Build a tiny always-on or trigger-driven agent.",
      "It should feel like a useful interruption: one message that saves attention, prevents a mistake, catches an opportunity, or makes daily life smarter.",
      "If useful, define the agent with: Wake-up, Context, Signals, Decision, Action.",
    ],
  },
  {
    id: "Bring Your Idea",
    title: "Bring Your Idea",
    summary: "Shrink your own idea into one visible before/after.",
    pickIf:
      "You already have a problem, workflow, startup idea, funny toy, personal automation, or app concept.",
    goal:
      "Bring your own idea, but shrink it into a tiny AI tool people can understand in 60 seconds.",
    caseFile: [
      "You already have an idea. It might be a problem from work, a workflow you hate, a startup idea, a funny internet toy, a personal automation, or something you have wanted to build for months.",
      "That is allowed. The only rule: it has to become small enough to build, demo, and judge today.",
      "A good idea has one clear user, one messy input, one AI-powered transformation, and one visible output. If it still feels like a platform, marketplace, social network, operating system, or full startup, cut it down.",
    ],
    constraints: [
      "You must be able to explain the idea in one sentence.",
      "One input is better than five features.",
      "The output must be screenshot-ready, demoable, or obviously useful.",
    ],
    buildGuidance: [
      "Build the smallest version of your idea that creates a visible before/after.",
    ],
  },
];

const esPacks: ChallengePack[] = [
  {
    id: "Internet Money",
    title: "Plata online",
    summary: "Ana necesita la promesa paga más chica que pueda testear rápido.",
    pickIf:
      "Te gustan micro-SaaS, nichos aburridos, pricing, indie hacking o herramientas pagas de workflow.",
    goal: "Construye un micro-SaaS pequeño con IA por el que alguien podría pagar de verdad.",
    caseFile: [
      "Ana es una desarrolladora de software intentando hacer sus primeros $1,000 online.",
      "Puede construir rápido, pero sigue haciendo herramientas técnicamente prolijas y comercialmente vagas. Esta vez quiere construir un micro-SaaS pequeño con IA para un nicho que tenga un workflow recurrente y doloroso.",
      "Tiene un fin de semana, una cuenta chica en X, cero presupuesto para ads y cero paciencia para un producto enorme. La herramienta necesita entenderse en una frase, demostrarse en 60 segundos y ser tan específica que alguien pueda imaginar pagar $5-$20/mes por ella.",
      "Ana está considerando nichos aburridos: freelancers, project managers, marketers, recruiters, equipos dev, agencias, creadores, organizadores de eventos o cualquier otro grupo con trabajo repetitivo molesto.",
      "La idea ganadora no es la más grande. Es la promesa paga más pequeña.",
    ],
    constraints: [
      "El SaaS debe resolver un problema recurrente para un nicho específico.",
      "La demo debe mostrar un antes/después claro, no un producto completo.",
      "La idea debería tener un camino plausible hacia sus primeros $100.",
    ],
    buildGuidance: [
      "Construye la herramienta más chica con forma de SaaS: un usuario, un input doloroso, una transformación con IA, un output útil y una razón por la que alguien podría pagar.",
      "Buenas formas incluyen convertir inputs desordenados en artefactos útiles, automatizar una tarea recurrente, diagnosticar un problema, generar un asset vendible o enviar una notificación útil.",
    ],
  },
  {
    id: "Boring Work Killer",
    title: "Mata lo aburrido",
    summary: "Mata una tarea recurrente que la gente ya odia hacer.",
    pickIf:
      "Te gustan automatizaciones, internal tools, resúmenes, ops, soporte, QA, CRM o workflows de productividad.",
    goal: "Construye una herramienta pequeña de IA que mate una tarea laboral aburrida y recurrente.",
    caseFile: [
      "Lina trabaja en una empresa pequeña donde el trabajo importante queda atrapado en lugares molestos: hilos de Slack, mensajes de Discord, transcripciones de Google Meet, grupos de WhatsApp, emails, spreadsheets, docs de Notion, tickets de Jira, screenshots, PDFs y notas de voz.",
      "Nada de este trabajo es intelectualmente difícil, pero consume horas. Alguien siempre tiene que convertir el caos en algo usable: un reporte limpio, lista de tareas, mensaje de follow-up, resumen de soporte, actualización de CRM, bug report de QA, recap para un cliente, nota de contratación, changelog o brief de decisión.",
      "Elige una tarea aburrida que odies hacer personalmente, o una que sepas que le quita tiempo a alguien cada semana. La tarea debería sentirse familiar, repetitiva, molesta y lo suficientemente pequeña como para que una herramienta de IA convierta un input desordenado en un output útil.",
    ],
    constraints: [
      "Elige una tarea laboral recurrente, no un flujo completo de la empresa.",
      "El output debe ser útil sin aprender un proceso nuevo.",
      "El antes/después debería ser obvio en 60 segundos.",
    ],
    buildGuidance: [
      "Construye la herramienta laboral más chica que convierta un input desordenado de trabajo en un artefacto limpio, decisión, mensaje, tabla, ticket, brief, resumen o próxima acción.",
    ],
  },
  {
    id: "Stupid App, Real Distribution",
    title: "App absurda, distribución real",
    summary: "Haz una cosa tonta de internet que la gente sí quiera compartir.",
    pickIf:
      "Te gustan apps raras, memes, roasts, quizzes, etiquetas de identidad, share cards o juguetes virales.",
    goal: "Construye una app pequeña, rara y con IA que alguien realmente quiera compartir.",
    caseFile: [
      "A Toni le encantan las apps pequeñas de internet que parecen tontas hasta que la gente empieza a compartir sus resultados.",
      "No está intentando construir un SaaS serio. Quiere una app pequeña con IA, con un input simple y un resultado que la gente quiera capturar en screenshot, enviarle a un amigo o publicar en un grupo.",
      "La app puede ser graciosa, brutal, halagadora, útil, extrañamente precisa o sorprendente. Puede hacer roast de una idea de startup, diagnosticar la vibra de alguien, traducir el caos de un chat grupal, rankear una mala opinión, generar una etiqueta de identidad o hacer que algo aburrido se sienta nativo de internet.",
      "El peligro es la confusión. Si el chiste tarda demasiado en explicarse, si el output es genérico o si el resultado no entra en un screenshot, la app muere.",
      "Puede ser tonta. No puede ser olvidable.",
    ],
    constraints: [
      "Un input simple.",
      "El output debería estar listo para screenshot o demo inmediata.",
      "Seguro para compartir públicamente.",
    ],
    buildGuidance: [
      "Construye una app pequeña de IA donde el output sea el producto: un resultado, score, diagnóstico, roast, badge, card, respuesta o transformación que alguien quiera mostrarle a otra persona.",
    ],
  },
  {
    id: "Autopilot Agents",
    title: "Agentes en piloto automático",
    summary: "Haz que un agente despierte, revise contexto e interrumpa solo cuando sirve.",
    pickIf:
      "Te gustan agentes, automatizaciones, alertas, Telegram, WhatsApp, Slack, email, APIs, monitoreo o interrupciones útiles.",
    goal:
      "Construye un agente que se despierta, revisa el mundo y le dice a alguien solo lo que importa.",
    caseFile: [
      "Una de las mejores cosas de Hermes Agent es que puede vivir donde ya vives: Telegram, WhatsApp, Slack, Discord, email, calendarios, APIs, bases de datos, herramientas de monitoreo o cualquier otro lugar donde aparecen señales.",
      "La mayoría de las apps de IA esperan que las abras y hagas una pregunta. Un Autopilot Agent hace lo contrario. Se despierta porque pasó el tiempo, ocurrió algo o se activó un trigger del mundo real. Después revisa contexto, decide si la señal importa y envía un mensaje o acción útil.",
      "Esto puede ser personal, operativo, protector, monetizable, gracioso o relacionado con fútbol. El punto no es reenviar más ruido. El punto es interrumpir a alguien solo cuando el agente tiene algo que vale la pena decir.",
      "Puedes usar integraciones reales, integraciones simuladas o una notificación mockeada de Telegram/WhatsApp/Slack si eso hace más clara la demo en 90 minutos.",
    ],
    exampleWorlds: [
      "World Cup Match Radar: cada mañana, el agente revisa calendarios de partidos, zona horaria, equipos favoritos, stakes y tu calendario, y después envía el único partido que vale la pena ver hoy.",
      "Home Alarm Detective: un trigger de alarma despierta al agente, revisa contexto de cámara/sistema, inicia un loop corto de monitoreo, decide si es un falso positivo y te notifica.",
      "Founder Morning Pulse: cada mañana, el agente revisa Stripe o TrustMRR, revenue, signups, churn, soporte e inbox, y después le manda al founder la única cosa que necesita atención.",
      "Indie Hacker Opportunity Radar: un heartbeat diario revisa X, Reddit, Hacker News o comunidades nicho, y después mapea quejas repetidas a una oportunidad pequeña de SaaS.",
      "Event Ops Agent: durante un evento, el agente revisa check-ins, agenda, necesidades de sponsors y notas del venue, y después alerta a los organizadores cuando algo necesita acción.",
      "Life Admin Radar: cada mañana, el agente revisa calendario, clima, cuentas, mandados, viajes o recordatorios, y después manda la única cosa que podría arruinarte el día.",
    ],
    constraints: [
      "Debes usar Hermes Agent de forma significativa.",
      "El agente debe despertarse por heartbeat, agenda, trigger o trigger simulado.",
      "Debe decidir qué importa en vez de reenviar datos crudos.",
    ],
    buildGuidance: [
      "Construye un agente pequeño always-on o activado por triggers.",
      "Debería sentirse como una interrupción útil: un mensaje que ahorra atención, evita un error, detecta una oportunidad o hace la vida diaria más inteligente.",
      "Si sirve, define el agente con: Activación, Contexto, Señales, Decisión, Acción.",
    ],
  },
  {
    id: "Bring Your Idea",
    title: "Traé tu idea",
    summary: "Achica tu propia idea hasta un antes/después visible.",
    pickIf:
      "Ya tienes un problema, workflow, idea de startup, juguete divertido, automatización personal o concepto de app.",
    goal:
      "Trae tu propia idea, pero achícala hasta una tiny tool de IA que la gente entienda en 60 segundos.",
    caseFile: [
      "Ya tienes una idea. Puede ser un problema del trabajo, un workflow que odias, una idea de startup, un juguete divertido de internet, una automatización personal o algo que querías construir hace meses.",
      "Eso vale. La única regla: tiene que volverse lo suficientemente chica como para construirla, demoearla y juzgarla hoy.",
      "Una buena idea tiene un usuario claro, un input desordenado, una transformación con IA y un output visible. Si todavía se siente como plataforma, marketplace, red social, sistema operativo o startup completa, recórtala.",
    ],
    constraints: [
      "Debes poder explicar la idea en una frase.",
      "Un input es mejor que cinco features.",
      "El output debe estar listo para screenshot, demo o uso obvio.",
    ],
    buildGuidance: [
      "Construye la versión más chica de tu idea que cree un antes/después visible.",
    ],
  },
];

const enSubmission = [
  "Post what you built.",
  "Screenshot, short video, or visual proof. 90 seconds max if video.",
  "Mention built with Hermes Agent and Nebius.",
  "Tag @nerdconf_ar, @nebiusai, and @nousresearch",
];

const esSubmission = [
  "Postea lo que construiste.",
  "Screenshot, video corto o prueba visual. Máximo 90 segundos si es video.",
  "Menciona que fue construido con Hermes Agent y Nebius.",
  "Etiqueta a @nerdconf_ar, @nebiusai y @nousresearch",
];

const enRefereePromptTemplate = `You are my Tiny Tools World Cup Challenge Referee.

Your role:
- Help me understand the case.
- Help me reason through the problem.
- Keep me inside the challenge rules.
- Help me scope a tiny tool that can be demoed in 60 seconds.
- Do not write code or build anything unless I explicitly ask you to.

Important:
- The agent is optional. I may use you only to think.
- Do not choose the final idea for me.
- Do not one-shot an app.
- Ask short questions.
- Keep me moving.
- Push for a tiny tool, not a startup.
- If I am working solo, act as a structured coach.
- If I am working in a duo, ask each person for one possible interpretation before narrowing.

Start by asking me:
"Do you want help thinking through the problem, or are you ready to define your build?"

If I want help thinking:
1. Summarize the case in plain language.
2. Ask me what interpretation of the problem feels interesting.
3. If I am stuck, offer 2-3 broad directions, but do not choose for me.
4. Ask me which direction I believe.
5. Help me complete the optional 30-second build brief.

If I am ready:
Ask me to complete the optional 30-second build brief directly.

Optional 30-second build brief:
- Problem:
- Who is this for?
- Tiny tool:
- Before -> after:
- 60-second demo:

Definitions:
- Problem: what real problem or opportunity I chose.
- Who is this for?: the person or group that would use, share, or care about it.
- Tiny tool: the smallest AI-powered artifact I will build.
- Before -> after: what changes because the tool exists.
- 60-second demo: what I will show quickly.

After the brief is complete:
Ask me:
"Do you want help building, prompting, or packaging the demo?"

Only help build or code after I explicitly choose building.

Challenge rules:
- I have 90 minutes.
- The output must be demoable in 60-90 seconds.
- The tool should create a clear before/after.
- It should be useful, funny, money-making, or surprisingly cool.
- I should use Hermes Agent + NEBIUS meaningfully.`;

const esRefereePromptTemplate = `Eres mi árbitro del Tiny Tools World Cup Challenge.

Tu rol:
- Ayudarme a entender el caso.
- Ayudarme a razonar el problema.
- Mantenerme dentro de las reglas del challenge.
- Ayudarme a scopear una tiny tool que se pueda demoear en 60 segundos.
- No escribas código ni construyas nada salvo que te lo pida explícitamente.

Importante:
- El agente es opcional. Puede que solo te use para pensar.
- No elijas la idea final por mí.
- No hagas una app completa de una.
- Haz preguntas cortas.
- Mantenme avanzando.
- Empuja hacia una tiny tool, no una startup.
- Si estoy trabajando solo, actúa como coach estructurado.
- Si estoy trabajando en duo, pídele a cada persona una interpretación posible antes de achicar.

Empieza preguntándome:
"¿Quieres ayuda para pensar el problema o ya estás listo para definir tu build?"

Si quiero ayuda para pensar:
1. Resume el caso en lenguaje simple.
2. Pregúntame qué interpretación del problema me parece interesante.
3. Si estoy trabado, ofrece 2-3 direcciones amplias, pero no elijas por mí.
4. Pregúntame en qué dirección creo.
5. Ayúdame a completar el brief opcional de build en 30 segundos.

Si ya estoy listo:
Pídeme completar directamente el brief opcional de build en 30 segundos.

Brief opcional de build en 30 segundos:
- Problema:
- ¿Para quién es?
- Tiny tool:
- Antes -> después:
- Demo de 60 segundos:

Definiciones:
- Problema: qué problema real u oportunidad elegí.
- ¿Para quién es?: la persona o grupo que lo usaría, compartiría o le daría importancia.
- Tiny tool: el artefacto más chico con IA que voy a construir.
- Antes -> después: qué cambia porque la herramienta existe.
- Demo de 60 segundos: qué voy a mostrar rápido.

Después de completar el brief:
Pregúntame:
"¿Quieres ayuda construyendo, prompteando o empaquetando la demo?"

Solo ayuda a construir o codear después de que yo elija explícitamente construir.

Reglas del challenge:
- Tengo 90 minutos.
- El output debe poder demoearse en 60-90 segundos.
- La herramienta debe crear un before/after claro.
- Debe ser útil, divertida, monetizable o sorprendentemente cool.
- Debo usar Hermes Agent + NEBIUS de forma significativa.`;

export const challengeContent = {
  en: {
    universalSubmission: enSubmission,
    problemPacks: enPacks,
    refereePromptTemplate: enRefereePromptTemplate,
    promptLabels: enPromptLabels,
  },
  es: {
    universalSubmission: esSubmission,
    problemPacks: esPacks,
    refereePromptTemplate: esRefereePromptTemplate,
    promptLabels: esPromptLabels,
  },
} satisfies Record<
  Language,
  {
    universalSubmission: string[];
    problemPacks: ChallengePack[];
    refereePromptTemplate: string;
    promptLabels: PromptLabels;
  }
>;

export function getChallengeContent(language: Language) {
  return challengeContent[language];
}

export function buildAgentPrompt(pack: ChallengePack, language: Language) {
  const content = getChallengeContent(language);
  const labels = content.promptLabels;

  return `${content.refereePromptTemplate}

${labels.selectedCase}:

${labels.pack}:
${pack.title}

${labels.goal}:
${pack.goal}

${labels.caseFile}:
${pack.caseFile.join("\n\n")}
${
  pack.exampleWorlds?.length
    ? `
${labels.exampleWorlds}:
${pack.exampleWorlds.map((item) => `- ${item}`).join("\n")}
`
    : ""
}
${labels.constraints}:
${pack.constraints.map((item) => `- ${item}`).join("\n")}

${labels.buildGuidance}:
${pack.buildGuidance.join("\n\n")}

${labels.submission}:
${content.universalSubmission.map((item) => `- ${item}`).join("\n")}`;
}
