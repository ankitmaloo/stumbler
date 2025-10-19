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

const Rabbit = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || '';
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/api/articles');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          // Fallback to static data if API fails
          console.log('API not available, using fallback data');
          setArticles(fallbackArticles);
        }
      } catch (error) {
        // Fallback to static data on error
        console.log('Error fetching articles, using fallback data:', error);
        setArticles(fallbackArticles);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery]);

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
