import { UserVibeProfile, CompatibilityResult } from './types';

export const mockUsers: Record<string, UserVibeProfile> = {
  'elonmusk': {
    handle: 'elonmusk',
    name: 'Elon Musk',
    avatar: 'https://picsum.photos/seed/elon/200/200',
    vibeTags: [
      { label: 'Chaos Energy', emoji: '⚡' },
      { label: 'Tech Visionary', emoji: '🚀' },
      { label: 'Meme Lord', emoji: '🐸' }
    ],
    summary: 'A high-frequency poster blending deep technical insights with unpredictable humor and a penchant for disruptive ideas.',
    interestMap: {
      posted: [
        { topic: 'SpaceX', score: 95 },
        { topic: 'Tesla', score: 90 },
        { topic: 'AI Ethics', score: 75 },
        { topic: 'Memes', score: 85 },
        { topic: 'Politics', score: 60 }
      ],
      engaged: [
        { topic: 'Engineering', score: 80 },
        { topic: 'Gaming', score: 40 },
        { topic: 'Doge', score: 90 },
        { topic: 'X Features', score: 85 },
        { topic: 'Global News', score: 70 }
      ]
    },
    trend: [
      { date: '2025-09', sentiment: 0.2, tone: 'Optimistic', focus: 'Mars' },
      { date: '2025-10', sentiment: -0.1, tone: 'Aggressive', focus: 'Acquisitions' },
      { date: '2025-11', sentiment: 0.5, tone: 'Humorous', focus: 'AI' },
      { date: '2025-12', sentiment: 0.1, tone: 'Serious', focus: 'Regulation' },
      { date: '2026-01', sentiment: 0.3, tone: 'Visionary', focus: 'Starship' },
      { date: '2026-02', sentiment: 0.4, tone: 'Playful', focus: 'Grosh' }
    ],
    stats: {
      positivity: 65,
      chaos: 92,
      intellect: 88,
      humor: 78
    }
  },
  'taylorswift13': {
    handle: 'taylorswift13',
    name: 'Taylor Swift',
    avatar: 'https://picsum.photos/seed/taylor/200/200',
    vibeTags: [
      { label: 'Lyrical Genius', emoji: '✍️' },
      { label: 'Easter Egg Queen', emoji: '🥚' },
      { label: 'Cat Mom', emoji: '🐱' }
    ],
    summary: 'Strategic and poetic, her presence is a masterclass in narrative building and fan connection through subtle clues.',
    interestMap: {
      posted: [
        { topic: 'Music Production', score: 98 },
        { topic: 'Touring', score: 92 },
        { topic: 'Fashion', score: 70 },
        { topic: 'Cats', score: 85 },
        { topic: 'Fan Art', score: 60 }
      ],
      engaged: [
        { topic: 'Songwriting', score: 95 },
        { topic: 'Directing', score: 75 },
        { topic: 'Baking', score: 50 },
        { topic: 'Vinyl Culture', score: 80 },
        { topic: 'Poetry', score: 85 }
      ]
    },
    trend: [
      { date: '2025-09', sentiment: 0.8, tone: 'Grateful', focus: 'Eras Tour' },
      { date: '2025-10', sentiment: 0.6, tone: 'Mysterious', focus: 'New Album' },
      { date: '2025-11', sentiment: 0.7, tone: 'Empowered', focus: 'Re-recordings' },
      { date: '2025-12', sentiment: 0.9, tone: 'Festive', focus: 'Holidays' },
      { date: '2026-01', sentiment: 0.5, tone: 'Focused', focus: 'Grammys' },
      { date: '2026-02', sentiment: 0.7, tone: 'Excited', focus: 'Tour Resumption' }
    ],
    stats: {
      positivity: 85,
      chaos: 15,
      intellect: 90,
      humor: 60
    }
  }
};

export const getCompatibility = (user1: string, user2: string): CompatibilityResult => {
  /**
   * SCORING ALGORITHM:
   * In a real implementation, this would:
   * 1. Fetch recent 200 tweets for both users via X API v2.
   * 2. Perform sentiment analysis on text.
   * 3. Extract entities/hashtags to find shared interest clusters.
   * 4. Compare posting frequency and time-of-day patterns.
   * 
   * Current Mock Logic:
   * Uses handle length and character variance to generate a deterministic score.
   */
  const combined = (user1 + user2).length;
  const score = (combined * 7) % 101;
  
  return {
    score,
    verdict: score > 80 ? "Soulmates in another timeline." : score > 50 ? "Solid collab potential." : "Vibe mismatch detected.",
    sharedInterests: ['Future Tech', 'Creative Expression', 'Narrative Control'],
    toneSimilarity: Math.abs(score - 20) % 100,
    postingStyleMatch: (score + 15) % 100,
    engagementPatternMatch: (score * 1.2) % 100
  };
};

export const getRandomUser = (handle: string): UserVibeProfile => {
  /**
   * REAL API INTEGRATION:
   * Replace this with:
   * const response = await fetch(`/api/vibe/${handle}`);
   * const data = await response.json();
   * return data;
   */
  if (mockUsers[handle.toLowerCase()]) return mockUsers[handle.toLowerCase()];
  
  // Generate a random-ish user if not in mock
  return {
    handle,
    name: handle.charAt(0).toUpperCase() + handle.slice(1),
    avatar: `https://picsum.photos/seed/${handle}/200/200`,
    vibeTags: [
      { label: 'Main Character', emoji: '✨' },
      { label: 'Digital Nomad', emoji: '🌍' },
      { label: 'Coffee Addict', emoji: '☕' }
    ],
    summary: `A unique digital footprint characterized by ${handle}-esque energy and consistent engagement with trending topics.`,
    interestMap: {
      posted: [
        { topic: 'Lifestyle', score: 70 },
        { topic: 'Tech', score: 50 },
        { topic: 'Travel', score: 80 },
        { topic: 'Food', score: 65 },
        { topic: 'Art', score: 40 }
      ],
      engaged: [
        { topic: 'Memes', score: 90 },
        { topic: 'News', score: 45 },
        { topic: 'Gaming', score: 30 },
        { topic: 'Fitness', score: 55 },
        { topic: 'Music', score: 75 }
      ]
    },
    trend: [
      { date: '2025-09', sentiment: 0.1, tone: 'Neutral', focus: 'Summer' },
      { date: '2025-10', sentiment: 0.3, tone: 'Happy', focus: 'Work' },
      { date: '2025-11', sentiment: -0.2, tone: 'Tired', focus: 'Deadlines' },
      { date: '2025-12', sentiment: 0.6, tone: 'Joyful', focus: 'Holidays' },
      { date: '2026-01', sentiment: 0.4, tone: 'Motivated', focus: 'Goals' },
      { date: '2026-02', sentiment: 0.2, tone: 'Chill', focus: 'Routine' }
    ],
    stats: {
      positivity: 60,
      chaos: 40,
      intellect: 70,
      humor: 50
    }
  };
};
