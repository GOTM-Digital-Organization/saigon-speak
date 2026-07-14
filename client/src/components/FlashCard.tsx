/**
 * FlashCard component — Saigon Speak
 * Design: Warm Colonial Linen aesthetic
 * - Front: English prompt on warm cream card
 * - Back: Vietnamese (Playfair, indigo) + pronunciation (DM Mono) + example + notes
 * - 3D flip animation via CSS perspective transform
 */

import { useState } from "react";
import { type Flashcard } from "@/lib/flashcards";
import { RotateCcw } from "lucide-react";

interface FlashCardProps {
  card: Flashcard;
  cardNumber: number;
  totalCards: number;
}

export default function FlashCard({ card, cardNumber, totalCards }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((f) => !f);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Card counter */}
      <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
        <span style={{ fontWeight: 500 }}>{cardNumber}</span>
        <span style={{ opacity: 0.5 }}>/</span>
        <span>{totalCards}</span>
      </div>

      {/* 3D Flip Card */}
      <div
        className="card-scene w-full cursor-pointer"
        style={{ height: "380px", maxWidth: "560px" }}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? "Show English" : "Show Vietnamese"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleFlip() : null}
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          {/* Front face — English */}
          <div className="card-face rounded-2xl flex flex-col items-center justify-center p-8 select-none"
            style={{
              background: "var(--cream)",
              boxShadow: "0 8px 40px oklch(0.22 0.02 60 / 0.12), 0 2px 8px oklch(0.22 0.02 60 / 0.06)",
              border: "1px solid var(--border)"
            }}>
            <div className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--terracotta-light)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}>
              English
            </div>
            <div className="text-4xl font-semibold text-center leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              {card.english}
            </div>
            <div className="mt-auto pt-6 text-sm text-center"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              Tap to reveal Vietnamese
            </div>
          </div>

          {/* Back face — Vietnamese */}
          <div className="card-face card-face-back rounded-2xl flex flex-col p-8 select-none overflow-y-auto"
            style={{
              background: "var(--cream)",
              boxShadow: "0 8px 40px oklch(0.22 0.02 60 / 0.12), 0 2px 8px oklch(0.22 0.02 60 / 0.06)",
              border: "1px solid var(--border)"
            }}>
            {/* Vietnamese text */}
            <div className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "var(--terracotta-light)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}>
              Southern Vietnamese
            </div>
            <div className="text-3xl font-semibold leading-snug mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--vietnamese)" }}>
              {card.vietnamese}
            </div>

            {/* Pronunciation */}
            <div className="text-base mb-4 px-3 py-1.5 rounded-lg inline-block self-start"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "var(--terracotta)",
                background: "oklch(0.52 0.14 40 / 0.08)",
                fontSize: "0.9rem"
              }}>
              /{card.pronunciation}/
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "0.75rem" }} />

            {/* Example sentence */}
            <div className="mb-1">
              <span className="text-xs font-medium tracking-wide uppercase"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>
                Example
              </span>
            </div>
            <div className="text-base italic mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--vietnamese-light)" }}>
              {card.example_sentence}
            </div>
            <div className="text-sm mb-3"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              {card.example_translation}
            </div>

            {/* Notes */}
            {card.notes && (
              <div className="mt-auto pt-2 px-3 py-2 rounded-lg text-xs"
                style={{
                  background: "oklch(0.78 0.14 80 / 0.12)",
                  color: "oklch(0.38 0.08 70)",
                  fontFamily: "'DM Sans', sans-serif",
                  borderLeft: "3px solid var(--gold)"
                }}>
                {card.notes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flip hint */}
      <button
        onClick={handleFlip}
        className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-100 opacity-60"
        style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
      >
        <RotateCcw size={12} />
        {flipped ? "Show English" : "Show Vietnamese"}
      </button>
    </div>
  );
}
