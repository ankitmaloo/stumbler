import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StumbleBar from '../components/StumbleBar';
import { articleStream } from '@/lib/api';
import { ArrowLeft, Send, RefreshCw } from 'lucide-react';

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const headline = location.state?.headline as { title: string; caption: string } | undefined;
  
  const [isLoading, setIsLoading] = useState(false);
  const [articleContent, setArticleContent] = useState<string>('');
  const [relatedHeadlines, setRelatedHeadlines] = useState<Array<{title: string; caption: string}>>([]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [showPromptInput, setShowPromptInput] = useState(false);
  
  const defaultPrompt = `Write a comprehensive article about: "${headline?.title}". 
        
Context: ${headline?.caption}

Please provide:
1. A detailed exploration of this topic
2. Key facts and background information
3. Current developments and implications
4. Expert perspectives

Write in an engaging, journalistic style.`;

  const fetchArticle = async (prompt: string) => {
    setIsLoading(true);
    setArticleContent('');
    
    try {
      console.log('[ArticleDetail] Streaming article with prompt:', prompt.substring(0, 100));
      
      await articleStream(prompt, (chunk: string) => {
        console.log('[ArticleDetail] Received chunk:', chunk.substring(0, 50));
        setArticleContent((prev) => prev + chunk);
      });
      
      console.log('[ArticleDetail] Article streaming complete');
      setIsLoading(false);
    } catch (error) {
      console.error('[ArticleDetail] Streaming failed:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!headline) {
      navigate('/');
      return;
    }

    // Initial load with default prompt
    fetchArticle(defaultPrompt);
  }, [headline, navigate]);

  const handleCustomPromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      const fullPrompt = `About: "${headline?.title}"\nContext: ${headline?.caption}\n\n${customPrompt}`;
      fetchArticle(fullPrompt);
      setShowPromptInput(false);
    }
  };

  if (!headline) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <StumbleBar compact={true} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Headlines
        </button>

        {/* Prompt Control */}
        <div className="mb-6">
          {!showPromptInput ? (
            <div className="flex gap-2">
              <button
                onClick={() => setShowPromptInput(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Send className="w-4 h-4" />
                Custom Prompt
              </button>
              <button
                onClick={() => fetchArticle(defaultPrompt)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Regenerate
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomPromptSubmit} className="space-y-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Ask anything about "{headline.title}"
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., 'Explain this like I'm 5', 'What are the pros and cons?', 'Give me the latest research'..."
                  className="w-full p-3 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoading || !customPrompt.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Generate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPromptInput(false);
                    setCustomPrompt('');
                  }}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Article Header */}
        <article className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {headline.title}
            </h1>
            <p className="text-xl text-white/90 mb-4">
              {headline.caption}
            </p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>AI Discovery</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {isLoading && !articleContent && (
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-4/6"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
              </div>
            )}
            
            {articleContent && (
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                  {articleContent
                    .replace(/```(?:json)?\s*\n?[\s\S]*?\n?```/g, '')
                    .replace(/\{[\s\S]*"headlines"[\s\S]*\}/g, '')
                    .trim()}
                </div>
              </div>
            )}

            {isLoading && articleContent && (
              <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm">Generating content...</span>
              </div>
            )}
          </div>
        </article>

        {/* Related Headlines */}
        {relatedHeadlines.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Related Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedHeadlines.slice(0, 6).map((related, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/article', { state: { headline: related } })}
                  className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-border hover:border-primary"
                >
                  <h3 className="font-semibold text-lg mb-2">{related.title}</h3>
                  <p className="text-sm text-muted-foreground">{related.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
