import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Mic, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import StumbleBar from '@/components/StumbleBar';
import { getWebsiteById, getSuggestions, getRandomWebsite, type Website } from '@/data/sampleWebsites';

const Stumble = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentSite, setCurrentSite] = useState<Website | null>(null);
  const [suggestions, setSuggestions] = useState<Website[]>([]);

  useEffect(() => {
    if (id) {
      const site = getWebsiteById(id);
      if (site) {
        setCurrentSite(site);
        setSuggestions(getSuggestions(id, 3));
      }
    }
  }, [id]);

  const handleNewStumble = () => {
    const randomSite = getRandomWebsite();
    navigate(`/stumble/${randomSite.id}`);
  };

  const handleSuggestionClick = (siteId: string) => {
    navigate(`/stumble/${siteId}`);
  };

  if (!currentSite) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Ribbon */}
      <StumbleBar showNewStumble={true} compact={true} />

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Side - iframe */}
        <div className="flex-1 relative">
          <iframe
            src={currentSite.url}
            title={currentSite.title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {/* Right Sidebar */}
        <aside className="w-96 border-l border-border bg-card overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Current Site Info */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-foreground">{currentSite.title}</h2>
                <a
                  href={currentSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-secondary rounded-lg transition-fast"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{currentSite.description}</p>
              <div className="flex flex-wrap gap-2">
                {currentSite.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Deep Dive Options */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                Go Deeper
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 rounded-lg bg-secondary hover:bg-accent text-left transition-fast">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">AI Summary</p>
                      <p className="text-xs text-muted-foreground">Get key insights</p>
                    </div>
                  </div>
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-secondary hover:bg-accent text-left transition-fast">
                  <div className="flex items-center space-x-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Related Topics</p>
                      <p className="text-xs text-muted-foreground">Explore connections</p>
                    </div>
                  </div>
                </button>
                <button className="w-full px-4 py-3 rounded-lg bg-secondary hover:bg-accent text-left transition-fast">
                  <div className="flex items-center space-x-3">
                    <Mic className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Voice Guide</p>
                      <p className="text-xs text-muted-foreground">Listen to narration</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Suggestions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                You Might Also Like
              </h3>
              <div className="space-y-3">
                {suggestions.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => handleSuggestionClick(site.id)}
                    className="w-full p-4 rounded-lg bg-secondary hover:bg-accent text-left transition-fast group"
                  >
                    <h4 className="text-sm font-medium text-foreground mb-1 group-hover:text-primary transition-fast">
                      {site.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{site.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {site.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs bg-background text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Random Stumble Button */}
            <button
              onClick={handleNewStumble}
              className="w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-fast flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Take Me Somewhere Random</span>
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Stumble;
