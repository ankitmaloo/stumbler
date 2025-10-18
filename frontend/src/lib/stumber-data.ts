import type { MoodOption, SampleContent } from './stumber-types';

export const accentStyles = {
  default: {
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-600',
    ring: 'ring-blue-500',
    chip: 'bg-blue-100 text-blue-800',
    highlight: 'bg-blue-500 text-white',
    surface: 'bg-blue-900',
    tag: 'text-blue-400',
  },
  science: {
    gradient: 'bg-gradient-to-r from-cyan-600 to-blue-700',
    ring: 'ring-cyan-500',
    chip: 'bg-cyan-900 text-cyan-200',
    highlight: 'bg-cyan-500 text-white',
    surface: 'bg-cyan-900',
    tag: 'text-cyan-400',
  },
  playful: {
    gradient: 'bg-gradient-to-r from-pink-600 to-yellow-600',
    ring: 'ring-pink-500',
    chip: 'bg-pink-900 text-pink-200',
    highlight: 'bg-pink-500 text-white',
    surface: 'bg-pink-900',
    tag: 'text-pink-400',
  },
  future: {
    gradient: 'bg-gradient-to-r from-green-600 to-teal-700',
    ring: 'ring-green-500',
    chip: 'bg-green-900 text-green-200',
    highlight: 'bg-green-500 text-white',
    surface: 'bg-green-900',
    tag: 'text-green-400',
  },
  ethics: {
    gradient: 'bg-gradient-to-r from-purple-600 to-indigo-700',
    ring: 'ring-purple-500',
    chip: 'bg-purple-900 text-purple-200',
    highlight: 'bg-purple-500 text-white',
    surface: 'bg-purple-900',
    tag: 'text-purple-400',
  },
};

export const moodOptions: MoodOption[] = [
  {
    id: 'learn',
    label: 'I feel like learning',
    description: 'Deep dives, explainers, brain food.',
    emoji: '🧠',
  },
  {
    id: 'laugh',
    label: 'I want to laugh',
    description: 'Playful side quests and delight.',
    emoji: '😂',
  },
  {
    id: 'weird',
    label: 'Show me weird stuff',
    description: 'Glitchy art, fringe forums, oddities.',
    emoji: '🌀',
  },
  {
    id: 'inspire',
    label: 'Inspire me',
    description: 'Visionary ideas and optimism.',
    emoji: '✨',
  },
  {
    id: 'reflect',
    label: 'Prompt reflection',
    description: 'Ethics, philosophy, mindful takes.',
    emoji: '🧘',
  },
];

export const sampleContent: SampleContent[] = [
  {
    id: 'quantum-computing',
    title: 'Quantum Horizons',
    subtitle: 'Threading your AI ethics binge with bleeding-edge physics.',
    url: 'https://en.wikipedia.org/wiki/Quantum_computing',
    category: 'science',
    summary:
      'Quantum computing uses qubits that hold multiple states at once, unlocking exponential problem spaces for simulation, optimization, and cryptography. This piece maps the landscape from hardware race to ethical ripple effects you have been exploring.',
    expansions: [
      {
        id: 'arxiv',
        label: 'arXiv radar',
        detail: 'Top fault-tolerance breakthroughs published this week, translated to a three-minute brief.',
        source: 'arxiv.org',
      },
      {
        id: 'visual',
        label: '5-min visual',
        detail: 'Animations that connect entanglement to cognition so you can explain it in plain language.',
        source: 'YouTube',
      },
      {
        id: 'counter',
        label: "Skeptic's take",
        detail: 'A philosopher deconstructs quantum hype and why progress still needs analog intuition.',
        source: 'Aeon',
      },
    ],
    why: "You saved an article on AI sentience debates last week, so we're pairing it with quantum cognition perspectives.",
    whisper: "78% of futurists who bookmarked this also loved a 2009 blog called 'Entangled Minds'.",
    moods: ['learn', 'inspire', 'reflect'],
    tags: ['Future Tech', 'Mind Blown', 'To Discuss with Alex'],
    communityPulse: [
      { emoji: '🤯', label: 'Mind Blown', intensity: 82 },
      { emoji: '🔥', label: 'On Fire', intensity: 68 },
      { emoji: '💡', label: 'Ideas Sparked', intensity: 74 },
      { emoji: '🤔', label: 'Deep Think', intensity: 56 },
    ],
    rewind: [
      '2021 · Chased astrophotography rabbit holes for 12 nights straight.',
      '2022 · Binged AI alignment manifestos during midnight sessions.',
      '2023 · Replayed \'Interstellar\' soundtrack while reading decoherence threads.',
    ],
    source: 'sample',
  },
  {
    id: 'absurdist-internet',
    title: 'Absurdist Sidequests',
    subtitle: 'Your laughter craving meets indie net-art memetics.',
    url: 'https://en.wikipedia.org/wiki/Surreal_humour',
    category: 'playful',
    summary:
      'Surreal humour reframes expectation with absurd juxtapositions—perfect for unlocking a lighter dopamine hit between your heavier research streaks. Today\'s stumble curates meme ecologies through a cultural lens.',
    expansions: [
      {
        id: 'newsletter',
        label: 'Inbox oddity',
        detail: 'Weekly digest of emerging absurdist creators remixing AI image models.',
        source: 'Substack',
      },
      {
        id: 'thread',
        label: 'Community thread',
        detail: 'High-signal discussion on how surreal memes became collective coping rituals.',
        source: 'Are.na',
      },
      {
        id: 'playlist',
        label: 'Mood playlist',
        detail: 'Lo-fi glitch beats to soundtrack your next co-stumble session.',
        source: 'Spotify',
      },
    ],
    why: 'You nudged the mood slider toward laughter during late-night sessions—serving creative levity to balance analytical focus.',
    whisper: 'Try saying "surprise me harder" next time; 61% of explorers unlocked an interactive ARG.',
    moods: ['laugh', 'weird'],
    tags: ['Play Queue', 'Mood Booster'],
    communityPulse: [
      { emoji: '😂', label: 'Laugh Riot', intensity: 71 },
      { emoji: '🔥', label: 'On Fire', intensity: 52 },
      { emoji: '🤔', label: 'Deep Think', intensity: 28 },
      { emoji: '💡', label: 'Ideas Sparked', intensity: 39 },
    ],
    rewind: [
      '2019 · Fell into vaporwave Tumblr archives.',
      '2020 · Shared 14 surreal memes with your co-founder in one night.',
      '2024 · Experimented with AI-generated comic panels.',
    ],
    source: 'sample',
  },
  {
    id: 'solarpunk-systems',
    title: 'Solarpunk Blueprints',
    subtitle: 'Optimism engines for the futures you keep sketching.',
    url: 'https://en.wikipedia.org/wiki/Solarpunk',
    category: 'future',
    summary:
      'Solarpunk blends renewable tech with equitable community design, aligning with your recent notes on regenerative cities. This curation surfaces systems thinking, visual manifestos, and grounded prototypes.',
    expansions: [
      {
        id: 'case-study',
        label: 'Living lab',
        detail: 'Community microgrid case study with annotated design files.',
        source: 'Medium',
      },
      {
        id: 'toolkit',
        label: 'Design toolkit',
        detail: 'Open-source playbook for co-creating solarpunk public spaces.',
        source: 'GitHub',
      },
      {
        id: 'counter',
        label: 'Critical lens',
        detail: 'Urban planner critiques idealism with pragmatic adoption steps.',
        source: 'CityLab',
      },
    ],
    why: "Morning focus block flagged 'build me hopeful futures', so we're feeding the inspire intent with actionable systems.",
    whisper: '68% of dreamers paired this with a community build in our co-stumble lounge.',
    moods: ['inspire', 'learn'],
    tags: ['Future Tech', 'Inspire Me'],
    communityPulse: [
      { emoji: '💡', label: 'Ideas Sparked', intensity: 81 },
      { emoji: '🔥', label: 'On Fire', intensity: 47 },
      { emoji: '🤔', label: 'Deep Think', intensity: 66 },
      { emoji: '🤝', label: 'Collab Ready', intensity: 58 },
    ],
    rewind: [
      '2018 · Sketched eco-village concepts in your bullet journal.',
      '2020 · Hosted a climate optimism salon.',
      '2023 · Tracked 12 regenerative startups in your AI journal.',
    ],
    source: 'sample',
  },
  {
    id: 'ethical-alignment',
    title: 'Alignment Compass',
    subtitle: 'Mindful tech guardrails for your reflective evenings.',
    url: 'https://en.wikipedia.org/wiki/Technology_ethics',
    category: 'ethics',
    summary:
      'Technology ethics interrogates power, accountability, and human flourishing. This selection distills frameworks that resonate with your reflective intent and recent bookmarks on AI transparency.',
    expansions: [
      {
        id: 'panel',
        label: 'Roundtable audio',
        detail: 'Philosophers and founders debate algorithmic dignity in 22 minutes.',
        source: 'On Deck',
      },
      {
        id: 'paper',
        label: 'Research pulse',
        detail: 'Annotated summary of the top fairness audit paper trending this week.',
        source: 'arxiv.org',
      },
      {
        id: 'practice',
        label: 'Ethics toolkit',
        detail: 'Decision canvas you can drop into your next product sprint.',
        source: 'Notion',
      },
    ],
    why: "You toggled Ethical Filter to 'on' for six consecutive stumbles—rewarding that intent with deeper trust tooling.",
    whisper: '47% of reflective explorers bookmarked this alongside a compassion meditation.',
    moods: ['reflect', 'learn'],
    tags: ['Ethical Lens', 'Team Workshop'],
    communityPulse: [
      { emoji: '🤔', label: 'Deep Think', intensity: 84 },
      { emoji: '💡', label: 'Ideas Sparked', intensity: 63 },
      { emoji: '🔥', label: 'On Fire', intensity: 41 },
      { emoji: '🤝', label: 'Collab Ready', intensity: 52 },
    ],
    rewind: [
      '2017 · Annotated the ACM ethical guidelines.',
      '2021 · Ran a blackout day to examine attention ethics.',
      '2024 · Drafted a trust charter for your product team.',
    ],
    source: 'sample',
  },
];
