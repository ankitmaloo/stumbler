import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ArticleCard from '../components/rabbit/ArticleCard';
import SimpleCard from '../components/rabbit/SimpleCard';
import HeroSection from '../components/rabbit/HeroSection';
import ScrollingCarousel from '../components/rabbit/ScrollingCarousel';
import StumbleBar from '../components/StumbleBar';
import { webSocketSearch, type MultimodalSearchParams } from '@/lib/api';

const Rabbit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams: MultimodalSearchParams | undefined = location.state?.searchParams;
  const searchQuery = location.state?.query || '';
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [images, setImages] = useState<{path:string; mime_type?: string}[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [headlines, setHeadlines] = useState<Array<{title: string; caption: string}>>([]);

  const handleHeadlineClick = (headline: {title: string; caption: string}) => {
    navigate('/article', { state: { headline } });
  };

  useEffect(() => {
    if (!searchQuery && !searchParams) return;

    setIsLoading(true);
    let done = false;
    
    const handleEvent = (evt: any) => {
      console.log('[Rabbit] Received event:', evt);
      switch (evt.type) {
        case 'summary_chunk':
          setSummary((s) => s + evt.text);
          break;
        case 'image':
          setImages((imgs) => [...imgs, { path: evt.path, mime_type: evt.mime_type }]);
          break;
        case 'hero_image':
          console.log('[Rabbit] Setting hero image:', evt.path);
          const imagePath = evt.path.startsWith('backend/') 
            ? `http://localhost:8000/${evt.path.replace('backend/', '')}` 
            : `http://localhost:8000/${evt.path}`;
          setHeroImage(imagePath);
          break;
        case 'headline':
          console.log('[Rabbit] Adding headline:', evt.title, evt.caption);
          setHeadlines((h) => {
            const newHeadlines = [...h, { title: evt.title, caption: evt.caption }];
            console.log('[Rabbit] Updated headlines count:', newHeadlines.length);
            return newHeadlines;
          });
          break;
        case 'done':
          console.log('[Rabbit] Done event received');
          done = true;
          setIsLoading(false);
          break;
        default:
          console.log('[Rabbit] Unknown event type:', evt.type);
      }
    };
    
    const executeWebSocketSearch = async (params: MultimodalSearchParams) => {
      try {
        await webSocketSearch(params, handleEvent);
      } catch (error) {
        console.error('WebSocket search failed', error);
        setIsLoading(false);
      }
    };

    if (searchParams) {
      executeWebSocketSearch(searchParams);
    } else if (searchQuery) {
      executeWebSocketSearch({
        text: searchQuery,
        image: null,
        source: 'home',
        isLive: false,
      });
    }

    return () => { if (!done) setIsLoading(false); };
  }, [searchQuery, searchParams]);

  const headlineArticles = headlines.map((h, idx) => ({
    id: `headline-${idx}`,
    title: h.title,
    description: h.caption,
    author: 'AI Discovery',
    date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
    type: 'simple',
    image: undefined,
    comments: 0,
    likes: 0,
    emojis: [],
    hasVideo: false,
  }));

  const leftSidebar = headlines.length > 0 ? headlineArticles.slice(1, 4) : [];
  const rightSidebar = headlines.length > 0 ? headlineArticles.slice(4, 6) : [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StumbleBar compact={true} />
      {/* Debug info */}
      <div className="bg-yellow-100 border-2 border-yellow-500 p-2 text-xs">
        <strong>Debug:</strong> Headlines count: {headlines.length} | Loading: {isLoading ? 'Yes' : 'No'} | 
        Query: {searchQuery || 'from params'} | 
        {headlines.length > 0 && <span> First: "{headlines[0]?.title?.substring(0, 50)}..."</span>}
      </div>
      {(isLoading && headlines.length === 0) && (
        <div className="px-4">
          <div className="max-w-[1400px] mx-auto mt-8 space-y-6" role="status" aria-live="polite">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-3 space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={`left-skeleton-${idx}`} className="h-40 bg-gradient-to-br from-muted/80 via-muted to-muted/60 rounded-xl animate-pulse" />
                ))}
              </div>
              <div className="lg:col-span-6">
                <div className="h-[360px] md:h-[420px] bg-gradient-to-br from-muted via-muted/70 to-muted/40 rounded-2xl animate-pulse" />
                <div className="mt-4 h-20 bg-muted/60 rounded-xl animate-pulse" />
              </div>
              <div className="lg:col-span-3 space-y-4">
                {[...Array(2)].map((_, idx) => (
                  <div key={`right-skeleton-${idx}`} className="h-48 bg-gradient-to-br from-muted/80 via-muted to-muted/60 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="h-24 bg-muted/50 rounded-xl animate-pulse" />
          </div>
        </div>
      )}
      <div 
        className="flex-1"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, transparent 50%, white 90%, white 100%),
            radial-gradient(ellipse 100% 50% at 50% 30%, #9b7eb8 0%, transparent 60%),
            linear-gradient(to right, #b8d4f0 0%, #c8b5e0 50%, #f0c5d8 100%)
          `
        }}
      >
      <div className="max-w-[1400px] mx-auto p-4">
        {/* Top Section - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            {leftSidebar.map((article, idx) => {
              const headline = headlines[idx + 1];
              return article.type === 'simple' ? (
                <SimpleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  date={article.date}
                  comments={article.comments}
                  likes={article.likes}
                  onClick={() => headline && handleHeadlineClick(headline)}
                />
              ) : (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  date={article.date}
                  image={article.image}
                  comments={article.comments}
                  likes={article.likes}
                  emojis={article.emojis}
                  hasVideo={article.hasVideo}
                  onClick={() => headline && handleHeadlineClick(headline)}
                />
              );
            })}
          </div>

          {/* CENTER - Hero Section */}
          <div className="lg:col-span-6">
            {headlines.length > 0 ? (
              <div onClick={() => handleHeadlineClick(headlines[0])} className="cursor-pointer">
                <HeroSection headline={headlines[0]} heroImage={heroImage} />
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-lg overflow-hidden shadow-2xl relative h-full min-h-[600px] max-h-[600px] flex items-center justify-center">
                {heroImage && (
                  <img 
                    src={heroImage}
                    alt="Loading" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                )}
                <p className="text-white text-center relative z-10">Loading headlines...</p>
              </div>
            )}
            {summary && (
              <div className="mt-4 p-4 rounded-lg bg-white/70 text-gray-800">
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <p className="whitespace-pre-wrap">
                  {summary
                    .replace(/```(?:json)?\s*\n?[\s\S]*?\n?```/g, '')
                    .replace(/\{[\s\S]*"headlines"[\s\S]*\}/g, '')
                    .trim()}
                </p>
              </div>
            )}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="rounded overflow-hidden bg-white/60">
                    <img src={`${img.path.startsWith('backend/') ? 'http://localhost:8000/' + img.path.replace('backend/', '') : 'http://localhost:8000/' + img.path}`}
                         alt={`generated-${idx}`}
                         className="w-full h-auto max-h-[300px] object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            {rightSidebar.map((article, idx) => {
              const headline = headlines[idx + 4];
              return (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  date={article.date}
                  image={article.image}
                  comments={article.comments}
                  likes={article.likes}
                  emojis={article.emojis}
                  hasVideo={article.hasVideo}
                  onClick={() => headline && handleHeadlineClick(headline)}
                />
              );
            })}
          </div>
        </div>

        {/* Horizontal Scrolling Section */}
        {headlines.length > 0 && <ScrollingCarousel headlines={headlines} />}
      </div>
      </div>
    </div>
  );
};

export default Rabbit;
