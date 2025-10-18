import React from 'react';

interface SectionCardProps {
  theme?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  noPadding?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  theme = 'primary',
  children,
  className = '',
  glassEffect = true,
  noPadding = false,
}) => {
  const baseClasses = `rounded-2xl transition-fast hover:scale-[1.02] ${
    glassEffect ? 'glass' : `theme-${theme}-card`
  }`;
  const paddingClasses = noPadding ? '' : 'p-6';

  return <div className={`${baseClasses} ${paddingClasses} ${className}`}>{children}</div>;
};
