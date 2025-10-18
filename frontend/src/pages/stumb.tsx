import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { ChevronDown, ChevronUp, Maximize2, Minimize2, ThumbsDown, ThumbsUp } from "lucide-react";

type MoodOption = {
  id: string;
  label: string;
  description: string;
  emoji: string;
};

type Reaction = {
  emoji: string;
  label: string;
  intensity: number;
};

type Expansion = {
  id: string;
  label: string;
  detail: string;
  source: string;
};

type SampleContent = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  summary: string;
  expansions: Expansion[];
  why: string;
  whisper: string;
  moods: string[];
  tags: string[];
  communityPulse: Reaction[];
  rewind: string[];
  source: "sample" | "api";
  website?: WebsiteResult;
};

const accentStyles = {
  default: {
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600",
    ring: "ring-blue-500",
    chip: "bg-blue-100 text-blue-800",
    highlight: "bg-blue-500 text-white",
    surface: "bg-blue-50",
    tag: "text-blue-600"
  },
  science: {
    gradient: "bg-gradient-to-r from-cyan-600 to-blue-700",
    ring: "ring-cyan-500",
    chip: "bg-cyan-900 text-cyan-200",
    highlight: "bg-cyan-500 text-white",
    surface: "bg-cyan-900",
    tag: "text-cyan-300"
  },
  playful: {
    gradient: "bg-gradient-to-r from-pink-600 to-yellow-600",
    ring: "ring-pink-500",
    chip: "bg-pink-900 text-pink-200",
    highlight: "bg-pink-500 text-white",
    surface: "bg-pink-900",
    tag: "text-pink-300"
  },
  future: {
    gradient: "bg-gradient-to-r from-green-600 to-teal-700",
    ring: "ring-green-500",
    chip: "bg-green-900 text-green-200",
    highlight: "bg-green-500 text-white",
    surface: "bg-green-900",
    tag: "text-green-300"
  },
  ethics: {
    gradient: "bg-gradient-to-r from-purple-600 to-indigo-700",
    ring: "ring-purple-500",
    chip: "bg-purple-900 text-purple-200",
    highlight: "bg-purple-500 text-white",
    surface: "bg-purple-900",
    tag: "text-purple-300"
  }
};

type AccentStyle = {
  gradient: string;
  ring: string;
  chip: string;
  highlight: string;
  surface: string;
  tag: string;
};

type WebsiteResult = {
  url: string;
  title: string;
  category?: string;
  description?: string;
  ai_explanation?: string;
};

const moodOptions: MoodOption[] = [
  {
    id: "learn",
    label: "I feel like learning",
    description: "Deep dives, explainers, brain food.",
    emoji: "🧠",
  },
  {
    id: "laugh",
    label: "I want to laugh",
    description: "Playful side quests and delight.",
    emoji: "😂",
  },
  {
    id: "weird",
    label: "Show me weird stuff",
    description: "Glitchy art, fringe forums, oddities.",
    emoji: "🌀",
  },
  {
    id: "inspire",
    label: "Inspire me",
    description: "Visionary ideas and optimism.",
    emoji: "✨",
  },
  {
    id: "reflect",
    label: "Prompt reflection",
    description: "Ethics, philosophy, mindful takes.",
    emoji: "🧘",
  },
];

const sampleContent: SampleContent[] = [
  {
    id: "quantum-computing",
    title: "Quantum Horizons",
    subtitle: "Threading your AI ethics binge with bleeding-edge physics.",
    url: "https://en.wikipedia.org/wiki/Quantum_computing",
    category: "science",
    summary:
      "Quantum computing uses qubits that hold multiple states at once, unlocking exponential problem spaces for simulation, optimization, and cryptography. This piece maps the landscape from hardware race to ethical ripple effects you have been exploring.",
    expansions: [
      {
        id: "arxiv",
        label: "arXiv radar",
        detail: "Top fault-tolerance breakthroughs published this week, translated to a three-minute brief.",
        source: "arxiv.org",
      },
      {
        id: "visual",
        label: "5-min visual",
        detail: "Animations that connect entanglement to cognition so you can explain it in plain language.",
        source: "YouTube",
      },
      {
        id: "counter",
        label: "Skeptic's take",
        detail: "A philosopher deconstructs quantum hype and why progress still needs analog intuition.",
        source: "Aeon",
      },
    ],
    why: "You saved an article on AI sentience debates last week, so we're pairing it with quantum cognition perspectives.",
    whisper: "78% of futurists who bookmarked this also loved a 2009 blog called 'Entangled Minds'.",
    moods: ["learn", "inspire", "reflect"],
    tags: ["Future Tech", "Mind Blown", "To Discuss with Alex"],
    communityPulse: [
      { emoji: "🤯", label: "Mind Blown", intensity: 82 },
      { emoji: "🔥", label: "On Fire", intensity: 68 },
      { emoji: "💡", label: "Ideas Sparked", intensity: 74 },
      { emoji: "🤔", label: "Deep Think", intensity: 56 },
    ],
    rewind: [
      "2021 · Chased astrophotography rabbit holes for 12 nights straight.",
      "2022 · Binged AI alignment manifestos during midnight sessions.",
      "2023 · Replayed 'Interstellar' soundtrack while reading decoherence threads.",
    ],
    source: "sample",
  },
  {
    id: "absurdist-internet",
    title: "Absurdist Sidequests",
    subtitle: "Your laughter craving meets indie net-art memetics.",
    url: "https://en.wikipedia.org/wiki/Surreal_humour",
    category: "playful",
    summary:
      "Surreal humour reframes expectation with absurd juxtapositions—perfect for unlocking a lighter dopamine hit between your heavier research streaks. Today's stumble curates meme ecologies through a cultural lens.",
    expansions: [
      {
        id: "newsletter",
        label: "Inbox oddity",
        detail: "Weekly digest of emerging absurdist creators remixing AI image models.",
        source: "Substack",
      },
      {
        id: "thread",
        label: "Community thread",
        detail: "High-signal discussion on how surreal memes became collective coping rituals.",
        source: "Are.na",
      },
      {
        id: "playlist",
        label: "Mood playlist",
        detail: "Lo-fi glitch beats to soundtrack your next co-stumble session.",
        source: "Spotify",
      },
    ],
    why: "You nudged the mood slider toward laughter during late-night sessions—serving creative levity to balance analytical focus.",
    whisper: "Try saying \"surprise me harder\" next time; 61% of explorers unlocked an interactive ARG.",
    moods: ["laugh", "weird"],
    tags: ["Play Queue", "Mood Booster"],
    communityPulse: [
      { emoji: "😂", label: "Laugh Riot", intensity: 71 },
      { emoji: "🔥", label: "On Fire", intensity: 52 },
      { emoji: "🤔", label: "Deep Think", intensity: 28 },
      { emoji: "💡", label: "Ideas Sparked", intensity: 39 },
    ],
    rewind: [
      "2019 · Fell into vaporwave Tumblr archives.",
      "2020 · Shared 14 surreal memes with your co-founder in one night.",
      "2024 · Experimented with AI-generated comic panels.",
    ],
    source: "sample",
  },
  {
    id: "solarpunk-systems",
    title: "Solarpunk Blueprints",
    subtitle: "Optimism engines for the futures you keep sketching.",
    url: "https://en.wikipedia.org/wiki/Solarpunk",
    category: "future",
    summary:
      "Solarpunk blends renewable tech with equitable community design, aligning with your recent notes on regenerative cities. This curation surfaces systems thinking, visual manifestos, and grounded prototypes.",
    expansions: [
      {
        id: "case-study",
        label: "Living lab",
        detail: "Community microgrid case study with annotated design files.",
        source: "Medium",
      },
      {
        id: "toolkit",
        label: "Design toolkit",
        detail: "Open-source playbook for co-creating solarpunk public spaces.",
        source: "GitHub",
      },
      {
        id: "counter",
        label: "Critical lens",
        detail: "Urban planner critiques idealism with pragmatic adoption steps.",
        source: "CityLab",
      },
    ],
    why: "Morning focus block flagged 'build me hopeful futures', so we're feeding the inspire intent with actionable systems.",
    whisper: "68% of dreamers paired this with a community build in our co-stumble lounge.",
    moods: ["inspire", "learn"],
    tags: ["Future Tech", "Inspire Me"],
    communityPulse: [
      { emoji: "💡", label: "Ideas Sparked", intensity: 81 },
      { emoji: "🔥", label: "On Fire", intensity: 47 },
      { emoji: "🤔", label: "Deep Think", intensity: 66 },
      { emoji: "🤝", label: "Collab Ready", intensity: 58 },
    ],
    rewind: [
      "2018 · Sketched eco-village concepts in your bullet journal.",
      "2020 · Hosted a climate optimism salon.",
      "2023 · Tracked 12 regenerative startups in your AI journal.",
    ],
    source: "sample",
  },
  {
    id: "ethical-alignment",
    title: "Alignment Compass",
    subtitle: "Mindful tech guardrails for your reflective evenings.",
    url: "https://en.wikipedia.org/wiki/Technology_ethics",
    category: "ethics",
    summary:
      "Technology ethics interrogates power, accountability, and human flourishing. This selection distills frameworks that resonate with your reflective intent and recent bookmarks on AI transparency.",
    expansions: [
      {
        id: "panel",
        label: "Roundtable audio",
        detail: "Philosophers and founders debate algorithmic dignity in 22 minutes.",
        source: "On Deck",
      },
      {
        id: "paper",
        label: "Research pulse",
        detail: "Annotated summary of the top fairness audit paper trending this week.",
        source: "arxiv.org",
      },
      {
        id: "practice",
        label: "Ethics toolkit",
        detail: "Decision canvas you can drop into your next product sprint.",
        source: "Notion",
      },
    ],
    why: "You toggled Ethical Filter to 'on' for six consecutive stumbles—rewarding that intent with deeper trust tooling.",
    whisper: "47% of reflective explorers bookmarked this alongside a compassion meditation.",
    moods: ["reflect", "learn"],
    tags: ["Ethical Lens", "Team Workshop"],
    communityPulse: [
      { emoji: "🤔", label: "Deep Think", intensity: 84 },
      { emoji: "💡", label: "Ideas Sparked", intensity: 63 },
      { emoji: "🔥", label: "On Fire", intensity: 41 },
      { emoji: "🤝", label: "Collab Ready", intensity: 52 },
    ],
    rewind: [
      "2017 · Annotated the ACM ethical guidelines.",
      "2021 · Ran a blackout day to examine attention ethics.",
      "2024 · Drafted a trust charter for your product team.",
    ],
    source: "sample",
  },
];

const getBarWidth = (value: number): string => {
  if (value >= 90) {
    return "w-full";
  }
  if (value >= 70) {
    return "w-5/6";
  }
  if (value >= 60) {
    return "w-4/5";
  }
  if (value >= 50) {
    return "w-3/4";
  }
  if (value >= 40) {
    return "w-2/3";
  }
  if (value >= 30) {
    return "w-1/2";
  }
  if (value >= 20) {
    return "w-2/5";
  }
  return "w-1/3";
};

const mapCategoryToAccent = (category?: string): keyof typeof accentStyles => {
  if (!category) {
    return "default";
  }
  const normalized = category.toLowerCase();
  if (normalized.includes("science") || normalized.includes("tech")) {
    return "science";
  }
  if (normalized.includes("play") || normalized.includes("fun") || normalized.includes("creative")) {
    return "playful";
  }
  if (normalized.includes("future") || normalized.includes("design") || normalized.includes("optim")) {
    return "future";
  }
  if (normalized.includes("ethic") || normalized.includes("trust") || normalized.includes("reflect")) {
    return "ethics";
  }
  return "default";
};

// Helper functions for API integration (not used in static version)
// const createExpansions = (website: WebsiteResult): Expansion[] => [...]

// const createCommunityPulse = (): Reaction[] => [...]

// const createRewind = (title: string): string[] => [...]

// const createWhy = (mood: MoodOption, website: WebsiteResult): string => [...]
// const createWhisper = (website: WebsiteResult): string => [...]

// Removed API transformation function since we're hardcoding data

const Stumb = () => {
  // Basic theme styles (dark theme)
  const layout = {
    pageRoot: "min-h-screen bg-gray-900 text-white",
    headerBase: "sticky top-0 z-50 bg-gray-800 border-b border-gray-700",
    headerContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
    headerCard: "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4",
    headerTopRow: "flex items-center justify-between",
    brandRow: "flex items-center space-x-3",
    brandIcon: "w-10 h-10 rounded-lg flex items-center justify-center text-white",
    brandIconGlyph: "text-xl",
    brandTextWrapper: "flex flex-col",
    brandKicker: "text-xs text-gray-400 uppercase tracking-wide",
    brandTitle: "text-lg font-semibold text-white",
    headerActions: "flex items-center space-x-2",
    expandedRow: "mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-2",
    communityRow: "mt-4 pt-4 border-t border-gray-700 flex items-center space-x-2",
    mainContainer: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
    summaryRow: "mb-6",
    columns: "grid grid-cols-1 lg:grid-cols-3 gap-8",
    primaryColumn: "lg:col-span-2 space-y-6",
    asideColumn: "space-y-6",
    heroCard: "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6",
    heroHeader: "mb-4",
    flexWrapGap2: "flex flex-wrap gap-2",
    iframeCard: "relative bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden",
    iframeGradient: "absolute inset-0 opacity-5 pointer-events-none",
    liveBadge: "absolute top-4 left-4 bg-gray-700 px-3 py-1 rounded-full shadow-sm border border-gray-600 flex items-center space-x-2 z-10",
    iframe: "w-full h-96 border-0",
    focusIframe: "w-full h-screen border-0",
    iframeFooter: "p-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400",
    cardStandard: "bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6",
    rowBetween: "flex items-center justify-between mb-3",
    rowGap3Base: "flex items-center space-x-3 mb-3",
    rowGap3: "flex items-center space-x-3",
    focusContainer: "fixed inset-0 z-50 bg-gray-900",
    focusExitWrapper: "absolute bottom-8 left-1/2 transform -translate-x-1/2",
    savedAlert: "bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg mb-4",
    relative: "relative",
    coStumbleLink: "bg-gray-700 px-3 py-2 rounded text-sm font-mono text-gray-300 mb-3 break-all",
    rewindList: "space-y-2",
    rewindRow: "flex items-start space-x-2",
    voiceIndicator: "flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-blue-300 mb-3",
    communityPill: "flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-200",
    whisperWidget: "fixed bottom-8 left-8 right-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 max-w-2xl mx-auto",
    whisperRow: "flex items-start space-x-3",
    statusRow: "flex items-center space-x-2 mt-3 text-sm text-gray-400"
  };
  
  const text = {
    srOnly: "sr-only",
    moodChip: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
    subtitle: "block text-xs text-gray-400 mt-1",
    moodDescription: "mt-2 text-sm text-gray-300",
    heroTitle: "text-2xl font-bold text-white mb-2",
    heroSubtitle: "text-gray-300 mb-4",
    tag: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
    liveDot: "w-2 h-2 bg-green-500 rounded-full mr-2",
    shareButton: "text-blue-600 hover:text-blue-800 font-medium",
    smallMuted: "text-sm text-gray-400",
    sectionTitle: "text-lg font-semibold text-white",
    sectionSubtitle: "text-sm text-gray-300 mb-3",
    sectionBody: "text-gray-200 mb-3",
    sectionBodyMuted: "text-gray-400 italic mb-3",
    sectionBodyNeutral: "text-gray-200 mb-3",
    sectionBodyNeutralAlt: "text-gray-300 mb-3",
    sectionCaption: "text-xs text-gray-400 mt-2",
    itemHeading: "font-medium text-white",
    xsMuted: "text-xs text-gray-400 mt-1",
    communityTitle: "text-sm font-medium text-gray-200 mr-2",
    communityLabel: "text-sm text-gray-300 mr-1",
    communityValue: "text-sm font-medium text-gray-900",
    reactionInfo: "flex items-center space-x-2 text-sm text-gray-200 flex-1",
    reactionEmoji: "text-lg",
    successCaption: "text-sm text-green-600 font-medium",
    whisperKicker: "text-xs font-medium text-gray-400 uppercase tracking-wide mb-1",
    whisperBody: "text-sm text-gray-200",
    whisperIconText: "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm mr-3"
  };
  
  const buttons = {
    primary: "px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2",
    primaryActive: "px-4 py-2 rounded-lg font-medium text-white flex items-center space-x-2",
    secondary: "px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-2",
    tertiary: "px-3 py-2 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-2",
    toggle: "px-3 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-2",
    filter: "px-3 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center space-x-2",
    copy: "px-3 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
  };
  
  const buttonStates = {
    voiceActive: "bg-blue-600 text-white",
    voiceInactive: "bg-gray-700 text-gray-200",
    summaryInactive: "bg-gray-700 text-gray-200",
    coStumbleInactive: "bg-gray-700 text-gray-200",
    rewindInactive: "bg-gray-700 text-gray-200",
    likeActive: "bg-blue-900 text-blue-200",
    journalActive: "bg-green-100 text-green-700",
    journalInactive: "bg-gray-700 text-gray-200"
  };
  
  const loader = {
    wrapper: "relative w-5 h-5 inline-block",
    ring: "absolute inset-0 border-2 border-gray-600 border-t-blue-600 rounded-full",
    core: "absolute inset-1 bg-transparent rounded-full"
  };
  
  const select = {
    wrapper: "relative flex items-center space-x-2",
    emoji: "text-lg",
    control: "bg-gray-700 border-0 text-sm font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded cursor-pointer px-2 py-1",
    option: "bg-gray-800 text-white"
  };
  
  const spacing = {
    headerExpanded: "pt-24",
    headerCollapsed: "pt-8"
  };
  
  const toggles = {
    track: "relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    trackActive: "bg-blue-600",
    trackInactive: "bg-gray-600",
    thumb: "inline-block w-4 h-4 transform transition-transform bg-white rounded-full shadow-md",
    thumbActive: "translate-x-6",
    thumbInactive: "translate-x-1"
  };
  
  const tooltip = {
    why: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap z-50 border border-gray-700"
  };
  
  const progress = {
    track: "flex-1 bg-gray-600 rounded-full h-2 mr-3",
    fill: "h-full rounded-full transition-all duration-300"
  };
  
  const icons = {
    iconSmall: "w-4 h-4",
    iconMedium: "w-6 h-6",
    voiceWrapper: "relative inline-flex",
    voiceGlow: "absolute inset-0 rounded-full opacity-20",
    voiceGlowActive: "bg-blue-500 animate-pulse",
    voiceGlowInactive: "bg-gray-400",
    voiceIndicator: "flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-blue-300 mb-3",
    gradientBullet: "w-2 h-2 rounded-full mr-3 flex-shrink-0 mt-2",
    rewindBullet: "w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0",
    dot: "w-1.5 h-1.5 rounded-full bg-green-500 mr-2"
  };
  
  const states = {
    dimmed: "opacity-50"
  };
  
  const badges = {
    intent: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
  };
  
  const lists = {
    signalRow: "flex items-start space-x-2 mt-3 text-sm text-gray-300",
    spacingLarge: "space-y-4",
    item: "flex items-start space-x-3",
    reactionRow: "flex items-center space-x-3"
  };
  
  const animations = {
    spin: "animate-spin",
    ping: "animate-ping",
    pulse: "animate-pulse"
  };
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const [activeSample, setActiveSample] = useState<SampleContent>(sampleContent[0]);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(true);
  const [expandVisible, setExpandVisible] = useState<boolean>(false);
  const [whyHover, setWhyHover] = useState<boolean>(false);
  const [whyPinned, setWhyPinned] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [journalSaved, setJournalSaved] = useState<boolean>(false);
  const [coStumbleVisible, setCoStumbleVisible] = useState<boolean>(false);
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [rewindVisible, setRewindVisible] = useState<boolean>(false);
  const [ethicalFilter, setEthicalFilter] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedUrls, setLikedUrls] = useState<string[]>([]);
  const [headerExpanded, setHeaderExpanded] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const accent = useMemo<AccentStyle>(() => {
    return accentStyles[activeSample.category as keyof typeof accentStyles] ?? accentStyles.default;
  }, [activeSample.category]);

  const shareLink = activeSample.url;
  const isLiked = likedUrls.includes(activeSample.url);

  useEffect(() => {
    if (!journalSaved) {
      return;
    }
    const timer = window.setTimeout(() => setJournalSaved(false), 3200);
    return () => window.clearTimeout(timer);
  }, [journalSaved]);

  useEffect(() => {
    if (focusMode) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [focusMode]);

  const handleMoodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextMood = moodOptions.find((option) => option.id === event.target.value) ?? moodOptions[0];
    setSelectedMood(nextMood);
  };

  const handleStumble = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveSample((previous) => {
        const relevant = sampleContent.filter((item) => item.moods.includes(selectedMood.id));
        const pool = relevant.length > 0 ? relevant : sampleContent;
        if (pool.length === 0) {
          return previous ?? sampleContent[0];
        }
        let next = pool[Math.floor(Math.random() * pool.length)];
        if (previous && next.id === previous.id && pool.length > 1) {
          const alternatives = pool.filter((item) => item.id !== previous.id);
          next = alternatives[Math.floor(Math.random() * alternatives.length)];
        }
        return next;
      });
      setSummaryVisible(true);
      setExpandVisible(false);
      setWhyPinned(false);
      setWhyHover(false);
      setVoiceActive(false);
      setCoStumbleVisible(false);
      setLinkCopied(false);
      setRewindVisible(false);
      setJournalSaved(false);
      setIsLoading(false);
    }, 1000);
  };

  const sendFeedback = (feedback: "like" | "dislike" | "love") => {
    console.log(`Feedback: ${feedback} for ${activeSample.title}`);
  };

  const handleLike = () => {
    sendFeedback("like");
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
  };

  const handleDislike = () => {
    sendFeedback("dislike");
    setLikedUrls((prev) => prev.filter((url) => url !== activeSample.url));
    handleStumble();
  };

  const handleSaveToJournal = () => {
    setJournalSaved(true);
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
    sendFeedback("love");
  };

  const handleCopyShare = () => {
    if (!shareLink) {
      return;
    }
    setLinkCopied(true);
    if (typeof navigator !== "undefined" && navigator.clipboard && "writeText" in navigator.clipboard) {
      void navigator.clipboard.writeText(shareLink).catch(() => undefined);
    }
  };

  const handleShare = () => {
    if (!shareLink || typeof navigator === "undefined" || !("share" in navigator)) {
      handleCopyShare();
      return;
    }
    void navigator
      .share({
        title: activeSample.title,
        url: shareLink,
      })
      .catch(() => undefined);
  };

  const showWhyTooltip = whyHover || whyPinned;
  const pulsePreview = activeSample.communityPulse.slice(0, 3);
  const mainPaddingClass = headerExpanded ? spacing.headerExpanded : spacing.headerCollapsed;
  const accentKey = mapCategoryToAccent(activeSample.category);

  if (focusMode) {
    return (
      <div className={layout.focusContainer}>
        <iframe src={activeSample.url} title={activeSample.title} className={layout.focusIframe} loading="lazy" />
        <div className={layout.focusExitWrapper}>
          <button
            type="button"
            onClick={() => setFocusMode(false)}
            className={`${buttons.primaryActive} ${accent.gradient}`}
          >
            <Minimize2 className={icons.iconSmall} />
            <span>Exit focus</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`theme-og ${layout.pageRoot}`} data-accent={accentKey}>
      <header className={layout.headerBase}>
        <div className={layout.headerContainer}>
          <div className={`${layout.headerCard} ${accent.ring}`}>
            <div className={layout.headerTopRow}>
              <div className={layout.brandRow}>
                <div className={`${layout.brandIcon} ${accent.gradient}`}>
                  <span className={layout.brandIconGlyph}>🔮</span>
                </div>
                <div className={layout.brandTextWrapper}>
                  <span className={layout.brandKicker}>StumbleUpon 2025</span>
                  <span className={layout.brandTitle}>Serendipity Engine</span>
                </div>
              </div>
              <div className={layout.headerActions}>
                <button
                  type="button"
                  onClick={handleStumble}
                  disabled={isLoading}
                  className={`${buttons.primary} ${accent.gradient}`}
                >
                  <span className={loader.wrapper}>
                    <span
                      className={`${loader.ring} ${isLoading ? animations.spin : animations.ping}`}
                    />
                    <span className={loader.core} />
                  </span>
                  <span>{isLoading ? "Summoning" : "AI Stumble"}</span>
                </button>
                <div className={select.wrapper}>
                  <span className={select.emoji}>{selectedMood.emoji}</span>
                  <label className={text.srOnly} htmlFor="mood-selector">
                    Mood selector
                  </label>
                  <select
                    id="mood-selector"
                    value={selectedMood.id}
                    onChange={handleMoodChange}
                    className={select.control}
                  >
                    {moodOptions.map((option) => (
                      <option key={option.id} value={option.id} className={select.option}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setFocusMode(true)}
                  disabled={!activeSample.url}
                  className={buttons.secondary}
                >
                  <Maximize2 className={icons.iconSmall} />
                  <span>Focus mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeaderExpanded((prev) => !prev)}
                  className={buttons.tertiary}
                >
                  {headerExpanded ? <ChevronUp className={icons.iconSmall} /> : <ChevronDown className={icons.iconSmall} />}
                  <span>{headerExpanded ? "Collapse" : "Expand"}</span>
                </button>
              </div>
            </div>
            {headerExpanded && (
              <>
                <div className={layout.expandedRow}>
                  <div className={layout.headerActions}>
                    <button
                      type="button"
                      onClick={() => setVoiceActive((prev) => !prev)}
                      className={`${buttons.toggle} ${voiceActive ? buttonStates.voiceActive : buttonStates.voiceInactive}`}
                    >
                      <span className={icons.voiceWrapper}>
                        <span
                          className={`${icons.voiceGlow} ${voiceActive ? icons.voiceGlowActive : icons.voiceGlowInactive}`}
                        />
                        <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3z" />
                          <path d="M19 11v1a7 7 0 0 1-14 0v-1" />
                          <path d="M12 21v-2" />
                        </svg>
                      </span>
                      <span>{voiceActive ? "Listening" : "Voice Stumble"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSummaryVisible((prev) => !prev)}
                      className={`${buttons.toggle} ${summaryVisible ? accent.highlight : buttonStates.summaryInactive}`}
                    >
                      <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 6h8" />
                        <path d="M12 12h8" />
                        <path d="M12 18h8" />
                        <path d="M4 6h.01" />
                        <path d="M4 12h.01" />
                        <path d="M4 18h.01" />
                      </svg>
                      <span>{summaryVisible ? "AI Summary On" : "AI Summary Off"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandVisible((prev) => !prev)}
                      className={`${buttons.toggle} ${expandVisible ? accent.highlight : buttonStates.summaryInactive}`}
                    >
                      <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h6v6" />
                        <path d="M20 20h-6v-6" />
                        <path d="M20 4h-6v6" />
                        <path d="M4 20h6v-6" />
                      </svg>
                      <span>{expandVisible ? "Expand On" : "Expand Scope"}</span>
                    </button>
                    <div
                      className={layout.relative}
                      onMouseEnter={() => setWhyHover(true)}
                      onMouseLeave={() => setWhyHover(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setWhyPinned((prev) => !prev)}
                        className={`${buttons.toggle} ${whyPinned ? accent.highlight : buttonStates.summaryInactive}`}
                      >
                        <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 19v-7" />
                          <path d="M5 12h14" />
                          <path d="M12 5v2" />
                          <path d="M6 8l-1-2" />
                          <path d="M18 8l1-2" />
                        </svg>
                        <span>Why this?</span>
                      </button>
                      {showWhyTooltip && (
                        <div className={tooltip.why}>
                          <p>{activeSample.why}</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveToJournal}
                      className={`${buttons.toggle} ${journalSaved ? buttonStates.journalActive : buttonStates.journalInactive}`}
                    >
                      <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 5h10a4 4 0 0 1 4 4v10l-4-2-4 2V9a4 4 0 0 0-4-4H5z" />
                        <path d="M5 5v14" />
                      </svg>
                      <span>{journalSaved ? "Saved" : "Save to AI Journal"}</span>
                    </button>
                  </div>
                  <div className={layout.headerActions}>
                    <button
                      type="button"
                      onClick={() => setCoStumbleVisible((prev) => !prev)}
                      className={`${buttons.toggle} ${coStumbleVisible ? accent.highlight : buttonStates.coStumbleInactive}`}
                    >
                      <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5a4 4 0 1 1-4 4" />
                        <path d="M16 21v-2a4 4 0 0 0-8 0v2" />
                        <path d="M6 8a4 4 0 0 0-1 7" />
                        <path d="M18 8a4 4 0 0 1 1 7" />
                      </svg>
                      <span>Co-Stumble</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRewindVisible((prev) => !prev)}
                      className={`${buttons.toggle} ${rewindVisible ? accent.highlight : buttonStates.rewindInactive}`}
                    >
                      <svg className={icons.iconSmall} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12A9 9 0 1 1 12 3" />
                        <path d="M21 3v9h-9" />
                      </svg>
                      <span>Rewind My Web</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLike}
                      disabled={isLoading}
                      className={`${buttons.toggle} ${isLiked ? accent.highlight : buttonStates.likeActive}`}
                    >
                      <ThumbsUp className={icons.iconSmall} />
                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDislike}
                      disabled={isLoading}
                      className={buttons.secondary}
                    >
                      <ThumbsDown className={icons.iconSmall} />
                      <span>Skip</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEthicalFilter((prev) => !prev)}
                      className={buttons.filter}
                    >
                      <span>Ethical Filter</span>
                      <span className={`${toggles.track} ${ethicalFilter ? toggles.trackActive : toggles.trackInactive}`}>
                        <span className={`${toggles.thumb} ${ethicalFilter ? toggles.thumbActive : toggles.thumbInactive}`} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className={layout.communityRow}>
                  <span className={text.communityTitle}>Community pulse</span>
                  {pulsePreview.map((reaction) => (
                    <div key={reaction.label} className={layout.communityPill}>
                      <span>{reaction.emoji}</span>
                      <span className={text.communityLabel}>{reaction.label}</span>
                      <span className={text.communityValue}>{reaction.intensity}%</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <main className={`${layout.mainContainer} ${mainPaddingClass}`}>
        <div className={layout.summaryRow}>
          <div className={`${text.moodChip} ${accent.chip}`}>
            <span>{activeSample.title}</span>
            <span className={text.subtitle}>{activeSample.subtitle}</span>
          </div>
          <p className={text.moodDescription}>
            {selectedMood.emoji} {selectedMood.description}
          </p>
        </div>
        <div className={layout.columns}>
          <section className={layout.primaryColumn}>
            <div className={layout.heroCard}>
              <div className={layout.heroHeader}>
                <div>
                  <h1 className={text.heroTitle}>{activeSample.title}</h1>
                  <p className={text.heroSubtitle}>{activeSample.subtitle}</p>
                </div>
                <div className={layout.flexWrapGap2}>
                  {activeSample.tags.map((tag) => (
                    <span key={tag} className={`${text.tag} ${accent.chip}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={layout.iframeCard}>
              <div className={`${layout.iframeGradient} ${accent.gradient}`} aria-hidden="true" />
              <div className={layout.liveBadge}>
                <span className={`${text.liveDot} ${animations.pulse}`} />
                <span>{ethicalFilter ? "Live stumble" : "Free roam"}</span>
              </div>
              <iframe src={activeSample.url} title={activeSample.title} className={layout.iframe} loading="lazy" />
              <div className={layout.iframeFooter}>
                <span>Ethical filter {ethicalFilter ? "shielding" : "relaxed"}</span>
                <button type="button" onClick={handleShare} className={text.shareButton}>
                  Share stumble
                </button>
                <span>Voice mic {voiceActive ? "ready" : "standby"}</span>
              </div>
            </div>
          </section>
          <aside className={layout.asideColumn}>
            {journalSaved && <div className={layout.savedAlert}>Saved to AI Journal • Auto-tagged under {activeSample.tags[0]}.</div>}
            <div className={layout.cardStandard}>
              <div className={layout.rowBetween}>
                <h2 className={text.sectionTitle}>Intent signal</h2>
                <div className={`${badges.intent} ${accent.surface}`}>
                  {selectedMood.emoji} {selectedMood.label}
                </div>
              </div>
              <p className={text.sectionSubtitle}>{selectedMood.description}</p>
              <div className={lists.signalRow}>
                <span className={icons.dot} />
                <span>AI mood blending with chrono-context.</span>
              </div>
            </div>
            <div className={`${layout.cardStandard} ${summaryVisible ? "" : states.dimmed}`}>
              <div className={layout.rowBetween}>
                <h3 className={text.sectionTitle}>AI TL;DR</h3>
                <span className={text.smallMuted}>{summaryVisible ? "Active" : "Sleeping"}</span>
              </div>
              {summaryVisible ? (
                <p className={text.sectionBody}>{activeSample.summary}</p>
              ) : (
                <p className={text.sectionBodyMuted}>Tap "AI Summary" above to wake the TL;DR engine.</p>
              )}
            </div>
            <div className={`${layout.cardStandard} ${expandVisible ? "" : states.dimmed}`}>
              <div className={layout.rowBetween}>
                <h3 className={text.sectionTitle}>Expand the rabbit hole</h3>
                <span className={text.smallMuted}>{expandVisible ? "Streaming" : "On pause"}</span>
              </div>
              {expandVisible ? (
                <ul className={lists.spacingLarge}>
                  {activeSample.expansions.map((expansion) => (
                    <li key={expansion.id} className={lists.item}>
                      <div className={`${icons.gradientBullet} ${accent.gradient}`} />
                      <div>
                        <p className={text.itemHeading}>{expansion.label}</p>
                        <p className={text.xsMuted}>{expansion.detail}</p>
                        <p className={`mt-1 text-xs font-semibold uppercase tracking-widest ${accent.tag}`}>{expansion.source}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={text.sectionBodyMuted}>Toggle "Expand Scope" to pull in related concepts, debates, and companion media.</p>
              )}
            </div>
            <div className={layout.cardStandard}>
              <h3 className={text.sectionTitle}>Why this pairing?</h3>
              <p className={text.sectionSubtitle}>{activeSample.why}</p>
              <p className={text.sectionCaption}>Ethical filter: {ethicalFilter ? "Active" : "Relaxed"}</p>
            </div>
            <div className={layout.cardStandard}>
              <h3 className={text.sectionTitle}>Community pulse</h3>
              <div className={lists.spacingLarge}>
                {activeSample.communityPulse.map((reaction) => (
                  <div key={reaction.label} className={lists.reactionRow}>
                    <div className={text.reactionInfo}>
                      <span className={text.reactionEmoji}>{reaction.emoji}</span>
                      <span>{reaction.label}</span>
                    </div>
                    <div className={progress.track}>
                      <div className={`${progress.fill} ${accent.gradient} ${getBarWidth(reaction.intensity)}`} />
                    </div>
                    <span className={text.smallMuted}>{reaction.intensity}%</span>
                  </div>
                ))}
              </div>
            </div>
            {voiceActive && (
              <div className={layout.cardStandard}>
                <div className={layout.rowGap3Base}>
                  <div className={icons.voiceIndicator}>
                    <svg className={icons.iconMedium} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3z" />
                      <path d="M19 11v1a7 7 0 0 1-14 0v-1" />
                      <path d="M12 21v-2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={text.sectionTitle}>Voice command</h3>
                    <p className={text.smallMuted}>Say "Stumble me something about space colonies".</p>
                  </div>
                </div>
                <p className={text.sectionBodyNeutralAlt}>AI is tuning to your cadence. We'll surface a dual-persona narrative next.</p>
              </div>
            )}
            {coStumbleVisible && (
              <div className={layout.cardStandard}>
                <h3 className={text.sectionTitle}>Co-stumble lounge</h3>
                <p className={text.sectionBodyNeutral}>Invite a friend—our AI will blend both of your intent graphs in real time.</p>
                <div className={layout.coStumbleLink}>{shareLink}</div>
                <div className={layout.rowGap3}>
                  <button type="button" onClick={handleCopyShare} className={buttons.copy}>
                    Copy invite link
                  </button>
                  {linkCopied && <span className={text.successCaption}>Copied!</span>}
                </div>
              </div>
            )}
            {rewindVisible && (
              <div className={layout.cardStandard}>
                <h3 className={text.sectionTitle}>Rewind my web</h3>
                <p className={text.sectionBodyNeutral}>We remixed a nostalgia loop tailored to this stumble.</p>
                <ul className={layout.rewindList}>
                  {activeSample.rewind.map((memory) => (
                    <li key={memory} className={layout.rewindRow}>
                      <span className={icons.rewindBullet} />
                      <span>{memory}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <div className={layout.whisperWidget}>
        <div className={layout.whisperRow}>
          <div className={`${text.whisperIconText} ${accent.gradient}`}>
            <span>🤖</span>
          </div>
          <div>
            <p className={text.whisperKicker}>AI Whisper</p>
            <p className={text.whisperBody}>{activeSample.whisper}</p>
          </div>
        </div>
        <div className={layout.statusRow}>
          <span className={icons.dot} />
          <span>Serendipity engine breathing.</span>
        </div>
      </div>
    </div>
  );
};

export default Stumb;
