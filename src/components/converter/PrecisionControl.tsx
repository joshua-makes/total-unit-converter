'use client';

interface PrecisionControlProps {
  value: number;
  onChange: (precision: number) => void;
}

const OPTIONS = [0, 1, 2, 3, 4, 5, 6, 8, 10];

export function PrecisionControl({ value, onChange }: PrecisionControlProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]">
        Decimal places
      </span>
      <div className="flex flex-wrap gap-1.5">
        {OPTIONS.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-pressed={value === n}
            className={[
              'h-7 min-w-[1.75rem] rounded-md px-2 text-xs font-mono font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
              value === n
                ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]',
            ].join(' ')}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
