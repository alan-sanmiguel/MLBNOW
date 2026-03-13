import type {
  BattingPlayer,
  PitchingPlayer,
  Pitcher,
  PitcherKey,
  Article,
  PlayerCard,
  Poll,
  Post,
  LiveGame,
  ChatMessage,
} from '../types';

// ── BATTING DATA ──
export const BATTING_DATA: BattingPlayer[] = [
  { rank: 1, name: 'Shohei Ohtani', team: 'LAD', pos: 'DH', G: 148, AB: 530, H: 170, HR: 44, RBI: 130, BB: 96, SO: 121, AVG: .321, OBP: .390, SLG: .660, OPS: 1.050, wRC: 188 },
  { rank: 2, name: 'Aaron Judge', team: 'NYY', pos: 'RF', G: 152, AB: 522, H: 157, HR: 48, RBI: 122, BB: 106, SO: 158, AVG: .301, OBP: .410, SLG: .622, OPS: 1.032, wRC: 179 },
  { rank: 3, name: 'Juan Soto', team: 'NYM', pos: 'RF', G: 156, AB: 542, H: 163, HR: 35, RBI: 104, BB: 118, SO: 112, AVG: .300, OBP: .420, SLG: .540, OPS: .960, wRC: 166 },
  { rank: 4, name: 'Yordan Alvarez', team: 'HOU', pos: 'DH', G: 135, AB: 478, H: 140, HR: 36, RBI: 112, BB: 82, SO: 130, AVG: .293, OBP: .380, SLG: .570, OPS: .950, wRC: 162 },
  { rank: 5, name: 'Freddie Freeman', team: 'LAD', pos: '1B', G: 150, AB: 543, H: 164, HR: 28, RBI: 100, BB: 88, SO: 95, AVG: .302, OBP: .390, SLG: .510, OPS: .900, wRC: 152 },
  { rank: 6, name: 'Julio Rodriguez', team: 'SEA', pos: 'CF', G: 156, AB: 585, H: 170, HR: 30, RBI: 105, BB: 58, SO: 145, AVG: .291, OBP: .345, SLG: .510, OPS: .855, wRC: 140 },
  { rank: 7, name: 'Jose Ramirez', team: 'CLE', pos: '3B', G: 150, AB: 548, H: 157, HR: 29, RBI: 108, BB: 78, SO: 88, AVG: .287, OBP: .365, SLG: .500, OPS: .865, wRC: 142 },
  { rank: 8, name: 'Bryce Harper', team: 'PHI', pos: '1B', G: 142, AB: 508, H: 144, HR: 30, RBI: 96, BB: 90, SO: 125, AVG: .283, OBP: .380, SLG: .518, OPS: .898, wRC: 148 },
];

// ── PITCHING DATA ──
export const PITCHING_DATA: PitchingPlayer[] = [
  { rank: 1, name: 'Paul Skenes', team: 'PIT', W: 18, L: 4, ERA: 1.88, IP: 210, SO: 266, WHIP: 0.95, K9: 11.4, FIP: 2.10, WAR: 8.4 },
  { rank: 2, name: 'Tarik Skubal', team: 'DET', W: 17, L: 5, ERA: 2.21, IP: 198, SO: 242, WHIP: 1.04, K9: 11.0, FIP: 2.45, WAR: 7.8 },
  { rank: 3, name: 'Mason Miller', team: 'OAK', W: 12, L: 8, ERA: 2.44, IP: 172, SO: 228, WHIP: 1.02, K9: 11.9, FIP: 2.30, WAR: 6.9 },
  { rank: 4, name: 'Zack Wheeler', team: 'PHI', W: 15, L: 7, ERA: 2.68, IP: 218, SO: 240, WHIP: 1.09, K9: 9.9, FIP: 2.80, WAR: 6.2 },
  { rank: 5, name: 'Gerrit Cole', team: 'NYY', W: 14, L: 6, ERA: 2.85, IP: 200, SO: 238, WHIP: 1.07, K9: 10.7, FIP: 2.70, WAR: 5.8 },
];

// ── PITCHERS ──
export const PITCHERS: Record<PitcherKey, Pitcher> = {
  skenes: {
    name: 'Paul Skenes', num: 30, team: 'PIT', hand: 'R', angle: 23,
    pitches: [
      { id: 'FF', name: '4-Seam Fastball', mph: 98.2, hB: 8, vB: 14, use: .39, color: '#D50032' },
      { id: 'SI', name: 'Sinker', mph: 97.6, hB: 14, vB: 2, use: .10, color: '#FD5A1E' },
      { id: 'FS', name: 'Split-Finger', mph: 93.7, hB: -4, vB: -10, use: .14, color: '#EFD19F' },
      { id: 'CH', name: 'Changeup', mph: 88.7, hB: 12, vB: -8, use: .11, color: '#AE8F6F' },
      { id: 'ST', name: 'Sweeper', mph: 84.5, hB: -18, vB: -4, use: .16, color: '#002D72' },
      { id: 'SL', name: 'Slider', mph: 85.3, hB: -12, vB: -8, use: .06, color: '#1a4faa' },
      { id: 'CU', name: 'Curveball', mph: 83.9, hB: -8, vB: -16, use: .05, color: '#8B6F52' },
    ],
  },
  skubal: {
    name: 'Tarik Skubal', num: 29, team: 'DET', hand: 'L', angle: 49,
    pitches: [
      { id: '4S', name: '4-Seam Fastball', mph: 97.6, hB: 8, vB: 14, use: .29, color: '#D50032' },
      { id: 'SI', name: 'Sinker', mph: 97.3, hB: 14, vB: 2, use: .24, color: '#FD5A1E' },
      { id: 'SL', name: 'Slider', mph: 90.0, hB: -10, vB: -10, use: .12, color: '#EFD19F' },
      { id: 'CH', name: 'Changeup', mph: 88.0, hB: 18, vB: 8, use: .31, color: '#AE8F6F' },
      { id: 'CU', name: 'Curveball', mph: 81.2, hB: -6, vB: -18, use: .03, color: '#8B6F52' },
    ],
  },
  miller: {
    name: 'Mason Miller', num: 57, team: 'OAK', hand: 'R', angle: 35,
    pitches: [
      { id: 'FF', name: '4-Seam Fastball', mph: 101.2, hB: 6, vB: 18, use: .52, color: '#D50032' },
      { id: 'SL', name: 'Slider', mph: 87.8, hB: -14, vB: -6, use: .46, color: '#002D72' },
      { id: 'CH', name: 'Changeup', mph: 92.9, hB: 8, vB: -4, use: .02, color: '#EFD19F' },
    ],
  },
};

// ── ARTICLES ──
export const ARTICLES: Article[] = [
  { id: 'a1', cat: 'Análisis', emoji: '⚾', title: 'México no logra la clasificación ante Italia', summary: 'Anoche México perdió ante Italia, sepultando su paso por el Clásico Mundial de Béisbol de 2026. México perdió ante Estados Unidos e Italia, dejándolos en tercer lugar.', author: 'Alan Sanmiguel', date: 'Hace 2 horas', reads: 1247, tags: ['Statcast', 'Pitcheo', 'MLB'] },
  { id: 'a2', cat: 'Sabermetría', emoji: '📊', title: 'wRC+ explicado: la métrica que todo fan mexicano debe conocer', summary: 'Guía completa para entender Weighted Runs Created Plus y por qué es superior al batting average.', author: 'Alan Sanmiguel', date: 'Hace 6 horas', reads: 892, tags: ['Sabermetría', 'Educación'] },
  { id: 'a3', cat: 'México', emoji: '🇲🇽', title: 'Mexicanos en MLB 2025: temporada histórica con 22 jugadores activos', summary: 'Desde Randy Arozarena hasta Julio Urías, el talento mexicano brilla en las Grandes Ligas.', author: 'Alan Sanmiguel', date: 'Hace 1 día', reads: 3420, tags: ['México', 'MLB'] },
  { id: 'a4', cat: 'Tecnología', emoji: '🔬', title: 'Cómo funciona Hawk-Eye: la tecnología detrás de cada pitcheo', summary: 'El sistema de tracking que captura 30 datos por pitcheo y revolucionó el análisis del béisbol.', author: 'Alan Sanmiguel', date: 'Hace 2 días', reads: 678, tags: ['Tecnología', 'Statcast'] },
];

// ── PLAYER CARDS ──
export const PLAYER_CARDS: PlayerCard[] = [
  { id: 'c1', name: 'Shohei Ohtani', team: 'LAD', pos: 'DH', rarity: 'Legendaria', cost: 500, stats: { AVG: '.321', HR: '44', OPS: '1.050' }, color: '#D50032' },
  { id: 'c2', name: 'Paul Skenes', team: 'PIT', pos: 'SP', rarity: 'Diamante', cost: 350, stats: { ERA: '1.88', SO: '266', WHIP: '0.95' }, color: '#002D72' },
  { id: 'c3', name: 'Aaron Judge', team: 'NYY', pos: 'RF', rarity: 'Diamante', cost: 350, stats: { AVG: '.301', HR: '48', OPS: '1.032' }, color: '#1a4faa' },
  { id: 'c4', name: 'Juan Soto', team: 'NYM', pos: 'RF', rarity: 'Oro', cost: 200, stats: { AVG: '.300', BB: '118', OPS: '.960' }, color: '#FD5A1E' },
  { id: 'c5', name: 'Julio Rodriguez', team: 'SEA', pos: 'CF', rarity: 'Oro', cost: 150, stats: { AVG: '.291', HR: '30', SB: '32' }, color: '#AE8F6F' },
  { id: 'c6', name: 'Freddie Freeman', team: 'LAD', pos: '1B', rarity: 'Oro', cost: 150, stats: { AVG: '.302', HR: '28', RBI: '100' }, color: '#8B6F52' },
];

// ── POLLS ──
export const DEMO_POLLS: Poll[] = [
  { id: 'p1', question: '¿Quién será el MVP de la Temporada 2025?', options: [{ text: 'Shohei Ohtani', votes: 342 }, { text: 'Aaron Judge', votes: 289 }, { text: 'Juan Soto', votes: 198 }, { text: 'Paul Skenes', votes: 156 }], active: true, pts: 5 },
  { id: 'p2', question: '¿Mejor pitcheo de la MLB?', options: [{ text: '4-Seam Fastball de Skenes', votes: 245 }, { text: 'Changeup de Skubal', votes: 198 }, { text: 'Slider de Miller', votes: 312 }], active: true, pts: 10 },
  { id: 'p3', question: '¿México producirá un Cy Young en 5 años?', options: [{ text: 'Sí, definitivamente', votes: 456 }, { text: 'No, todavía falta', votes: 234 }], active: false, pts: 5 },
];

// ── POSTS ──
export const DEMO_POSTS: Post[] = [
  { id: 1, author: 'Diego H.', initials: 'DH', team: 'Diablos', time: 'Hace 5 min', body: 'Acabo de ver que Skenes tiene 1.88 ERA en 210 innings. Estamos viendo algo histórico.', tags: ['#Skenes', '#Statcast'], likes: 24, comments: 8, liked: false },
  { id: 2, author: 'Sofía R.', initials: 'SR', team: 'Dodgers', time: 'Hace 22 min', body: 'El wRC+ de Ohtani es 188. Para contexto, el promedio de la liga es 100. Está casi al doble.', tags: ['#Sabermetría', '#Ohtani'], likes: 41, comments: 12, liked: true },
  { id: 3, author: 'Carlos V.', initials: 'CV', team: 'Yankees', time: 'Hace 1 hora', body: 'Judge vs Ohtani en la Serie Mundial sería el evento deportivo de la década.', tags: ['#MLB', '#SerieM'], likes: 67, comments: 23, liked: false },
  { id: 4, author: 'Ballpark', initials: 'BP', team: 'Oficial', time: 'Hace 3 horas', body: 'Nueva función: ahora puedes crear tu propio box score personalizado. Prueba la pestaña "Mi Box Score" 📊', tags: ['#Ballpark', '#Nuevo'], likes: 103, comments: 34, liked: false, isOfficial: true },
];

// ── LIVE GAME ──
export const LIVE_GAME: LiveGame = {
  away: { name: 'LAD', score: 3 },
  home: { name: 'PIT', score: 2 },
  inning: '7ᵃ',
  top: true,
  balls: 1,
  strikes: 2,
  outs: 1,
  innings: [[1, 0], [0, 1], [2, 0], [0, 0], [0, 1], [0, 0]],
};

// ── CHAT ──
export const CHAT_MSGS_DEMO: ChatMessage[] = [
  { user: '@sofia_bsbl', initials: 'SB', text: 'Ese sweeper de Skenes fue NASTY 🔥' },
  { user: '@beto_sonora', initials: 'BS', text: '98.2 mph fastball... increíble carry' },
  { user: '@mlb_fan_mx', initials: 'MF', text: 'Ohtani va a conectar, lo siento' },
  { user: '@dodger_blue', initials: 'DB', text: 'Vamos Dodgers!! 💙' },
  { user: '@skenes_fan', initials: 'SF', text: '2600 RPM en ese four-seam, elite' },
];

// ── SUPABASE SCHEMA ──
export const SUPABASE_SCHEMA = `-- BALLPARK · Supabase Schema
-- Enable RLS on all tables

CREATE TABLE profiles (
  id           UUID REFERENCES auth.users PRIMARY KEY,
  username     TEXT UNIQUE NOT NULL,
  full_name    TEXT,
  team_id      TEXT,
  points       INTEGER DEFAULT 0,
  level        TEXT DEFAULT 'Bronce',
  is_admin     BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE articles (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  summary      TEXT,
  content      TEXT NOT NULL,
  category     TEXT NOT NULL,
  author_id    UUID REFERENCES profiles(id),
  tags         TEXT[],
  cover_url    TEXT,
  reads        INTEGER DEFAULT 0,
  published    BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE polls (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question     TEXT NOT NULL,
  options      JSONB NOT NULL,
  ends_at      TIMESTAMPTZ NOT NULL,
  created_by   UUID REFERENCES profiles(id),
  pts_reward   INTEGER DEFAULT 5,
  active       BOOLEAN DEFAULT true
);

CREATE TABLE poll_votes (
  poll_id      UUID REFERENCES polls(id),
  user_id      UUID REFERENCES profiles(id),
  option_idx   INTEGER NOT NULL,
  voted_at     TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY(poll_id, user_id)
);

CREATE TABLE live_chat (
  id           BIGSERIAL PRIMARY KEY,
  game_id      TEXT NOT NULL,
  user_id      UUID REFERENCES profiles(id),
  message      TEXT NOT NULL,
  sent_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE live_chat REPLICA IDENTITY FULL;

CREATE TABLE player_cards (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name  TEXT NOT NULL,
  position     TEXT,
  team         TEXT,
  rarity       TEXT NOT NULL,
  stats        JSONB,
  cost_pts     INTEGER NOT NULL,
  edition      TEXT DEFAULT '2025'
);

CREATE TABLE redemptions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES profiles(id),
  item_type    TEXT NOT NULL,
  item_id      UUID,
  pts_spent    INTEGER NOT NULL,
  redeemed_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES profiles(id),
  body         TEXT NOT NULL,
  tags         TEXT[],
  likes        INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE box_scores (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES profiles(id),
  game_data    JSONB NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE leaderboard (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES profiles(id),
  pitcher_key  TEXT NOT NULL,
  score        INTEGER NOT NULL,
  hits         INTEGER DEFAULT 0,
  home_runs    INTEGER DEFAULT 0,
  avg_reaction REAL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE polls       ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_chat   ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE box_scores  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read" ON articles
  FOR SELECT USING (published = true);
CREATE POLICY "admin_write" ON articles
  FOR ALL USING (
    EXISTS(SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true)
  );
CREATE POLICY "public_read_cards" ON player_cards
  FOR SELECT USING (true);
CREATE POLICY "own_scores" ON leaderboard
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "public_read_lb" ON leaderboard
  FOR SELECT USING (true);`;
