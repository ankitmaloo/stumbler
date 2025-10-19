import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../components/rabbit/ArticleCard';
import SimpleCard from '../components/rabbit/SimpleCard';
import HeroSection from '../components/rabbit/HeroSection';
import ScrollingCarousel from '../components/rabbit/ScrollingCarousel';
import ArticleList from '../components/rabbit/ArticleList';
import StumbleBar from '../components/StumbleBar';
import { articles as fallbackArticles } from '../data/articles';
import type { Article } from '../data/articles';
import { streamSearch } from '@/lib/api';

const Rabbit = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const jobId = params.get('job');
  const searchQuery = location.state?.query || '';
  const articlesFromState = location.state?.articles;
  const [articles, setArticles] = useState<Article[]>(articlesFromState || fallbackArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');
  const [images, setImages] = useState<{path:string; mime_type?: string}[]>([]);

  useEffect(() => {
    if (articlesFromState) { setArticles(articlesFromState); return; }

    if (!jobId) return;

    setIsLoading(true);
    let done = false;
    streamSearch(jobId, (evt) => {
      switch (evt.type) {
        case 'articles_batch':
          setArticles((prev) => {
            const all = [...prev.filter(a => a && a.id), ...evt.items];
            return all as Article[];
          });
          break;
        case 'summary_chunk':
          setSummary((s) => s + evt.text);
          break;
        case 'image':
          setImages((imgs) => [...imgs, { path: evt.path, mime_type: evt.mime_type }]);
          break;
        case 'done':
          done = true; setIsLoading(false); break;
      }
    }).catch(() => setIsLoading(false));

    return () => { if (!done) setIsLoading(false); };
  }, [searchQuery, articlesFromState, jobId]);

  const leftSidebar = articles.slice(0, 3);
  const rightSidebar = articles.slice(3, 5);
  const carousel = articles.slice(5, 10);
  const bottomGrid = articles.slice(10, 16);
  const bottomSection = articles.slice(16, 19);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <StumbleBar compact={true} />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StumbleBar compact={true} />
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
            {leftSidebar.map(article => 
              article.type === 'simple' ? (
                <SimpleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  date={article.date}
                  comments={article.comments}
                  likes={article.likes}
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
                />
              )
            )}
          </div>

          {/* CENTER - Hero Section */}
          <div className="lg:col-span-6">
            <HeroSection />
            {summary && (
              <div className="mt-4 p-4 rounded-lg bg-white/70 text-gray-800">
                <h3 className="font-semibold mb-2">AI Summary</h3>
                <p className="whitespace-pre-wrap">{summary}</p>
              </div>
            )}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="rounded overflow-hidden bg-white/60">
                    <img src={`${img.path.startsWith('backend/') ? 'http://localhost:8000/' + img.path.replace('backend/', '') : 'http://localhost:8000/' + img.path}`}
                         alt={`generated-${idx}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            {rightSidebar.map(article => (
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
              />
            ))}
          </div>
        </div>

        {/* Horizontal Scrolling Section */}
        <ScrollingCarousel />

        {/* Bottom Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {bottomGrid[0] && (
            bottomGrid[0].type === 'simple' ? (
              <SimpleCard
                key={bottomGrid[0].id}
                title={bottomGrid[0].title}
                description={bottomGrid[0].description}
                author={bottomGrid[0].author}
                date={bottomGrid[0].date}
                comments={bottomGrid[0].comments}
                likes={bottomGrid[0].likes}
              />
            ) : (
              <ArticleCard
                key={bottomGrid[0].id}
                title={bottomGrid[0].title}
                description={bottomGrid[0].description}
                author={bottomGrid[0].author}
                date={bottomGrid[0].date}
                image={bottomGrid[0].image}
                comments={bottomGrid[0].comments}
                likes={bottomGrid[0].likes}
                emojis={bottomGrid[0].emojis}
                hasVideo={bottomGrid[0].hasVideo}
              />
            )
          )}

          <ArticleList />

          {bottomGrid.slice(4, 6).map(article => 
            article.type === 'simple' ? (
              <SimpleCard
                key={article.id}
                title={article.title}
                description={article.description}
                author={article.author}
                date={article.date}
                comments={article.comments}
                likes={article.likes}
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
              />
            )
          )}
        </div>

        {/* Additional Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bottomSection[0] && (
            bottomSection[0].type === 'simple' ? (
              <SimpleCard
                key={bottomSection[0].id}
                title={bottomSection[0].title}
                description={bottomSection[0].description}
                author={bottomSection[0].author}
                date={bottomSection[0].date}
                comments={bottomSection[0].comments}
                likes={bottomSection[0].likes}
              />
            ) : (
              <ArticleCard
                key={bottomSection[0].id}
                title={bottomSection[0].title}
                description={bottomSection[0].description}
                author={bottomSection[0].author}
                date={bottomSection[0].date}
                image={bottomSection[0].image}
                comments={bottomSection[0].comments}
                likes={bottomSection[0].likes}
                emojis={bottomSection[0].emojis}
                hasVideo={bottomSection[0].hasVideo}
              />
            )
          )}

          <div className="grid grid-cols-1 gap-4">
            {bottomSection.slice(1).map(article => 
              article.type === 'simple' ? (
                <SimpleCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.author}
                  date={article.date}
                  comments={article.comments}
                  likes={article.likes}
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
                />
              )
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Rabbit;
