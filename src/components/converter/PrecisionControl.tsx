'use client';

interface PrecisionControlProps {
  value: number;
  onChange: (precision: number) => void;
}

export function PrecisionControl({ value, onChange }: PrecisionControlProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="precision-slider"
        className="shrink-0 text-sm font-medium text-[rgb(var(--muted-foreground))]"
      >
        Decimal places:
      </label>
      <input
        id="precision-slider"
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="h-2 w-full max-w-xs cursor-pointer accent-indigo-500"
        aria-valuemin={0}
        aria-valuemax={10}
        aria-valuenow={value}
        aria-label="Decimal precision"
      />
      <span className="w-4 shrink-0 text-center text-sm font-mono font-medium">{value}</span>
    </div>
  );
}
