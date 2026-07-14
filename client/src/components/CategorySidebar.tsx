/**
 * CategorySidebar — Bangkok Speak
 * Design: Temple Gold & Teal
 * Left sidebar for desktop, bottom sheet trigger for mobile
 */

import { categories, categoryIcons, getCardsByCategory } from "@/lib/flashcards";

interface CategorySidebarProps {
  activeCategory: string;
  onSelect: (category: string) => void;
  progress: Record<string, number>;
}

export default function CategorySidebar({ activeCategory, onSelect, progress }: CategorySidebarProps) {
  return (
    <nav className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-3">
        <p className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "var(--muted-foreground)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em" }}>
          Categories
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4" style={{ scrollbarWidth: "thin" }}>
        {categories.map((cat) => {
          const total = getCardsByCategory(cat).length;
          const seen = progress[cat] ?? 0;
          const pct = total > 0 ? Math.round((seen / total) * 100) : 0;
          const isActive = cat === activeCategory;

          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className="w-full text-left rounded-xl px-3 py-2.5 mb-0.5 transition-all duration-150 group"
              style={{
                background: isActive ? "oklch(0.60 0.14 65 / 0.10)" : "transparent",
                borderLeft: isActive ? "3px solid var(--primary)" : "3px solid transparent",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg leading-none flex-shrink-0" style={{ lineHeight: 1 }}>
                  {categoryIcons[cat] ?? "📚"}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm leading-snug truncate"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    {cat}
                  </div>
                  {/* Progress bar */}
                  <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100 ? "oklch(0.50 0.11 195)" : "var(--primary)",
                        opacity: pct === 0 ? 0 : 1
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs flex-shrink-0"
                  style={{ color: "var(--muted-foreground)", fontFamily: "'DM Mono', monospace" }}>
                  {seen}/{total}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
