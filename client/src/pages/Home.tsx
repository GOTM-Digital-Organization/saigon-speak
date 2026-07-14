/**
 * Home page — Bangkok Speak
 * Design: Temple Gold & Teal aesthetic
 * Layout: Left sidebar (categories) + Right main area (flashcard study)
 * Mobile: Full-screen card with bottom category picker
 * Key difference from Saigon Speak: Pronunciation is the HERO field (Thai script is secondary)
 */

import { useState, useCallback, useEffect } from "react";
import { categories, getCardsByCategory, categoryIcons } from "@/lib/flashcards";
import FlashCard from "@/components/FlashCard";
import CategorySidebar from "@/components/CategorySidebar";
import { ChevronLeft, ChevronRight, Menu, X, RotateCcw, CheckCircle2, BookOpen } from "lucide-react";

type View = "landing" | "study";

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cardIndex, setCardIndex] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const cards = getCardsByCategory(activeCategory);
  const currentCard = cards[cardIndex];
  const totalCards = cards.length;

  useEffect(() => {
    if (view === "study") {
      setProgress((prev) => ({
        ...prev,
        [activeCategory]: Math.max(prev[activeCategory] ?? 0, cardIndex + 1),
      }));
    }
  }, [cardIndex, activeCategory, view]);

  const handleCategorySelect = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCardIndex(0);
    setShowComplete(false);
    setSidebarOpen(false);
    setView("study");
  }, []);

  const handleNext = useCallback(() => {
    if (cardIndex < totalCards - 1) {
      setCardIndex((i) => i + 1);
    } else {
      setShowComplete(true);
    }
  }, [cardIndex, totalCards]);

  const handlePrev = useCallback(() => {
    if (cardIndex > 0) {
      setCardIndex((i) => i - 1);
      setShowComplete(false);
    }
  }, [cardIndex]);

  const handleRestart = useCallback(() => {
    setCardIndex(0);
    setShowComplete(false);
  }, []);

  useEffect(() => {
    if (view !== "study") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNext, handlePrev, view]);

  const progressPct = totalCards > 0 ? Math.round(((cardIndex + 1) / totalCards) * 100) : 0;
  const totalSeen = Object.values(progress).reduce((a, b) => a + b, 0);
  const totalAll = categories.reduce((sum, cat) => sum + getCardsByCategory(cat).length, 0);

  // ── LANDING VIEW ──────────────────────────────────────────────────────────
  if (view === "landing") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
        {/* Header */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ background: "oklch(1 0 0)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <img src="/manus-storage/bangkok-logo_c617d69e.png" alt="Bangkok Speak" className="w-9 h-9 object-contain" />
            <div>
              <h1 className="text-xl font-bold leading-none"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
                Bangkok Speak
              </h1>
              <p className="text-xs leading-none mt-0.5"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                Real Bangkok Thai Flashcards
              </p>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/manus-storage/bangkok-hero_008dedbc.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "oklch(0.18 0.04 55 / 0.55)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-28">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-5"
              style={{
                background: "oklch(0.72 0.14 72 / 0.25)",
                color: "oklch(0.95 0.08 80)",
                border: "1px solid oklch(0.72 0.14 72 / 0.45)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.14em"
              }}>
              Bangkok Street Thai
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, textShadow: "0 2px 16px oklch(0.1 0 0 / 0.5)" }}>
              Learn Thai the way Bangkok actually speaks it.
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-xl"
              style={{ color: "oklch(0.92 0.03 80)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Not textbook Thai. Real street language — the phrases you'll actually hear at street food stalls, in tuk-tuks, and in daily Bangkok life.
            </p>
            <button
              onClick={() => handleCategorySelect(categories[0])}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold transition-all active:scale-95 hover:opacity-90"
              style={{
                background: "oklch(0.60 0.14 65)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 20px oklch(0.60 0.14 65 / 0.5)"
              }}
            >
              <BookOpen size={18} />
              Start with Greetings
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-b" style={{ background: "oklch(1 0 0)", borderColor: "var(--border)" }}>
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap gap-6 justify-center md:justify-start">
            {[
              { label: "Categories", value: "20" },
              { label: "Flashcards", value: "495" },
              { label: "Real Bangkok Thai", value: "100%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.60 0.14 65)", fontWeight: 700 }}>
                  {value}
                </span>
                <span className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample flashcard preview */}
        <div style={{ background: "oklch(0.60 0.14 65 / 0.05)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{ color: "oklch(0.60 0.14 65)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em" }}>
                  What every card looks like
                </div>
                <h3 className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
                  Real Bangkok Thai,<br />not textbook language.
                </h3>
                <p className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                  Every card shows the Thai script, an English-friendly pronunciation guide (the most important part), a natural example sentence, and a note on when locals actually use it.
                </p>
                <div className="flex flex-col gap-2 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                  {[
                    ["Thai Script", "หวัดดี — so you recognize it written"],
                    ["Pronunciation", "wàt-dee — how you actually say it"],
                    ["Example", "wàt-dee jâa → Hey! (casual greeting)"],
                    ["Notes", "Casual — use with friends, not elders"],
                  ].map(([label, desc]) => (
                    <div key={label} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "oklch(0.60 0.14 65)" }} />
                      <span><strong>{label}:</strong> {desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample card */}
              <div className="w-full md:w-72 flex-shrink-0">
                <div className="rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden"
                  style={{
                    background: "oklch(1 0 0)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 32px oklch(0.20 0.02 55 / 0.10)"
                  }}>
                  {/* Gold top line */}
                  <div style={{
                    position: "absolute", top: 0, left: "10%", right: "10%", height: "3px",
                    borderRadius: "0 0 4px 4px",
                    background: "linear-gradient(90deg, oklch(0.72 0.14 72), oklch(0.60 0.14 65 / 0.3))"
                  }} />
                  <div className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "oklch(0.60 0.14 65)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em" }}>
                    Bangkok Thai
                  </div>
                  {/* Thai script */}
                  <div style={{
                    fontFamily: "'Noto Sans Thai', 'Cormorant Garamond', serif",
                    fontSize: "1.6rem", fontWeight: 600,
                    color: "oklch(0.25 0.09 250)", lineHeight: 1.5
                  }}>
                    หวัดดี
                  </div>
                  {/* Pronunciation — hero */}
                  <div className="px-4 py-1.5 rounded-full self-start"
                    style={{
                      fontFamily: "'DM Mono', monospace", fontSize: "1rem", fontWeight: 500,
                      color: "oklch(0.28 0.09 195)",
                      background: "oklch(0.86 0.07 195 / 0.25)",
                      border: "1px solid oklch(0.50 0.11 195 / 0.3)"
                    }}>
                    wàt-dee
                  </div>
                  <div style={{ height: "1px", background: "var(--border)" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>Example</div>
                    <div className="text-sm"
                      style={{ fontFamily: "'DM Mono', monospace", color: "oklch(0.38 0.07 250)", lineHeight: 1.6 }}>
                      wàt-dee jâa · jer-gan têe ráan ná
                    </div>
                    <div className="text-xs mt-0.5 italic"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                      Hey! See you at the shop.
                    </div>
                  </div>
                  <div className="px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: "oklch(0.72 0.14 72 / 0.10)",
                      color: "oklch(0.40 0.08 65)",
                      borderLeft: "3px solid oklch(0.72 0.14 72)",
                      fontFamily: "'DM Sans', sans-serif"
                    }}>
                    Very casual — use with friends. Add jâa for warmth. Avoid with elders (use sà-wàt-dee krap/kâ).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
          <h3 className="text-xl font-bold mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
            Choose a Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const total = getCardsByCategory(cat).length;
              const seen = progress[cat] ?? 0;
              const pct = total > 0 ? Math.round((seen / total) * 100) : 0;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="flex flex-col items-start p-4 rounded-xl text-left transition-all hover:shadow-md active:scale-95 group"
                  style={{
                    background: "oklch(1 0 0)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px oklch(0.20 0.02 55 / 0.06)"
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-sm font-bold"
                    style={{
                      background: pct === 100 ? "oklch(0.86 0.07 195 / 0.2)" : "oklch(0.60 0.14 65 / 0.12)",
                      color: pct === 100 ? "oklch(0.50 0.11 195)" : "oklch(0.60 0.14 65)",
                      fontFamily: "'DM Mono', monospace"
                    }}>
                    {pct === 100 ? "✓" : (categories.indexOf(cat) + 1).toString().padStart(2, "0")}
                  </div>
                  <span className="text-sm font-medium leading-snug mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                    {cat}
                  </span>
                  <div className="w-full h-1 rounded-full overflow-hidden mt-auto" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100 ? "oklch(0.50 0.11 195)" : "oklch(0.60 0.14 65)",
                        opacity: pct === 0 ? 0 : 1
                      }}
                    />
                  </div>
                  <span className="text-xs mt-1" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }}>
                    {total} cards
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t py-6 text-center"
          style={{ borderColor: "var(--border)", background: "oklch(1 0 0)" }}>
          <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            Bangkok Speak — Everyday Bangkok Thai for real life in Thailand
          </p>
        </footer>
      </div>
    );
  }

  // ── STUDY VIEW ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 md:px-6 py-3 border-b"
        style={{
          background: "oklch(1 0 0)",
          borderColor: "var(--border)",
          boxShadow: "0 1px 8px oklch(0.20 0.02 55 / 0.06)"
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("landing")}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <img src="/manus-storage/bangkok-logo_c617d69e.png" alt="Bangkok Speak" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold hidden sm:block"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
              Bangkok Speak
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Overall progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: "var(--secondary)", fontFamily: "'DM Sans', sans-serif", color: "var(--muted-foreground)" }}>
            <span>{totalSeen}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{totalAll} seen</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ background: "var(--secondary)" }}
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle categories"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Desktop: current category badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "oklch(0.60 0.14 65 / 0.10)" }}>
            <span className="text-base">{categoryIcons[activeCategory] ?? "📚"}</span>
            <span className="text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.14 65)" }}>
              {activeCategory}
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-0 z-40 md:static md:z-auto
            transition-transform duration-300 ease-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
          style={{ width: "280px", flexShrink: 0 }}
        >
          {sidebarOpen && (
            <div
              className="fixed inset-0 md:hidden"
              style={{ background: "oklch(0.20 0.02 55 / 0.4)", zIndex: -1 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div
            className="h-full overflow-hidden"
            style={{
              background: "oklch(1 0 0)",
              borderRight: "1px solid var(--border)",
              boxShadow: "2px 0 16px oklch(0.20 0.02 55 / 0.06)"
            }}
          >
            <CategorySidebar
              activeCategory={activeCategory}
              onSelect={handleCategorySelect}
              progress={progress}
            />
          </div>
        </aside>

        {/* Main study area */}
        <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-4 py-8 md:py-12">
          {/* Category header */}
          <div className="w-full max-w-xl mb-6 text-center">
            <div className="text-3xl mb-2">{categoryIcons[activeCategory] ?? "📚"}</div>
            <h2 className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
              {activeCategory}
            </h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              {totalCards} cards · Tap a card to reveal the Thai
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xl mb-6">
            <div className="flex justify-between text-xs mb-1.5"
              style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              <span>Progress</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: progressPct === 100 ? "oklch(0.50 0.11 195)" : "oklch(0.60 0.14 65)"
                }}
              />
            </div>
          </div>

          {/* Card or completion screen */}
          {showComplete ? (
            <div
              className="w-full max-w-xl rounded-2xl p-10 text-center"
              style={{
                background: "oklch(1 0 0)",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 40px oklch(0.20 0.02 55 / 0.10)"
              }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)", fontWeight: 700 }}>
                Category Complete!
              </h3>
              <p className="text-sm mb-6"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                You've gone through all {totalCards} cards in <strong>{activeCategory}</strong>.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={{
                    background: "var(--secondary)",
                    color: "var(--foreground)",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid var(--border)"
                  }}
                >
                  <RotateCcw size={14} />
                  Restart
                </button>
                {categories.indexOf(activeCategory) < categories.length - 1 && (
                  <button
                    onClick={() => handleCategorySelect(categories[categories.indexOf(activeCategory) + 1])}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                    style={{
                      background: "oklch(0.60 0.14 65)",
                      color: "white",
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  >
                    <CheckCircle2 size={14} />
                    Next Category
                  </button>
                )}
                <button
                  onClick={() => setView("landing")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={{
                    background: "var(--secondary)",
                    color: "var(--foreground)",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid var(--border)"
                  }}
                >
                  All Categories
                </button>
              </div>
            </div>
          ) : (
            currentCard && (
              <FlashCard
                card={currentCard}
                cardNumber={cardIndex + 1}
                totalCards={totalCards}
              />
            )
          )}

          {/* Navigation buttons */}
          {!showComplete && (
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={cardIndex === 0}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                  fontFamily: "'DM Sans', sans-serif",
                  border: "1px solid var(--border)"
                }}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }}>
                {cardIndex + 1} / {totalCards}
              </span>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                style={{
                  background: "oklch(0.60 0.14 65)",
                  color: "white",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          <p className="mt-6 text-xs hidden md:block"
            style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif", opacity: 0.6 }}>
            Use ← → arrow keys to navigate
          </p>
        </main>
      </div>
    </div>
  );
}
