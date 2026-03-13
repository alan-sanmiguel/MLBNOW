// ════════════════════════════════════════════
// BALLPARK — Type Definitions
// ════════════════════════════════════════════

export interface BattingPlayer {
  rank: number;
  name: string;
  team: string;
  pos: string;
  G: number;
  AB: number;
  H: number;
  HR: number;
  RBI: number;
  BB: number;
  SO: number;
  AVG: number;
  OBP: number;
  SLG: number;
  OPS: number;
  wRC: number;
  [key: string]: string | number;
}

export interface PitchingPlayer {
  rank: number;
  name: string;
  team: string;
  W: number;
  L: number;
  ERA: number;
  IP: number;
  SO: number;
  WHIP: number;
  K9: number;
  FIP: number;
  WAR: number;
  [key: string]: string | number;
}

export interface Pitch {
  id: string;
  name: string;
  mph: number;
  hB: number;
  vB: number;
  use: number;
  color: string;
}

export interface Pitcher {
  name: string;
  num: number;
  team: string;
  hand: string;
  angle: number;
  pitches: Pitch[];
}

export type PitcherKey = 'skenes' | 'skubal' | 'miller';

export interface Article {
  id: string;
  cat: string;
  emoji: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  reads: number;
  tags: string[];
}

export interface PlayerCard {
  id: string;
  name: string;
  team: string;
  pos: string;
  rarity: string;
  cost: number;
  stats: Record<string, string>;
  color: string;
}

export interface PollOption {
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  active: boolean;
  pts: number;
}

export interface Post {
  id: number;
  author: string;
  initials: string;
  team: string;
  time: string;
  body: string;
  tags: string[];
  likes: number;
  comments: number;
  liked: boolean;
  isOfficial?: boolean;
}

export interface LiveGame {
  away: { name: string; score: number };
  home: { name: string; score: number };
  inning: string;
  top: boolean;
  balls: number;
  strikes: number;
  outs: number;
  innings: number[][];
}

export interface ChatMessage {
  user: string;
  initials: string;
  text: string;
  mine?: boolean;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  badge?: 'live' | 'new';
}

export interface NavGroup {
  section: string;
  items: NavItem[];
}

export type ViewId =
  | 'feed'
  | 'live'
  | 'stats'
  | 'pitches'
  | 'boxscore'
  | 'minigame'
  | 'news'
  | 'polls'
  | 'marketplace'
  | 'editor'
  | 'schema'
  | 'profile';

export type ScreenId = 'splash' | 'auth' | 'app';
