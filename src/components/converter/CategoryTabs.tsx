'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CATEGORIES, type Category } from '@/lib/units';

// ── Shared metadata ───────────────────────────────────────────────────────────

export const CATEGORY_ICONS: Record<Category, string> = {
  length:      '📏',
  area:        '⬛',
  volume:      '🧪',
  weight:      '⚖️',
  temperature: '🌡️',
  speed:       '🚀',
  time:        '⏱️',
  angle:       '📐',
  frequency:   '🔁',
  pressure:    '🔧',
  energy:      '⚡',
  power:       '💡',
  force:       '💪',
  data:        '💾',
  fuel:        '⛽',
  voltage:     '🔌',
  current:     '〰️',
  resistance:  '🔗',
  capacitance: '🔋',
  charge:      '🪫',
};

interface CategoryGroup {
  label: string;
  items: Category[];
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { label: 'Physical',          items: ['length', 'area', 'volume', 'weight', 'temperature'] },
  { label: 'Motion & Time',     items: ['speed', 'time', 'angle', 'frequency'] },
  { label: 'Energy & Forces',   items: ['energy', 'power', 'force', 'pressure'] },
  { label: 'Electrical',        items: ['voltage', 'current', 'resistance', 'capacitance', 'charge'] },
  { label: 'Computing & Other', items: ['data', 'fuel'] },
];

// ── Props ─────────────────────────────────────────────────────────────────────

interface Props {
  value: Category;
  onChange: (cat: Category) => void;
}

// ── Desktop sidebar content ───────────────────────────────────────────────────

function SidebarContent({ value, onChange }: Props) {
  return (
    <nav aria-label="Unit categories" className="py-3">
      {CATEGORY_GROUPS.map((group) => (
        <div key={group.label} className="mb-1">
          <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))] select-none">
            {group.label}
          </p>
          {group.items.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={value === cat}
              onClick={() => onChange(cat)}
              className={cn(
                'flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[rgb(var(--ring))]',
                value === cat
                  ? 'border-r-2 border-[rgb(var(--primary))] bg-[rgb(var(--nav-active-bg))] text-[rgb(var(--nav-active-fg))] font-semibold'
                  : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
              )}
            >
              <span className="shrink-0 text-base leading-none">{CATEGORY_ICONS[cat]}</span>
              <span className="truncate">{CATEGORIES[cat].name}</span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function CategoryNav({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-56 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar))]">
        <SidebarContent value={value} onChange={onChange} />
      </aside>

      {/* Mobile picker */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            'flex w-full items-center justify-between rounded-xl border border-[rgb(var(--border))]',
            'bg-[rgb(var(--card))] px-4 py-3 shadow-sm text-sm font-medium',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
            'transition-colors hover:border-[rgb(var(--primary))]'
          )}
        >
          <span className="flex items-center gap-2.5">
            <span className="text-base">{CATEGORY_ICONS[value]}</span>
            <span>{CATEGORIES[value].name}</span>
          </span>
          <svg
            className={cn(
              'h-4 w-4 text-[rgb(var(--muted-foreground))] transition-transform duration-200',
              open && 'rotate-180'
            )}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="mt-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 shadow-lg animate-slide-up">
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.label} className="mb-3 last:mb-0">
                <p className="mb-1.5 px-1 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]">
                  {group.label}
                </p>
                <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {group.items.map((cat) => (
                    <button
                      key={cat}
                      role="option"
                      aria-selected={value === cat}
                      onClick={() => { onChange(cat); setOpen(false); }}
                      className={cn(
                        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
                        value === cat
                          ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] font-medium'
                          : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]'
                      )}
                    >
                      <span className="shrink-0">{CATEGORY_ICONS[cat]}</span>
                      <span className="truncate">{CATEGORIES[cat].name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
