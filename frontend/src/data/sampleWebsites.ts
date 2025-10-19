export type Website = {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
};

export const sampleWebsites: Website[] = [
  {
    id: '1',
    url: 'https://neal.fun/deep-sea/',
    title: 'Deep Sea Exploration',
    category: 'science',
    description: 'An interactive journey through the depths of the ocean, discovering creatures at different depths.',
    tags: ['Interactive', 'Science', 'Nature']
  },
  {
    id: '2',
    url: 'https://www.cameronsworld.net/',
    title: "Cameron's World",
    category: 'playful',
    description: 'A love letter to the Internet of old, a digital collage of nostalgic GeoCities websites.',
    tags: ['Art', 'Nostalgia', 'Internet History']
  },
  {
    id: '3',
    url: 'https://htwins.net/scale2/',
    title: 'The Scale of the Universe',
    category: 'science',
    description: 'Interactive visualization showing the relative size of everything from quantum foam to the observable universe.',
    tags: ['Interactive', 'Space', 'Mind Blown']
  },
  {
    id: '4',
    url: 'https://radio.garden/',
    title: 'Radio Garden',
    category: 'playful',
    description: 'Listen to live radio stations from around the world by spinning a 3D globe.',
    tags: ['Music', 'Culture', 'Global']
  },
  {
    id: '5',
    url: 'https://experiments.withgoogle.com/collection/ai',
    title: 'Google AI Experiments',
    category: 'future',
    description: 'Interactive experiments showcasing creative applications of machine learning.',
    tags: ['AI', 'Interactive', 'Technology']
  },
  {
    id: '6',
    url: 'https://www.openculture.com/',
    title: 'Open Culture',
    category: 'ethics',
    description: 'Free cultural and educational media, including courses, movies, ebooks, and audiobooks.',
    tags: ['Education', 'Culture', 'Learning']
  },
  {
    id: '7',
    url: 'https://www.atlasobscura.com/',
    title: 'Atlas Obscura',
    category: 'future',
    description: "Explore the world's hidden wonders, curious places, and unusual destinations.",
    tags: ['Travel', 'Discovery', 'Culture']
  },
  {
    id: '8',
    url: 'https://longform.org/',
    title: 'Longform',
    category: 'ethics',
    description: 'The best longform journalism and storytelling from around the web.',
    tags: ['Reading', 'Journalism', 'Stories']
  },
  {
    id: '9',
    url: 'https://www.futilitycloset.com/',
    title: 'Futility Closet',
    category: 'playful',
    description: 'A collection of entertaining curiosities in history, literature, language, art, philosophy, and mathematics.',
    tags: ['Trivia', 'History', 'Curiosities']
  },
  {
    id: '10',
    url: 'https://www.earthcam.com/',
    title: 'EarthCam',
    category: 'science',
    description: 'Live streaming webcams from famous locations and cities around the world.',
    tags: ['Live', 'Travel', 'Global']
  }
];

export const getRandomWebsite = (): Website => {
  return sampleWebsites[Math.floor(Math.random() * sampleWebsites.length)];
};

export const getWebsiteById = (id: string): Website | undefined => {
  return sampleWebsites.find(site => site.id === id);
};

export const getSuggestions = (currentId: string, count: number = 3): Website[] => {
  const filtered = sampleWebsites.filter(site => site.id !== currentId);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
