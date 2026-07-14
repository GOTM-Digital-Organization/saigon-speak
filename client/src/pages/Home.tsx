/**
 * Home page — Saigon Speak
 * Design: Warm Colonial Linen aesthetic
 * Layout: Left sidebar (categories) + Right main area (flashcard study)
 * Mobile: Full-screen card with bottom category picker
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
          style={{ background: "var(--cream)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <img src="/manus-storage/saigon-logo_49b4357c.png" alt="Saigon Speak" className="w-9 h-9 object-contain" />
            <div>
              <h1 className="text-xl font-bold leading-none"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                Saigon Speak
              </h1>
              <p className="text-xs leading-none mt-0.5"
                style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                Southern Vietnamese Flashcards
              </p>
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/manus-storage/saigon-hero_7e351c38.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "oklch(0.22 0.02 60 / 0.45)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-28">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-5"
              style={{
                background: "oklch(0.78 0.14 80 / 0.25)",
                color: "oklch(0.95 0.06 80)",
                border: "1px solid oklch(0.78 0.14 80 / 0.4)",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.14em"
              }}>
              Ho Chi Minh City Dialect
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-2xl"
              style={{ fontFamily: "'Playfair Display', serif", textShadow: "0 2px 12px oklch(0.1 0 0 / 0.4)" }}>
              Learn Vietnamese the way Saigon actually speaks it.
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-xl"
              style={{ color: "oklch(0.90 0.02 75)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
              Not textbook phrases. Real Southern dialect — the words you'll actually hear in cafés, on Grab bikes, and in daily life.
            </p>
            <button
              onClick={() => handleCategorySelect(categories[0])}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold transition-all active:scale-95 hover:opacity-90"
              style={{
                background: "var(--terracotta)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 4px 20px oklch(0.52 0.14 40 / 0.5)"
              }}
            >
              <BookOpen size={18} />
              Start with Greetings
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap gap-6 justify-center md:justify-start">
            {[
              { label: "Categories", value: "20" },
              { label: "Flashcards", value: "499" },
              { label: "Southern Dialect", value: "100%" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--terracotta)" }}>
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
        <div style={{ background: "oklch(0.52 0.14 40 / 0.05)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-xs font-medium tracking-widest uppercase mb-3"
                  style={{ color: "var(--terracotta)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em" }}>
                  What every card looks like
                </div>
                <h3 className="text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                  Real Southern Vietnamese,<br />not textbook language.
                </h3>
                <p className="text-sm leading-relaxed mb-4"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                  Every card shows you the Vietnamese script with tone marks, a phonetic pronunciation guide written for English speakers, a natural example sentence, and a note on when locals actually use it.
                </p>
                <div className="flex flex-col gap-2 text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}>
                  {[
                    ["Vietnamese", "Chào anh — with full tone marks"],
                    ["Pronunciation", "/chow ahn/ — how you'd say it"],
                    ["Example", "Chào anh, khỏe hông? → Hey, how are you?"],
                    ["Notes", "How locals actually greet an older man"],
                  ].map(([label, desc]) => (
                    <div key={label} className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: "var(--terracotta)" }} />
                      <span><strong>{label}:</strong> {desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample card */}
              <div className="w-full md:w-72 flex-shrink-0">
                <div className="rounded-2xl p-6 flex flex-col gap-3"
                  style={{
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 32px oklch(0.22 0.02 60 / 0.12)"
                  }}>
                  <div className="text-xs font-medium tracking-widest uppercase"
                    style={{ color: "var(--terracotta-light)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em" }}>
                    Southern Vietnamese
                  </div>
                  <div className="text-3xl font-semibold"
                    style={{ fontFamily: "'Playfair Display', serif", color: "var(--vietnamese)" }}>
                    Chào anh
                  </div>
                  <div className="text-sm px-3 py-1 rounded-lg self-start"
                    style={{ fontFamily: "'DM Mono', monospace", color: "var(--terracotta)", background: "oklch(0.52 0.14 40 / 0.08)" }}>
                    /chow ahn/
                  </div>
                  <div style={{ height: "1px", background: "var(--border)" }} />
                  <div>
                    <div className="text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>Example</div>
                    <div className="text-sm italic"
                      style={{ fontFamily: "'Playfair Display', serif", color: "var(--vietnamese-light)" }}>
                      Chào anh, khỏe hông?
                    </div>
                    <div className="text-xs mt-0.5"
                      style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
                      Hey, how are you?
                    </div>
                  </div>
                  <div className="px-3 py-2 rounded-lg text-xs"
                    style={{ background: "oklch(0.78 0.14 80 / 0.12)", color: "oklch(0.38 0.08 70)", borderLeft: "3px solid var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>
                    How locals actually greet an older man — not the textbook "Xin chào"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
          <h3 className="text-xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
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
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px oklch(0.22 0.02 60 / 0.06)"
                  }}
                >
                  {/* Terracotta category number badge instead of emoji */}
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-sm font-bold"
                    style={{
                      background: pct === 100 ? "oklch(0.78 0.14 80 / 0.15)" : "oklch(0.52 0.14 40 / 0.10)",
                      color: pct === 100 ? "oklch(0.55 0.12 75)" : "var(--terracotta)",
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
                        background: pct === 100 ? "var(--gold)" : "var(--terracotta)",
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
          style={{ borderColor: "var(--border)", background: "var(--cream)" }}>
          <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
            Saigon Speak — Everyday Southern Vietnamese for real life in Hồ Chí Minh City
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
          background: "var(--cream)",
          borderColor: "var(--border)",
          boxShadow: "0 1px 8px oklch(0.22 0.02 60 / 0.06)"
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("landing")}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
          >
            <img src="/manus-storage/saigon-logo_49b4357c.png" alt="Saigon Speak" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold hidden sm:block"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Saigon Speak
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
            style={{ background: "oklch(0.52 0.14 40 / 0.10)" }}>
            <span className="text-base">{categoryIcons[activeCategory] ?? "📚"}</span>
            <span className="text-sm font-medium"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--terracotta)" }}>
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
              style={{ background: "oklch(0.22 0.02 60 / 0.4)", zIndex: -1 }}
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div
            className="h-full overflow-hidden"
            style={{
              background: "var(--cream)",
              borderRight: "1px solid var(--border)",
              boxShadow: "2px 0 16px oklch(0.22 0.02 60 / 0.06)"
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
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              {activeCategory}
            </h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif" }}>
              {totalCards} cards · Tap a card to reveal the Vietnamese
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
                  background: progressPct === 100 ? "var(--gold)" : "var(--terracotta)"
                }}
              />
            </div>
          </div>

          {/* Card or completion screen */}
          {showComplete ? (
            <div
              className="w-full max-w-xl rounded-2xl p-10 text-center"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 40px oklch(0.22 0.02 60 / 0.10)"
              }}
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
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
                      background: "var(--terracotta)",
                      color: "var(--primary-foreground)",
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
                  background: "var(--terracotta)",
                  color: "var(--primary-foreground)",
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
