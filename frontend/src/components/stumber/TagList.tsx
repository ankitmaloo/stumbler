import React from 'react';

interface TagListProps {
  tags: string[];
  theme?: 'primary' | 'secondary' | 'tertiary' | 'accent';
}

export const TagList: React.FC<TagListProps> = ({ tags, theme = 'primary' }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium theme-${theme}-card`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
