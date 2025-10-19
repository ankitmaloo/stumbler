import { useNavigate } from 'react-router-dom';
import StumbleBar from '@/components/StumbleBar';
import MultimodalInputBox from '@/components/MultimodalInputBox';
import { getRandomWebsite } from '@/data/sampleWebsites';

const HomePage = () => {
  const navigate = useNavigate();

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

        {/* Multimodal Search Box */}
        <MultimodalInputBox 
          showFeelingLucky={true}
          onFeelingLucky={handleFeelingLucky}
          source="home"
        />
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
