import React from 'react';
import { SectionCard } from './SectionCard';
import { TagList } from './TagList';

interface SampleContent {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  summary: string;
  tags: string[];
}

interface StumberContentProps {
  content: SampleContent;
  categoryTheme: 'primary' | 'secondary' | 'tertiary' | 'accent';
  summaryVisible: boolean;
}

export const StumberContent: React.FC<StumberContentProps> = ({
  content,
  categoryTheme,
  summaryVisible,
}) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Hero Card */}
      <SectionCard theme={categoryTheme}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
            <div className={`w-16 h-16 gradient-${categoryTheme} rounded-2xl flex items-center justify-center text-white text-2xl glass-reverse`}>
              {categoryTheme === 'primary' ? '🧬' : categoryTheme === 'secondary' ? '🔮' : categoryTheme === 'tertiary' ? '🌿' : '✨'}
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-4">{content.subtitle}</p>
          <TagList tags={content.tags} theme={categoryTheme} />
        </div>
      </SectionCard>

      {/* Live Preview */}
      <SectionCard theme={categoryTheme} glassEffect noPadding>
        <div className="relative bg-gradient-to-br from-muted to-background rounded-2xl overflow-hidden h-96">
          <iframe src={content.url} title={content.title} className="w-full h-full border-0" loading="lazy" />
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full shadow-sm flex items-center space-x-2 z-10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Live</span>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};
