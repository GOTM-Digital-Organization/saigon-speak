import rawData from "@/data/flashcards.json";

export interface Flashcard {
  english: string;
  thai_script: string;
  pronunciation: string;
  example_sentence: string;
  example_translation: string;
  notes: string;
  category: string;
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
  "Money & Bargaining": "💵",
  "Restaurants": "🍜",
  "Street Food & Night Markets": "🌙",
  "Coffee Shops & Cafés": "☕",
  "Shopping": "🛍️",
  "Tuk-tuks, Taxis & Transport": "🛺",
  "Renting Apartments": "🏠",
  "Directions": "🗺️",
  "Emergencies": "🚨",
  "Dating & Friends": "❤️",
  "Daily Conversation": "💬",
  "Slang & Colloquial Bangkok Thai": "😄",
  "Temples, Monks & Culture": "🛕",
  "Healthcare": "🏥",
  "Bureaucracy & Visas": "📋",
};
