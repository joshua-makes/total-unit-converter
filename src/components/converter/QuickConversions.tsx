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
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
        Quick Conversions
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => {
          const result = convert(chip.value, chip.from, chip.to, category);
          const formatted = formatNumber(result, precision);
          return (
            <button
              key={chip.label}
              onClick={() => onSelect(chip.value, chip.from, chip.to)}
              className={cn(
                'rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))]',
                'px-3 py-1.5 text-xs transition-colors',
                'hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]'
              )}
              aria-label={`Quick convert: ${chip.label} = ${formatted}`}
            >
              <span className="font-medium">{chip.label}</span>
              {formatted && (
                <span className="ml-1 text-[rgb(var(--muted-foreground))]">= {formatted}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
