export interface Confession {
  id: string;
  text: string;
  scripture: string;
  category: Category;
  moods?: Mood[];
  isToday?: boolean;
}

export type Category =
  | "faith"
  | "peace"
  | "healing"
  | "protection"
  | "prosperity"
  | "wisdom"
  | "strength"
  | "identity"
  | "daily";

export type Mood =
  | "joyful"
  | "peaceful"
  | "anxious"
  | "fearful"
  | "sad"
  | "hopeful"
  | "grateful"
  | "discouraged"
  | "overwhelmed";

export interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
}
