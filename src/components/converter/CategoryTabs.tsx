'use client';

import { cn } from '@/lib/utils';
import { CATEGORIES, type Category } from '@/lib/units';

interface CategoryTabsProps {
  value: Category;
  onChange: (cat: Category) => void;
}

const CATEGORY_ICONS: Record<Category, string> = {
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

export function CategoryTabs({ value, onChange }: CategoryTabsProps) {
  return (
    <div role="tablist" aria-label="Unit categories" className="flex gap-2 overflow-x-auto pb-1">
      {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
        <button
          key={cat}
          role="tab"
          aria-selected={value === cat}
          onClick={() => onChange(cat)}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
            value === cat
              ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
              : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--border))]'
          )}
        >
          <span>{CATEGORY_ICONS[cat]}</span>
          <span>{CATEGORIES[cat].name}</span>
        </button>
      ))}
    </div>
  );
}
