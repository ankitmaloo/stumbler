export interface MoodOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
}

export interface Reaction {
  emoji: string;
  label: string;
  intensity: number;
}

export interface Expansion {
  id: string;
  label: string;
  detail: string;
  source: string;
}

export interface SampleContent {
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
  source: 'sample' | 'api';
}

export type AccentStyle = {
  gradient: string;
  ring: string;
  chip: string;
  highlight: string;
  surface: string;
  tag: string;
};
