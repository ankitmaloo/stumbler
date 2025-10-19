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
  },
  {
  id: '11',
  url: 'https://waitbutwhy.com/2014/05/the-dip.html',
  title: 'The Dip',
  category: 'productivity',
  description: 'An illustrated essay on when to quit and when to persevere in challenging endeavors.',
  tags: ['Strategy', 'Decision-Making', 'Illustrated']
},
{
  id: '12',
  url: 'https://waitbutwhy.com/2015/06/ai-revolution-1.html',
  title: 'The AI Revolution: The Road to Superintelligence',
  category: 'technology',
  description: 'A detailed exploration of artificial intelligence development and its potential future impact.',
  tags: ['AI', 'Futurism', 'Analysis']
},
{
  id: '13',
  url: 'https://www.ribbonfarm.com/2010/07/20/how-to-fall-in-love-with-a-stranger/',
  title: 'How to Fall in Love With a Stranger',
  category: 'psychology',
  description: 'An essay on social rituals, vulnerability, and the mechanics of human connection.',
  tags: ['Relationships', 'Social Dynamics', 'Essay']
},
{
  id: '14',
  url: 'https://www.ribbonfarm.com/2017/09/28/the-gollum-effect/',
  title: 'The Gollum Effect',
  category: 'philosophy',
  description: 'A reflection on identity fragmentation in the digital age using the metaphor of Gollum.',
  tags: ['Identity', 'Digital Culture', 'Metaphor']
},
{
  id: '15',
  url: 'https://paulgraham.com/startupideas.html',
  title: 'How to Get Startup Ideas',
  category: 'entrepreneurship',
  description: 'Practical advice on identifying genuine problems worth solving for startup founders.',
  tags: ['Startups', 'Innovation', 'Problem-Solving']
},
{
  id: '16',
  url: 'https://paulgraham.com/hw.html',
  title: 'Hiring is Hard',
  category: 'management',
  description: 'Insights into the challenges and principles of hiring technical talent effectively.',
  tags: ['Hiring', 'Talent', 'Engineering']
},
{
  id: '17',
  url: 'https://paulgraham.com/vb.html',
  title: 'The Visual Bell Curve',
  category: 'society',
  description: 'An argument about how visual media distorts perceptions of normalcy and success.',
  tags: ['Media', 'Perception', 'Culture']
},
{
  id: '18',
  url: 'https://danluu.com/deconstruct-files/',
  title: 'Files are Hard',
  category: 'computing',
  description: 'A technical deep dive into the hidden complexities of file systems and storage.',
  tags: ['Systems', 'File Systems', 'Engineering']
},
{
  id: '19',
  url: 'https://danluu.com/keyboard-latency/',
  title: 'Keyboard Latency',
  category: 'hardware',
  description: 'Measurements and analysis of input lag across different keyboards and systems.',
  tags: ['Latency', 'Input Devices', 'Performance']
},
{
  id: '20',
  url: 'https://danluu.com/empirical-pl/',
  title: 'Empirical Systems Programming',
  category: 'software',
  description: 'Discussion of empirical methods in low-level programming and system design.',
  tags: ['Systems Programming', 'Empiricism', 'C']
},
{
  id: '21',
  url: 'https://jvns.ca/blog/2016/03/21/new-programming-jobs/',
  title: 'New(ish) Types of Programming Jobs',
  category: 'career',
  description: 'Overview of emerging roles in software beyond traditional application development.',
  tags: ['Jobs', 'Career Paths', 'Tech Industry']
},
{
  id: '22',
  url: 'https://jvns.ca/blog/2017/11/20/why-do-we-sleep/',
  title: 'Why Do We Sleep?',
  category: 'biology',
  description: 'A programmer’s exploration of sleep science and its biological necessity.',
  tags: ['Sleep', 'Neuroscience', 'Health']
},
{
  id: '23',
  url: 'https://jvns.ca/blog/2020/01/26/systems-zines/',
  title: 'Systems Zines',
  category: 'education',
  description: 'Hand-drawn zines explaining complex computing concepts in an accessible way.',
  tags: ['Learning', 'Zines', 'Systems']
},
{
  id: '24',
  url: 'https://blog.cryptographyengineering.com/2011/11/28/the-cryptographic-doom-principle/',
  title: 'The Cryptographic Doom Principle',
  category: 'security',
  description: 'A warning about the dangers of incorrect cryptographic protocol design.',
  tags: ['Cryptography', 'Security', 'Protocols']
},
{
  id: '25',
  url: 'https://blog.cryptographyengineering.com/2012/05/19/how-to-ask-crypto-questions/',
  title: 'How to Ask Crypto Questions',
  category: 'security',
  description: 'Guidelines for formulating clear and answerable questions about cryptography.',
  tags: ['Cryptography', 'Communication', 'Best Practices']
},
{
  id: '26',
  url: 'https://www.gwern.net/Complexity',
  title: 'Complexity',
  category: 'science',
  description: 'An essay on computational and biological complexity, scaling laws, and intelligence.',
  tags: ['Complexity', 'AI', 'Biology']
},
{
  id: '27',
  url: 'https://www.gwern.net/Backlinks',
  title: 'Backlinks',
  category: 'web',
  description: 'Analysis of hyperlink structure and its implications for knowledge discovery.',
  tags: ['Web', 'Information Theory', 'SEO']
},
{
  id: '28',
  url: 'https://www.gwern.net/Notes',
  title: 'Notes',
  category: 'research',
  description: 'A sprawling collection of research notes on statistics, AI, and decision theory.',
  tags: ['Research', 'Notes', 'Data Science']
},
{
  id: '29',
  url: 'https://www.lesswrong.com/posts/Y4qgh7n5bJQpwb8Xo/sequence-introduction-to-the-sequences',
  title: 'Introduction to the Sequences',
  category: 'rationality',
  description: 'Overview of the foundational rationality concepts from LessWrong’s core curriculum.',
  tags: ['Rationality', 'Cognition', 'Philosophy']
},
{
  id: '30',
  url: 'https://www.lesswrong.com/posts/5wMcKNAwB6X4SxnfM/your-strength-as-a-rationalist',
  title: 'Your Strength as a Rationalist',
  category: 'rationality',
  description: 'On the importance of noticing confusion and updating beliefs based on evidence.',
  tags: ['Bayesian Reasoning', 'Epistemology', 'Self-Improvement']
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
