export interface VibeTag {
  label: string;
  emoji: string;
}

export interface TopicScore {
  topic: string;
  score: number; // 0-100
}

export interface InterestMap {
  posted: TopicScore[];
  engaged: TopicScore[];
}

export interface VibeTrendPoint {
  date: string;
  sentiment: number; // -1 to 1
  tone: string;
  focus: string;
}

export interface UserVibeProfile {
  handle: string;
  name: string;
  avatar: string;
  vibeTags: VibeTag[];
  summary: string;
  interestMap: InterestMap;
  trend: VibeTrendPoint[];
  stats: {
    positivity: number;
    chaos: number;
    intellect: number;
    humor: number;
  };
  personalityTraits: string[];
}

export interface CompatibilityResult {
  score: number;
  verdict: string;
  sharedInterests: string[];
  toneSimilarity: number;
  postingStyleMatch: number;
  engagementPatternMatch: number;
}
