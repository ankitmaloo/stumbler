import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import {
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import type { MoodOption, SampleContent, AccentStyle } from '../lib/stumber-types';
import { accentStyles, moodOptions, sampleContent } from '../lib/stumber-data';
import { mapCategoryToAccent } from '../lib/stumber-utils';
import { HeroCard } from '../components/stumber/HeroCard';
import { LivePreview } from '../components/stumber/LivePreview';
import { AISummary } from '../components/stumber/AISummary';
import { CommunityPulse } from '../components/stumber/CommunityPulse';
import { ExpansionList } from '../components/stumber/ExpansionList';
import { ActionButton } from '../components/stumber/ActionButton';
import { AIWhisper } from '../components/stumber/AIWhisper';
import { FocusMode } from '../components/stumber/FocusMode';
import { SavedNotification } from '../components/stumber/SavedNotification';
import StumbleBar from '../components/StumbleBar';
import { getWebsiteById, getSuggestions, getRandomWebsite, sampleWebsites, type Website } from '../data/sampleWebsites';
import { textStream } from '@/lib/api';

// Convert Website to SampleContent format
const websiteToSampleContent = (website: Website): SampleContent => {
  return {
    id: website.id,
    title: website.title,
    subtitle: website.description,
    url: website.url,
    category: website.category,
    summary: website.description,
    expansions: [
      {
        id: 'related-1',
        label: 'Related Topics',
        detail: 'Explore similar content and connections',
        source: 'AI Generated'
      },
      {
        id: 'visual-1',
        label: 'Visual Summary',
        detail: 'Key concepts in visual format',
        source: 'AI Generated'
      },
      {
        id: 'counter-1',
        label: 'Alternative Views',
        detail: 'Different perspectives on this topic',
        source: 'Community'
      }
    ],
    why: 'This matches your current exploration interests and mood selection.',
    whisper: 'Tip: Click the expand button to see related topics and dive deeper!',
    moods: ['learn', 'inspire'],
    tags: website.tags,
    communityPulse: [
      { emoji: '🤯', label: 'Mind Blown', intensity: Math.floor(Math.random() * 40) + 60 },
      { emoji: '🔥', label: 'On Fire', intensity: Math.floor(Math.random() * 40) + 50 },
      { emoji: '💡', label: 'Ideas Sparked', intensity: Math.floor(Math.random() * 40) + 55 },
      { emoji: '🤔', label: 'Deep Think', intensity: Math.floor(Math.random() * 40) + 45 }
    ],
    rewind: [],
    source: 'api' as const
  };
};

const Stumber = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<MoodOption>(moodOptions[0]);
  const [activeSample, setActiveSample] = useState<SampleContent | null>(null);
  const [suggestions, setSuggestions] = useState<Website[]>([]);
  const [summaryVisible, setSummaryVisible] = useState<boolean>(true);
  const [expandVisible, setExpandVisible] = useState<boolean>(false);
  const [journalSaved, setJournalSaved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedUrls, setLikedUrls] = useState<string[]>([]);
  const [headerExpanded, setHeaderExpanded] = useState<boolean>(false);
  const [voiceActive, setVoiceActive] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [headlines, setHeadlines] = useState<Array<{ title: string; url?: string; source?: string }>>([]);
  const [headlinesLoading, setHeadlinesLoading] = useState<boolean>(false);

  // Load website from URL params
  useEffect(() => {
    if (id) {
      const website = getWebsiteById(id);
      if (website) {
        setActiveSample(websiteToSampleContent(website));
        setSuggestions(getSuggestions(id, 3));
      }
    } else {
      // If no ID, load a random one
      const randomSite = getRandomWebsite();
      navigate(`/stumber/${randomSite.id}`, { replace: true });
    }
  }, [id, navigate]);

  const accentKey = activeSample ? mapCategoryToAccent(activeSample.category) : 'default';
  const accent = useMemo<AccentStyle>(() => accentStyles[accentKey], [accentKey]);
  const isLiked = activeSample ? likedUrls.includes(activeSample.url) : false;

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

  // Stream headlines for the active page
  useEffect(() => {
    if (!activeSample) return;
    let cancelled = false;
    setHeadlines([]);
    setHeadlinesLoading(true);

    const prompt = `Return concise web headlines about: ${activeSample.title} (${activeSample.url}).
Output ONLY newline-delimited JSON (NDJSON), one object per line with keys: "title" (string), "url" (string, optional), "source" (string, optional).
Generate 6 items maximum. No prose, no prefix/suffix.`;

    (async () => {
      try {
        let buffer = '';
        await textStream(prompt, (chunk) => {
          if (cancelled) return;
          buffer += chunk;
          const parts = buffer.split('\n');
          buffer = parts.pop() || '';
          for (const line of parts) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const obj = JSON.parse(trimmed);
              if (!obj || !obj.title) continue;
              setHeadlines((prev) => {
                if (prev.find((h) => h.title === obj.title)) return prev;
                const next = [...prev, { title: obj.title, url: obj.url, source: obj.source }];
                return next.slice(0, 8);
              });
            } catch {
              // Ignore malformed lines
            }
          }
        });
      } finally {
        if (!cancelled) setHeadlinesLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeSample?.id]);

  const handleMoodChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextMood = moodOptions.find((option) => option.id === event.target.value) ?? moodOptions[0];
    setSelectedMood(nextMood);
  };

  const handleStumble = () => {
    const randomSite = getRandomWebsite();
    navigate(`/stumber/${randomSite.id}`);
  };

  const handleSuggestionClick = (siteId: string) => {
    navigate(`/stumber/${siteId}`);
  };

  const handleLike = () => {
    if (!activeSample) return;
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
  };

  const handleDislike = () => {
    if (!activeSample) return;
    setLikedUrls((prev) => prev.filter((url) => url !== activeSample.url));
    handleStumble();
  };

  const handleSaveToJournal = () => {
    if (!activeSample) return;
    setJournalSaved(true);
    setLikedUrls((prev) => (prev.includes(activeSample.url) ? prev : [...prev, activeSample.url]));
  };

  if (!activeSample) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (focusMode) {
    return <FocusMode url={activeSample.url} title={activeSample.title} accent={accent} onExit={() => setFocusMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StumbleBar showNewStumble={true} compact={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <HeroCard content={activeSample} />
            <LivePreview url={activeSample.url} title={activeSample.title} />

            {/* Headlines Section */}
            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Headlines</h3>
              {headlinesLoading && headlines.length === 0 ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-700 rounded w-2/3" />
                  <div className="h-4 bg-gray-700 rounded w-4/5" />
                </div>
              ) : (
                <ul className="space-y-2">
                  {headlines.map((h, idx) => (
                    <li key={idx} className="text-sm text-gray-200">
                      {h.url ? (
                        <a href={h.url} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-fast">{h.title}</a>
                      ) : (
                        <span>{h.title}</span>
                      )}
                      {h.source && <span className="text-xs text-gray-400 ml-2">({h.source})</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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

            {/* Suggestions Section */}
            {suggestions.length > 0 && (
              <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">You Might Also Like</h3>
                <div className="space-y-3">
                  {suggestions.map((site) => (
                    <button
                      key={site.id}
                      onClick={() => handleSuggestionClick(site.id)}
                      className="w-full p-4 rounded-lg bg-gray-700 hover:bg-gray-600 text-left transition-all group"
                    >
                      <h4 className="text-sm font-medium text-white mb-1 group-hover:text-blue-400 transition-fast">
                        {site.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">{site.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {site.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <AIWhisper whisper={activeSample.whisper} category={activeSample.category} />
    </div>
  );
};

export default Stumber;
