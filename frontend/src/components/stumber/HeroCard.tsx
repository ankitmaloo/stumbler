import type { SampleContent } from '../../lib/stumber-types';
import { getCategoryClass } from '../../lib/stumber-utils';
import { TagList } from './TagList';

interface HeroCardProps {
  content: SampleContent;
}

export function HeroCard({ content }: HeroCardProps) {
  return (
    <div className={`${getCategoryClass(content.category)} rounded-lg shadow-sm border border-gray-700 p-6`}>
      <h2 className="text-3xl font-bold text-white mb-2">{content.title}</h2>
      <p className="text-gray-300 mb-4">{content.subtitle}</p>
      <TagList tags={content.tags} />
    </div>
  );
}
