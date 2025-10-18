import { accentStyles } from './stumber-data';

export const getBarWidth = (value: number): string => {
  if (value >= 90) return 'w-full';
  if (value >= 70) return 'w-5/6';
  if (value >= 60) return 'w-4/5';
  if (value >= 50) return 'w-3/4';
  if (value >= 40) return 'w-2/3';
  if (value >= 30) return 'w-1/2';
  if (value >= 20) return 'w-2/5';
  return 'w-1/3';
};

export const mapCategoryToAccent = (category?: string): keyof typeof accentStyles => {
  if (!category) return 'default';
  const normalized = category.toLowerCase();
  if (normalized.includes('science') || normalized.includes('tech')) return 'science';
  if (normalized.includes('play') || normalized.includes('fun') || normalized.includes('creative'))
    return 'playful';
  if (normalized.includes('future') || normalized.includes('design') || normalized.includes('optim'))
    return 'future';
  if (normalized.includes('ethic') || normalized.includes('trust') || normalized.includes('reflect'))
    return 'ethics';
  return 'default';
};

export const getCategoryClass = (category?: string): string => {
  if (!category) return 'tinted-science';
  const normalized = category.toLowerCase();
  if (normalized.includes('science') || normalized.includes('tech')) return 'tinted-science';
  if (normalized.includes('play') || normalized.includes('fun') || normalized.includes('creative'))
    return 'tinted-playful';
  if (normalized.includes('future') || normalized.includes('design') || normalized.includes('optim'))
    return 'tinted-future';
  if (normalized.includes('ethic') || normalized.includes('trust') || normalized.includes('reflect'))
    return 'tinted-ethics';
  return 'tinted-science';
};

export const getTintedAccentClass = (category?: string): string => {
  return `${getCategoryClass(category)}-accent`;
};

export const getTintedRingClass = (category?: string): string => {
  return `${getCategoryClass(category)}-ring`;
};
