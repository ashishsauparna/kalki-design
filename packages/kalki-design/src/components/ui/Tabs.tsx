"use client";

/* ─────────────────────────────────────────────
 *  Tabs
 *  Underline-style tabs with optional badge counts
 * ───────────────────────────────────────────── */

interface Tab {
  name: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
  rightSlot?: React.ReactNode;
}

export function Tabs({ tabs, activeTab, onChange, className, rightSlot }: TabsProps) {
  return (
    <div className={`flex items-center justify-between px-4 border-b border-[var(--surface-sunken)] ${className ?? ""}`}>
      <div className="flex items-center gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => onChange(tab.name)}
              className={`flex items-center gap-1.5 h-12 px-1 py-3 text-sm transition-colors border-b-2 ${
                isActive
                  ? "border-[var(--text-primary)] text-[var(--text-primary)] font-medium"
                  : "border-transparent text-[var(--text-neutral)] hover:text-[var(--text-primary)]"
              }`}
            >
              {tab.name}
              {tab.count !== undefined && (
                <span
                  className={`inline-flex items-center justify-center min-w-[16px] h-[18px] px-1.5 rounded-full text-xs ${
                    isActive
                      ? "gradient-badge text-[var(--text-inverse-muted)] font-semibold"
                      : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] font-medium"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {rightSlot && <div className="flex items-center shrink-0">{rightSlot}</div>}
    </div>
  );
}
