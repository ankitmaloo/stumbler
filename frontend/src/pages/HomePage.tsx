import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, Image as ImageIcon, Sparkles } from 'lucide-react';
import StumbleBar from '@/components/StumbleBar';
import { getRandomWebsite } from '@/data/sampleWebsites';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to rabbit page when there is search text
      navigate('/rabbit', { state: { query: searchQuery } });
    }
  };

  const handleFeelingLucky = () => {
    const randomSite = getRandomWebsite();
    navigate(`/stumber/${randomSite.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Ribbon */}
      <StumbleBar />

      {/* Main Content - Centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Logo / Brand */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-2 text-foreground">
            Stumbler
          </h1>
          <p className="text-lg text-muted-foreground">Discover the unexpected web</p>
        </div>

        {/* Search Box */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearch}>
            <div 
              className={`rounded-full border transition-all duration-300 ${
                isHovered || searchQuery 
                  ? 'border-primary scale-[1.02]' 
                  : 'border-border'
              }`}
              style={{ 
                backgroundColor: 'var(--input-bg)',
                boxShadow: isHovered || searchQuery 
                  ? `var(--input-shadow-hover), 0 0 0 1px var(--primary)` 
                  : 'var(--input-shadow)'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center px-6 py-4">
                <Search className="w-5 h-5 text-muted-foreground mr-4 flex-shrink-0" />
                
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to stumble upon today?"
                  className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-base"
                  autoFocus
                />

                {/* Action Icons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-secondary transition-fast"
                    title="Voice search"
                  >
                    <Mic className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-secondary transition-fast"
                    title="Search by image"
                  >
                    <ImageIcon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-secondary transition-fast"
                    title="AI-powered stumble"
                  >
                    <Sparkles className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-card hover:bg-accent border border-border text-foreground font-medium transition-all duration-200"
              >
                Stumble Search
              </button>
              <button
                type="button"
                onClick={handleFeelingLucky}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-foreground text-primary-foreground font-medium transition-all duration-200"
              >
                I'm Feeling Lucky
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-fast">About</a>
              <a href="#" className="hover:text-foreground transition-fast">How it works</a>
              <a href="#" className="hover:text-foreground transition-fast">Privacy</a>
            </div>
            <div className="text-sm text-muted-foreground">
              Powered by AI serendipity
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
