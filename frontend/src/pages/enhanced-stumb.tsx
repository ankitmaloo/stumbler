import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Maximize2, 
  Minimize2, 
  ThumbsDown, 
  ThumbsUp,
  Palette,
  Sparkles,
  Zap,
  Brain,
  Heart,
  Eye,
  Layers,
  Radio,
  Compass,
  Filter
} from "lucide-react";

type MoodOption = {
  id: string;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
  glow: string;
};

type Reaction = {
  emoji: string;
  label: string;
  intensity: number;
  color: string;
};

type Expansion = {
  id: string;
  label: string;
  detail: string;
  source: string;
  icon: string;
};

type SampleContent = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  categoryTheme: 'primary' | 'secondary' | 'tertiary' | 'accent';
  summary: string;
  expansions: Expansion[];
  why: string;
  whisper: string;
  moods: string[];
  tags: string[];
  communityPulse: Reaction[];
  rewind: string[];
  source: "sample" | "api";
  website?: any;
};

const moodOptions: MoodOption[] = [
  {
    id: "learn",
    label: "I feel like learning",
    description: "Deep dives, explainers, brain food.",
    emoji: "🧠",
    gradient: "gradient-primary",
    glow: "glow-primary"
  },
  {
    id: "laugh",
    label: "I want to laugh",
    description: "Playful side quests and delight.",
    emoji: "😂",
    gradient: "gradient-accent",
    glow: "glow-accent"
  },
  {
    id: "weird",
    label: "Show me weird stuff",
    description: "Glitchy art, fringe forums, oddities.",
    emoji: "🌀",
    gradient: "gradient-rainbow",
    glow: "glow-accent"
  },
  {
    id: "inspire",
    label: "Inspire me",
    description: "Visionary ideas and optimism.",
    emoji: "✨",
    gradient: "gradient-tertiary",
    glow: "glow-tertiary"
  },
  {
    id: "reflect",
    label: "Prompt reflection",
    description: "Ethics, philosophy, mindful takes.",
    emoji: "🧘",
    gradient: "gradient-secondary",
    glow: "glow-secondary"
  },
];

const sampleContent: SampleContent[] = [
  {
    id: "quantum-computing",
    title: "Quantum Horizons",
    subtitle: "Threading your AI ethics binge with bleeding-edge physics.",
    url: "https://en.wikipedia.org/wiki/Quantum_computing",
    category: "science",
    categoryTheme: "primary",
    summary:
      "Quantum computing uses qubits that hold multiple states at once, unlocking exponential problem spaces for simulation, optimization, and cryptography. This piece maps the landscape from hardware race to ethical ripple effects you have been exploring.",
    expansions: [
      {
        id: "arxiv",
        label: "arXiv radar",
        detail: "Top fault-tolerance breakthroughs published this week, translated to a three-minute brief.",
        source: "arxiv.org",
        icon: "📊"
      },
      {
        id: "visual",
        label: "5-min visual",
        detail: "Animations that connect entanglement to cognition so you can explain it in plain language.",
        source: "YouTube",
        icon: "🎬"
      },
      {
        id: "counter",
        label: "Skeptic's take",
        detail: "A philosopher deconstructs quantum hype and why progress still needs analog intuition.",
        source: "Aeon",
        icon: "🤔"
      },
    ],
    why: "You saved an article on AI sentience debates last week, so we're pairing it with quantum cognition perspectives.",
    whisper: "78% of futurists who bookmarked this also loved a 2009 blog called 'Entangled Minds'.",
    moods: ["learn", "inspire", "reflect"],
    tags: ["Future Tech", "Mind Blown", "To Discuss with Alex"],
    communityPulse: [
      { emoji: "🤯", label: "Mind Blown", intensity: 82, color: "glow-primary" },
      { emoji: "🔥", label: "On Fire", intensity: 68, color: "glow-accent" },
      { emoji: "💡", label: "Ideas Sparked", intensity: 74, color: "glow-secondary" },
      { emoji: "🤔", label: "Deep Think", intensity: 56, color: "glow-tertiary" },
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
    categoryTheme: "accent",
    summary:
      "Surreal humour reframes expectation with absurd juxtapositions—perfect for unlocking a lighter dopamine hit between your heavier research streaks. Today's stumble curates meme ecologies through a cultural lens.",
    expansions: [
      {
        id: "newsletter",
        label: "Inbox oddity",
        detail: "Weekly digest of emerging absurdist creators remixing AI image models.",
        source: "Substack",
        icon: "📧"
      },
      {
        id: "thread",
        label: "Community thread",
        detail: "High-signal discussion on how surreal memes became collective coping rituals.",
        source: "Are.na",
        icon: "🧵"
      },
      {
        id: "playlist",
        label: "Mood playlist",
        detail: "Lo-fi glitch beats to soundtrack your next co-stumble session.",
        source: "Spotify",
        icon: "🎵"
      },
    ],
    why: "You nudged the mood slider toward laughter during late-night sessions—serving creative levity to balance analytical focus.",
    whisper: "Try saying \"surprise me harder\" next time; 61% of explorers unlocked an interactive ARG.",
    moods: ["laugh", "weird"],
    tags: ["Play Queue", "Mood Booster"],
    communityPulse: [
      { emoji: "😂", label: "Laugh Riot", intensity: 71, color: "glow-accent" },
      { emoji: "🔥", label: "On Fire", intensity: 52, color: "glow-accent" },
      { emoji: "🤔", label: "Deep Think", intensity: 28, color: "glow-tertiary" },
      { emoji: "💡", label: "Ideas Sparked", intensity: 39, color: "glow-secondary" },
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
    categoryTheme: "tertiary",
    summary:
      "Solarpunk blends renewable tech with equitable community design, aligning with your recent notes on regenerative cities. This curation surfaces systems thinking, visual manifestos, and grounded prototypes.",
    expansions: [
      {
        id: "case-study",
        label: "Living lab",
        detail: "Community microgrid case study with annotated design files.",
        source: "Medium",
        icon: "🏗️"
      },
      {
        id: "toolkit",
        label: "Design toolkit",
        detail: "Open-source playbook for co-creating solarpunk public spaces.",
        source: "GitHub",
        icon: "🛠️"
      },
      {
        id: "counter",
        label: "Critical lens",
        detail: "Urban planner critiques idealism with pragmatic adoption steps.",
        source: "CityLab",
        icon: "👓"
      },
    ],
    why: "Morning focus block flagged 'build me hopeful futures', so we're feeding the inspire intent with actionable systems.",
    whisper: "68% of dreamers paired this with a community build in our co-stumble lounge.",
    moods: ["inspire", "learn"],
    tags: ["Future Tech", "Inspire Me"],
    communityPulse: [
      { emoji: "💡", label: "Ideas Sparked", intensity: 81, color: "glow-secondary" },
      { emoji: "🔥", label: "On Fire", intensity: 47, color: "glow-accent" },
      { emoji: "🤔", label: "Deep Think", intensity: 66, color: "glow-tertiary" },
      { emoji: "🤝", label: "Collab Ready", intensity: 58, color: "glow-primary" },
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
    categoryTheme: "secondary",
    summary:
      "Technology ethics interrogates power, accountability, and human flourishing. This selection distills frameworks that resonate with your reflective intent and recent bookmarks on AI transparency.",
    expansions: [
      {
        id: "panel",
        label: "Roundtable audio",
        detail: "Philosophers and founders debate algorithmic dignity in 22 minutes.",
        source: "On Deck",
        icon: "🎙️"
      },
      {
        id: "paper",
        label: "Research pulse",
        detail: "Annotated summary of the top fairness audit paper trending this week.",
        source: "arxiv.org",
        icon: "📄"
      },
      {
        id: "practice",
        label: "Ethics toolkit",
        detail: "Decision canvas you can drop into your next product sprint.",
        source: "Notion",
        icon: "🧰"
      },
    ],
    why: "You toggled Ethical Filter to 'on' for six consecutive stumbles—rewarding that intent with deeper trust tooling.",
    whisper: "47% of reflective explorers bookmarked this alongside a compassion meditation.",
    moods: ["reflect", "learn"],
    tags: ["Ethical Lens", "Team Workshop"],
    communityPulse: [
      { emoji: "🤔", label: "Deep Think", intensity: 84, color: "glow-tertiary" },
      { emoji: "💡", label: "Ideas Sparked", intensity: 63, color: "glow-secondary" },
      { emoji: "🔥", label: "On Fire", intensity: 41, color: "glow-accent" },
      { emoji: "🤝", label: "Collab Ready", intensity: 52, color: "glow-primary" },
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
  if (value >= 90) return "w-full";
  if (value >= 70) return "w-5/6";
  if (value >= 60) return "w-4/5";
  if (value >= 50) return "w-3/4";
  if (value >= 40) return "w-2/3";
  if (value >= 30) return "w-1/2";
  if (value >= 20) return "w-2/5";
  return "w-1/3";
};

const EnhancedStumb = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const [activeSample, setActiveSample] = useState<SampleContent>(sampleContent[0]);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(true);
  const [expandVisible, setExpandVisible] = useState<boolean>(false);
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

  const categoryTheme = activeSample.categoryTheme;
  const shareLink = activeSample.url;
  const isLiked = likedUrls.includes(activeSample.url);

  useEffect(() => {
    if (!journalSaved) return;
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
        if (pool.length === 0) return previous ?? sampleContent[0];
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
    if (!shareLink) return;
    setLinkCopied(true);
    if (typeof navigator !== "undefined" && navigator.clipboard && "writeText" in navigator.clipboard) {
      void navigator.clipboard.writeText(shareLink).catch(() => undefined);
    }
  };

  const pulsePreview = activeSample.communityPulse.slice(0, 3);

  if (focusMode) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 relative">
          <iframe src={activeSample.url} title={activeSample.title} className="w-full h-full border-0" loading="lazy" />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <button
              type="button"
              onClick={() => setFocusMode(false)}
              className={`gradient-${categoryTheme} text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-fast hover:scale-105 glass-reverse`}
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit focus</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen gradient-rainbow relative`}>
      {/* Animated background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Glassmorphic overlay */}
      <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`glass border-0 sticky top-0 z-50 transition-medium ${headerExpanded ? 'py-6' : 'py-4'}`}>
          <div className="container mx-auto px-4">
            <div className={`glass p-6 rounded-2xl ${categoryTheme === 'primary' ? 'glow-primary' : categoryTheme === 'secondary' ? 'glow-secondary' : categoryTheme === 'tertiary' ? 'glow-tertiary' : 'glow-accent'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 gradient-${categoryTheme} rounded-xl flex items-center justify-center text-white font-bold text-lg glass-reverse`}>
                    🔮
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">StumbleUpon 2025</p>
                    <h1 className="text-2xl font-bold text-gradient-rainbow">Serendipity Engine</h1>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleStumble}
                    disabled={isLoading}
                    className={`gradient-${selectedMood.gradient.replace('gradient-', '')} text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-fast hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed glass-reverse`}
                  >
                    <div className={`w-5 h-5 border-2 border-white border-t-transparent rounded-full ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="font-medium">{isLoading ? "Summoning" : "AI Stumble"}</span>
                  </button>
                  
                  <div className={`glass px-4 py-3 rounded-xl flex items-center space-x-2`}>
                    <span className="text-lg">{selectedMood.emoji}</span>
                    <label className="sr-only" htmlFor="mood-selector">Mood selector</label>
                    <select
                      id="mood-selector"
                      value={selectedMood.id}
                      onChange={handleMoodChange}
                      className="bg-transparent text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
                    >
                      {moodOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setFocusMode(true)}
                    disabled={!activeSample.url}
                    className="glass px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 transition-fast"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setHeaderExpanded(!headerExpanded)}
                    className="glass px-4 py-3 rounded-xl text-gray-700 hover:bg-white/10 transition-fast"
                  >
                    {headerExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Header Controls */}
              {headerExpanded && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setVoiceActive(!voiceActive)}
                      className={`glass px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast ${voiceActive ? 'bg-blue-500/20' : 'hover:bg-white/10'}`}
                    >
                      <Radio className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">{voiceActive ? "Listening" : "Voice Stumble"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSummaryVisible(!summaryVisible)}
                      className={`glass px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast ${summaryVisible ? 'bg-green-500/20' : 'hover:bg-white/10'}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">AI Summary {summaryVisible ? "On" : "Off"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setExpandVisible(!expandVisible)}
                      className={`glass px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast ${expandVisible ? 'bg-purple-500/20' : 'hover:bg-white/10'}`}
                    >
                      <Layers className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">Expand {expandVisible ? "On" : "Off"}</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleSaveToJournal}
                      className={`glass px-4 py-2 rounded-lg flex items-center space-x-2 transition-fast ${journalSaved ? 'bg-green-500/20' : 'hover:bg-white/10'}`}
                    >
                      <Heart className={`w-4 h-4 ${journalSaved ? 'text-green-600' : 'text-gray-600'}`} />
                      <span className="text-sm font-medium text-gray-700">{journalSaved ? "Saved" : "AI Journal"}</span>
                    </button>
                  </div>
                  
                  {/* Community Pulse Preview */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Community pulse:</span>
                    {pulsePreview.map((reaction) => (
                      <div key={reaction.label} className="glass px-3 py-1 rounded-full flex items-center space-x-1">
                        <span>{reaction.emoji}</span>
                        <span className="text-xs text-gray-600">{reaction.label}</span>
                        <span className="text-xs font-medium text-gray-700">{reaction.intensity}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Mood Indicator */}
          <div className="mb-8 text-center">
            <div className={`inline-flex ${selectedMood.gradient} text-white px-6 py-3 rounded-2xl transition-fast hover:scale-105`}>
              <span className="text-2xl mr-3">{selectedMood.emoji}</span>
              <div className="text-left">
                <p className="font-bold">{selectedMood.label}</p>
                <p className="text-sm opacity-90">{selectedMood.description}</p>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Card */}
              <div className="glass p-8 rounded-3xl transition-fast hover:scale-[1.02]">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-gradient-rainbow">{activeSample.title}</h1>
                    <div className={`w-16 h-16 gradient-${categoryTheme} rounded-2xl flex items-center justify-center text-white text-2xl glass-reverse`}>
                      {categoryTheme === 'primary' ? '🧬' : categoryTheme === 'secondary' ? '🔮' : categoryTheme === 'tertiary' ? '🌿' : '✨'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{activeSample.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeSample.tags.map((tag) => (
                      <span key={tag} className={`theme-${categoryTheme}-card px-3 py-1 rounded-full text-sm font-medium theme-${categoryTheme}-card-text transition-fast hover:scale-105`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Viewer */}
              <div className="glass p-6 rounded-3xl overflow-hidden transition-fast hover:scale-[1.02]">
                <div className={`absolute inset-0 gradient-${categoryTheme} opacity-5 pointer-events-none`} />
                <div className="relative mb-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-3 h-3 bg-green-500 rounded-full animate-pulse`} />
                    <span className="text-sm text-gray-600">{ethicalFilter ? "Live stumble" : "Free roam"}</span>
                    <div className={`ml-auto flex items-center space-x-2 px-3 py-1 rounded-full ${ethicalFilter ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                      <Filter className="w-3 h-3 text-gray-600" />
                      <span className="text-xs text-gray-600">Ethical {ethicalFilter ? "shielding" : "relaxed"}</span>
                    </div>
                  </div>
                  <iframe src={activeSample.url} title={activeSample.title} className="w-full h-96 rounded-2xl bg-white" loading="lazy" />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Voice mic {voiceActive ? "ready" : "standby"}</span>
                  <button type="button" onClick={handleCopyShare} className="text-blue-600 hover:text-blue-800 font-medium">
                    {linkCopied ? "Copied!" : "Share stumble"}
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Journal Save Alert */}
              {journalSaved && (
                <div className="glass border border-green-500/30 bg-green-500/10 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="text-green-700">Saved to AI Journal • Auto-tagged under {activeSample.tags[0]}</span>
                  </div>
                </div>
              )}

              {/* Intent Signal */}
              <div className="glass p-6 rounded-2xl transition-fast hover:scale-[1.02]">
                <h3 className="font-bold text-gradient-rainbow mb-3">Intent Signal</h3>
                <div className={`theme-${categoryTheme}-card px-4 py-3 rounded-xl mb-3`}>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{selectedMood.emoji}</span>
                    <span className={`theme-${categoryTheme}-text font-medium`}>{selectedMood.label}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{selectedMood.description}</p>
              </div>

              {/* AI Summary */}
              <div className={`glass p-6 rounded-2xl transition-fast hover:scale-[1.02] ${!summaryVisible ? 'opacity-50' : ''}`}>
                <h3 className="font-bold text-gradient-rainbow mb-3">AI TL;DR</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {summaryVisible ? activeSample.summary : "Tap 'AI Summary' above to wake the TL;DR engine."}
                </p>
              </div>

              {/* Expand Content */}
              <div className={`glass p-6 rounded-2xl transition-fast hover:scale-[1.02] ${!expandVisible ? 'opacity-50' : ''}`}>
                <h3 className="font-bold text-gradient-rainbow mb-3">Expand the Rabbit Hole</h3>
                {expandVisible ? (
                  <div className="space-y-4">
                    {activeSample.expansions.map((expansion) => (
                      <div key={expansion.id} className="flex items-start space-x-3 group">
                        <div className={`w-8 h-8 gradient-${categoryTheme} rounded-lg flex items-center justify-center text-sm font-bold text-white glass-reverse flex-shrink-0 group-hover:scale-110 transition-fast`}>
                          {expansion.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-1">{expansion.label}</p>
                          <p className="text-xs text-gray-600 mb-1">{expansion.detail}</p>
                          <p className={`text-xs font-semibold uppercase tracking-wider theme-${categoryTheme}-accent`}>{expansion.source}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Toggle "Expand" to pull in related concepts, debates, and companion media.</p>
                )}
              </div>

              {/* Community Pulse */}
              <div className="glass p-6 rounded-2xl transition-fast hover:scale-[1.02]">
                <h3 className="font-bold text-gradient-rainbow mb-4">Community Pulse</h3>
                <div className="space-y-3">
                  {activeSample.communityPulse.map((reaction) => (
                    <div key={reaction.label} className="flex items-center space-x-3">
                      <span className="text-lg">{reaction.emoji}</span>
                      <span className="flex-1 text-sm text-gray-700">{reaction.label}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3 overflow-hidden">
                        <div className={`h-full gradient-${categoryTheme} transition-all duration-500 ${getBarWidth(reaction.intensity)}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-10 text-right">{reaction.intensity}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why This */}
              <div className="glass p-6 rounded-2xl transition-fast hover:scale-[1.02]">
                <h3 className="font-bold text-gradient-rainbow mb-3">Why This Pairing?</h3>
                <p className="text-gray-600 text-sm mb-2">{activeSample.why}</p>
                <p className="text-xs text-gray-500">Ethical filter: {ethicalFilter ? "Active" : "Relaxed"}</p>
              </div>

              {/* Voice Commands */}
              {voiceActive && (
                <div className={`glass p-6 rounded-2xl transition-fast hover:scale-[1.02] glow-${categoryTheme}`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 gradient-${categoryTheme} rounded-full flex items-center justify-center text-white glass-reverse animate-pulse`}>
                      <Radio className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Voice Command</h3>
                      <p className="text-sm text-white/80">Say "Stumble me something about space colonies"</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90">AI is tuning to your cadence. We'll surface a dual-persona narrative next.</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleLike}
                  disabled={isLoading}
                  className={`flex-1 ${isLiked ? `gradient-${categoryTheme}` : 'glass'} px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-fast hover:scale-105 disabled:opacity-50`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-white' : `theme-${categoryTheme}-card-text`}`} />
                  <span className={`font-medium ${isLiked ? 'text-white' : `theme-${categoryTheme}-card-text`}`}>{isLiked ? "Liked" : "Like"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDislike}
                  disabled={isLoading}
                  className="flex-1 glass px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-fast hover:scale-105 disabled:opacity-50"
                >
                  <ThumbsDown className={`w-4 h-4 ${`theme-${categoryTheme}-card-text`}`} />
                  <span className={`font-medium ${`theme-${categoryTheme}-card-text`}`}>Skip</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* AI Whisper Widget */}
        <div className={`fixed bottom-8 left-8 right-8 glass p-6 rounded-2xl ${categoryTheme === 'primary' ? 'glow-primary' : categoryTheme === 'secondary' ? 'glow-secondary' : categoryTheme === 'tertiary' ? 'glow-tertiary' : 'glow-accent'} max-w-2xl mx-auto transition-fast hover:scale-[1.02]`}>
          <div className="flex items-start space-x-4">
            <div className={`w-10 h-10 gradient-${categoryTheme} rounded-full flex items-center justify-center text-white font-bold glass-reverse flex-shrink-0`}>
              🤖
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">AI Whisper</p>
              <p className="text-gray-700 text-sm leading-relaxed">{activeSample.whisper}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <div className={`w-2 h-2 bg-green-500 rounded-full animate-pulse`} />
            <span className="text-xs text-gray-600">Serendipity engine breathing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedStumb;
