import React from 'react';
import { ChevronDown, ChevronUp, Maximize2 } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { CommunityPulse } from './CommunityPulse';
import { ThemeToggle } from '../theme-toggle';

interface MoodOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
  gradient: string;
  glow: string;
}

interface Reaction {
  emoji: string;
  label: string;
  intensity: number;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
}

interface StumberHeaderProps {
  selectedMood: MoodOption;
  moodOptions: MoodOption[];
  categoryTheme: 'primary' | 'secondary' | 'tertiary' | 'accent';
  isLoading: boolean;
  onStumble: () => void;
  onMoodChange: (moodId: string) => void;
  onFocusMode: () => void;
  onToggleExpand: () => void;
  headerExpanded: boolean;
  communityPulse: Reaction[];
  onHeaderControlsChange?: {
    voiceActive?: boolean;
    summaryVisible?: boolean;
    expandVisible?: boolean;
    journalSaved?: boolean;
  };
  onVoiceToggle?: () => void;
  onSummaryToggle?: () => void;
  onExpandToggle?: () => void;
  onJournalSave?: () => void;
}

export const StumberHeader: React.FC<StumberHeaderProps> = ({
  selectedMood,
  moodOptions,
  categoryTheme,
  isLoading,
  onStumble,
  onMoodChange,
  onFocusMode,
  onToggleExpand,
  headerExpanded,
  communityPulse,
  onHeaderControlsChange = {},
  onVoiceToggle,
  onSummaryToggle,
  onExpandToggle,
  onJournalSave,
}) => {
  return (
    <header className="glass border-0 sticky top-0 z-50 transition-medium">
      <div className="container mx-auto px-4">
        <div className={`glass p-6 rounded-2xl ${
          categoryTheme === 'primary'
            ? 'glow-primary'
            : categoryTheme === 'secondary'
            ? 'glow-secondary'
            : categoryTheme === 'tertiary'
            ? 'glow-tertiary'
            : 'glow-accent'
        }`}>
          {/* Main Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 gradient-${categoryTheme} rounded-xl flex items-center justify-center text-white font-bold text-lg glass-reverse`}>
                🔮
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">StumbleUpon 2025</p>
                <h1 className="text-2xl font-bold text-foreground">Serendipity Engine</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Stumble Button */}
              <ActionButton
                onClick={onStumble}
                disabled={isLoading}
                loading={isLoading}
                variant={categoryTheme}
                size="lg"
                className={`gradient-${selectedMood.gradient.replace('gradient-', '')} text-white`}
              >
                <span>{isLoading ? 'Summoning' : 'AI Stumble'}</span>
              </ActionButton>

              {/* Mood Selector */}
              <div className="glass px-4 py-3 rounded-xl flex items-center space-x-2">
                <span className="text-lg">{selectedMood.emoji}</span>
                <label className="sr-only" htmlFor="mood-selector">
                  Mood selector
                </label>
                <select
                  id="mood-selector"
                  value={selectedMood.id}
                  onChange={(e) => onMoodChange(e.target.value)}
                  className="bg-transparent text-foreground text-sm font-medium focus:outline-none cursor-pointer"
                >
                  {moodOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Focus Mode Button */}
              <ActionButton onClick={onFocusMode} variant="secondary" size="md">
                <Maximize2 className="w-4 h-4" />
              </ActionButton>

              {/* Expand Toggle Button */}
              <ActionButton onClick={onToggleExpand} variant="secondary" size="md">
                {headerExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </ActionButton>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>

          {/* Expanded Controls */}
          {headerExpanded && (
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                {/* Extended controls would go here */}
              </div>

              {/* Community Pulse Preview */}
              {communityPulse.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-muted-foreground">Community pulse:</span>
                  <CommunityPulse reactions={communityPulse} compact />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
