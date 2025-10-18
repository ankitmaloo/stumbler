import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  animated?: boolean;
}

const getBarWidth = (value: number): string => {
  if (value >= 90) return 'w-full';
  if (value >= 70) return 'w-5/6';
  if (value >= 60) return 'w-4/5';
  if (value >= 50) return 'w-3/4';
  if (value >= 40) return 'w-2/3';
  if (value >= 30) return 'w-1/2';
  if (value >= 20) return 'w-2/5';
  return 'w-1/3';
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  theme = 'primary',
  animated = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`theme-${theme}-accent h-full rounded-full transition-all duration-300 ${
          animated ? 'animate-pulse' : ''
        } ${getBarWidth(percentage)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
