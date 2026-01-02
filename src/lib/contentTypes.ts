export type ProjectStatus = "done" | "in_progress" | "current";

export type ProjectRecord = {
  id: string;
  title: string;
  category: string | null;
  status: ProjectStatus;
  level?: number | null;
  base_coins?: number | null;
  coin_reward_per_click?: number | null;
  what_we_did?: string[] | string | null;
  result?: string[] | string | null;
  brief?: string | null;
  about?: string | null;
  published?: string | null;
  tech_stack?: string[] | null;
  image_url?: string | null;
  live_url?: string | null;
  repo_url?: string | null;
  files?: { name: string; size?: string; preview?: string }[] | null;
  order_index?: number | null;
};

export type ProfileRecord = {
  id: string;
  name?: string | null;
  occupation?: string | null;
  corporation?: string | null;
  availability?: string | null;
  motto?: string | null;
  who_is?: string | null;
  career_and_development?: string | null;
  problem_solving?: string | null;
  toolset?: string | null;
  level?: number | null;
  base_coins?: number | null;
  coin_reward_per_click?: number | null;
  coin_balance?: number | null;
};

export type LogRecord = {
  id: string;
  title: string;
  body: string;
  tag?: string | null;
  location?: string | null;
  status?: string | null;
  published_at?: string | null;
  project?: string | null;
};

export type AchievementStatus = "achieved" | "in_progress" | "todo";
export type AchievementRarity = "legendary" | "epic" | "rare" | "uncommon";

export type AchievementRecord = {
  id: string;
  title: string;
  status: AchievementStatus;
  rarity: AchievementRarity;
  description?: string | null;
  achieved_on?: string | null;
  note?: string | null;
  order_index?: number | null;
};
