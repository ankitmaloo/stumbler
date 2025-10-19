import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, ImageIcon, Sparkles, RefreshCw } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { getRandomWebsite } from '@/data/sampleWebsites';

interface StumbleBarProps {
  showNewStumble?: boolean;
  compact?: boolean;
}

const StumbleBar = ({ showNewStumble = false, compact = false }: StumbleBarProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to rabbit page when search has text
      navigate('/rabbit', { state: { query: searchQuery } });
      setSearchQuery('');
    }
  };

  const handleNewStumble = () => {
    const randomSite = getRandomWebsite();
    navigate(`/stumber/${randomSite.id}`);
  };

  return (
    <header className="w-full border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 hover:opacity-80 transition-fast"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg">🔮</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wide">Stumbler</span>
              <span className="text-sm font-semibold text-foreground">Serendipity Engine</span>
            </div>
          </button>

          {/* Search - always show in compact mode */}
          {compact && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Stumble to..."
                    className="pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-fast"
                    style={{ backgroundColor: 'var(--input-bg)' }}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <button type="button" className="p-2 rounded-lg hover:bg-secondary transition-fast" title="Voice search">
                    <Mic className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-secondary transition-fast" title="Image search">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button type="button" className="p-2 rounded-lg hover:bg-secondary transition-fast" title="AI stumble">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          {showNewStumble && (
            <button
              onClick={handleNewStumble}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-fast flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">New Stumble</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default StumbleBar;
