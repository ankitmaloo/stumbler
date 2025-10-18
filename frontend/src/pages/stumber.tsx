import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Maximize2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import type { MoodOption, SampleContent, AccentStyle } from '../lib/stumber-types';
import { accentStyles, moodOptions, sampleContent } from '../lib/stumber-data';
import { mapCategoryToAccent, getTintedRingClass, getTintedAccentClass } from '../lib/stumber-utils';
import { HeroCard } from '../components/stumber/HeroCard';
import { LivePreview } from '../components/stumber/LivePreview';
import { AISummary } from '../components/stumber/AISummary';
import { CommunityPulse } from '../components/stumber/CommunityPulse';
import { ExpansionList } from '../components/stumber/ExpansionList';
import { ActionButton } from '../components/stumber/ActionButton';
import { AIWhisper } from '../components/stumber/AIWhisper';
import { FocusMode } from '../components/stumber/FocusMode';
import { SavedNotification } from '../components/stumber/SavedNotification';
import { HeaderExpansion } from '../components/stumber/HeaderExpansion';

const Stumber = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const [activeSample, setActiveSample] = useState<SampleContent>(sampleContent[0]);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(true);
  const [expandVisible, setExpandVisible] = useState<boolean>(false);
  const [journalSaved, setJournalSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedUrls, setLikedUrls] = useState<string[]>([]);
  const [headerExpanded, setHeaderExpanded] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);

  const accentKey = mapCategoryToAccent(activeSample.category);
  const accent = useMemo<AccentStyle>(() => accentStyles[accentKey], [accentKey]);
  const isLiked = likedUrls.includes(activeSample.url);

  useEffect(() => {
    if (!journalSaved) return;
    const timer = window.setTimeout(() => setJournalSaved(false), 3200);
    return () => window.clearTimeout(timer);
  }, [journalSaved]);

  useEffect(() => {
    if (focusMode) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
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
      setJournalSaved(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleLike = () => {
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
  };

  const handleDislike = () => {
    setLikedUrls((prev) => prev.filter((url) => url !== activeSample.url));
    handleStumble();
  };

  const handleSaveToJournal = () => {
    setJournalSaved(true);
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
  };

  if (focusMode) {
    return <FocusMode url={activeSample.url} title={activeSample.title} accent={accent} onExit={() => setFocusMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className={`bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 ring-2 ${getTintedRingClass(activeSample.category)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${getTintedAccentClass(activeSample.category)}`}>
                  🔮
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">StumbleUpon 2025</p>
                  <h1 className="text-lg font-semibold text-white">Serendipity Engine</h1>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleStumble}
                  disabled={isLoading}
                  className={`${getTintedAccentClass(activeSample.category)} px-4 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center space-x-2`}
                >
                  <span>{isLoading ? 'Summoning' : 'AI Stumble'}</span>
                </button>

                <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <span>{selectedMood.emoji}</span>
                  <select
                    value={selectedMood.id}
                    onChange={handleMoodChange}
                    className="bg-transparent text-sm font-medium text-gray-200 focus:outline-none cursor-pointer"
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
                  className="px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setHeaderExpanded(!headerExpanded)}
                  className="px-4 py-2 rounded-lg font-medium text-gray-200 bg-gray-700 hover:bg-gray-600"
                >
                  {headerExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {headerExpanded && <HeaderExpansion voiceActive={voiceActive} onVoiceToggle={setVoiceActive} />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HeroCard content={activeSample} />
            <LivePreview url={activeSample.url} title={activeSample.title} />
          </div>

          <aside className="space-y-6">
            {journalSaved && <SavedNotification tag={activeSample.tags[0]} />}
            <AISummary summary={activeSample.summary} visible={summaryVisible} category={activeSample.category} />
            <ExpansionList expansions={activeSample.expansions} category={activeSample.category} accent={accent} />
            <CommunityPulse reactions={activeSample.communityPulse} category={activeSample.category} />

            <div className="flex flex-wrap gap-2">
              <ActionButton
                icon={ThumbsUp}
                label={isLiked ? 'Liked' : 'Like'}
                isActive={isLiked}
                onClick={handleLike}
              />
              <ActionButton
                icon={ThumbsDown}
                label="Skip"
                onClick={handleDislike}
              />
              <ActionButton
                label={journalSaved ? 'Saved' : 'Save'}
                isActive={journalSaved}
                onClick={handleSaveToJournal}
              />
            </div>
          </aside>
        </div>
      </main>

      <AIWhisper whisper={activeSample.whisper} category={activeSample.category} />
    </div>
  );
};

export default Stumber;
