/**
 * FlashCard component — Bangkok Speak
 * Design: Temple Gold & Teal aesthetic
 * - Front: English prompt on warm ivory card
 * - Back: Thai script (Noto Sans Thai, deep indigo) + pronunciation (DM Mono, teal) + example + notes
 * - 3D flip animation via CSS perspective transform
 * - Pronunciation is the HERO field — larger and more prominent than Thai script
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

  // Special handling for the Tones Guide card
  const isTonesGuide = card.english.includes("Tones Guide");

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
        style={{ height: isTonesGuide ? "460px" : "400px", maxWidth: "560px" }}
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? "Show English" : "Show Thai"}
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") ? handleFlip() : null}
      >
        <div className={`card-inner ${flipped ? "flipped" : ""}`}>
          {/* Front face — English */}
          <div
            className="card-face rounded-2xl flex flex-col items-center justify-center p-8 select-none"
            style={{
              background: "oklch(1 0 0)",
              boxShadow: "0 8px 40px oklch(0.20 0.02 55 / 0.10), 0 2px 8px oklch(0.20 0.02 55 / 0.05)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Gold top accent line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "3px",
              borderRadius: "0 0 4px 4px",
              background: "linear-gradient(90deg, oklch(0.72 0.14 72), oklch(0.60 0.14 65 / 0.3))"
            }} />

            <div
              className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "oklch(0.60 0.14 65)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em" }}
            >
              English
            </div>
            <div
              className="text-4xl font-semibold text-center leading-tight mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 600 }}
            >
              {card.english}
            </div>
            <div
              className="mt-auto pt-6 text-sm text-center"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Tap to reveal Thai
            </div>
          </div>

          {/* Back face — Thai */}
          <div
            className="card-face card-face-back rounded-2xl flex flex-col p-7 select-none overflow-y-auto"
            style={{
              background: "oklch(1 0 0)",
              boxShadow: "0 8px 40px oklch(0.20 0.02 55 / 0.10), 0 2px 8px oklch(0.20 0.02 55 / 0.05)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Gold top accent line */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "3px",
              borderRadius: "0 0 4px 4px",
              background: "linear-gradient(90deg, oklch(0.72 0.14 72), oklch(0.60 0.14 65 / 0.3))"
            }} />

            {/* Label */}
            <div
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.60 0.14 65)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.18em" }}
            >
              Bangkok Thai
            </div>

            {/* Thai script — secondary but visible */}
            <div
              className="mb-2 leading-relaxed"
              style={{
                fontFamily: "'Noto Sans Thai', 'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "oklch(0.25 0.09 250)",
                letterSpacing: "0.02em",
                lineHeight: 1.5,
              }}
            >
              {card.thai_script}
            </div>

            {/* Pronunciation — HERO field */}
            <div
              className="mb-4 px-4 py-2 rounded-full inline-block self-start"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "1.05rem",
                fontWeight: 500,
                color: "oklch(0.28 0.09 195)",
                background: "oklch(0.86 0.07 195 / 0.25)",
                border: "1px solid oklch(0.50 0.11 195 / 0.3)",
                letterSpacing: "0.02em",
              }}
            >
              {card.pronunciation}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "var(--border)", marginBottom: "0.75rem" }} />

            {/* Example sentence */}
            <div className="mb-1">
              <span
                className="text-xs font-medium tracking-wide uppercase"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}
              >
                Example
              </span>
            </div>
            <div
              className="text-base mb-1"
              style={{
                fontFamily: "'Noto Sans Thai', 'Cormorant Garamond', serif",
                color: "oklch(0.38 0.07 250)",
                lineHeight: 1.6,
                fontSize: "1rem",
              }}
            >
              {card.example_sentence}
            </div>
            <div
              className="text-sm mb-3 italic"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {card.example_translation}
            </div>

            {/* Notes */}
            {card.notes && (
              <div
                className="mt-auto pt-2 px-3 py-2 rounded-lg text-xs"
                style={{
                  background: "oklch(0.72 0.14 72 / 0.10)",
                  color: "oklch(0.40 0.08 65)",
                  fontFamily: "'DM Sans', sans-serif",
                  borderLeft: "3px solid oklch(0.72 0.14 72)",
                  lineHeight: 1.5,
                }}
              >
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
        {flipped ? "Show English" : "Show Thai"}
      </button>
    </div>
  );
}
