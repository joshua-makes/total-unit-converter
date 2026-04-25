'use client';

import { QUICK_CONVERSIONS, type Category } from '@/lib/units';
import { convert } from '@/lib/convert';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

interface QuickConversionsProps {
  category: Category;
  precision: number;
  onSelect: (value: number, from: string, to: string) => void;
}

export function QuickConversions({ category, precision, onSelect }: QuickConversionsProps) {
  const chips = QUICK_CONVERSIONS[category];

  return (
    <div>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]">
        Quick Conversions
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {chips.map((chip) => {
          const result    = convert(chip.value, chip.from, chip.to, category);
          const formatted = formatNumber(result, precision);
          return (
            <button
              key={chip.label}
              onClick={() => onSelect(chip.value, chip.from, chip.to)}
              className={cn(
                'flex items-center justify-between rounded-xl border border-[rgb(var(--border))]',
                'bg-[rgb(var(--card))] px-4 py-3 text-sm text-left transition-all',
                'hover:border-[rgb(var(--primary))] hover:shadow-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]'
              )}
              aria-label={`Quick convert: ${chip.label} = ${formatted}`}
            >
              <span className="font-medium text-[rgb(var(--foreground))]">{chip.label}</span>
              {formatted && (
                <span className="ml-2 font-mono text-xs tabular-nums text-[rgb(var(--primary))]">
                  = {formatted}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
