import rawData from "@/data/flashcards.json";

export interface Flashcard {
  english: string;
  vietnamese: string;
  pronunciation: string;
  example_sentence: string;
  example_translation: string;
  notes: string;
  category: string;
  audio_url?: string | null;
}

export const allCards: Flashcard[] = rawData as Flashcard[];

export const categories: string[] = Array.from(
  new Set(allCards.map((c) => c.category))
);

export function getCardsByCategory(category: string): Flashcard[] {
  return allCards.filter((c) => c.category === category);
}

export const categoryIcons: Record<string, string> = {
  "Greetings": "👋",
  "Introductions": "🤝",
  "Politeness": "🙏",
  "Numbers": "🔢",
  "Time & Dates": "🕐",
  "Money": "💵",
  "Restaurants": "🍜",
  "Coffee Shops": "☕",
  "Shopping": "🛍️",
  "Grab & Transportation": "🛵",
  "Renting Apartments": "🏠",
  "Directions": "🗺️",
  "Emergencies": "🚨",
  "Dating & Friends": "❤️",
  "Daily Conversation": "💬",
  "Slang & Colloquial Southern Vietnamese": "😄",
  "Food": "🥢",
  "Motorbike & Traffic": "🏍️",
  "Healthcare": "🏥",
  "Bureaucracy & Visas": "📋",
};
