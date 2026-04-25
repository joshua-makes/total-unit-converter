'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { CATEGORIES, type Category } from '@/lib/units';
import { convert } from '@/lib/convert';
import { formatNumber } from '@/lib/format';
import { UNIT_PRESETS } from '@/lib/presets';
import { cn } from '@/lib/utils';

interface ConverterPanelProps {
  category: Category;
  fromUnit: string;
  toUnit: string;
  inputValue: string;
  precision: number;
  onFromUnitChange: (unit: string) => void;
  onToUnitChange: (unit: string) => void;
  onInputChange: (value: string) => void;
  onCopied: (msg: string) => void;
}

export function ConverterPanel({
  category,
  fromUnit,
  toUnit,
  inputValue,
  precision,
  onFromUnitChange,
  onToUnitChange,
  onInputChange,
  onCopied,
}: ConverterPanelProps) {
  const units = CATEGORIES[category].units;
  const unitKeys = Object.keys(units);
  const presets = UNIT_PRESETS[category];
  const activePreset = presets?.find((p) => p.from === fromUnit && p.to === toUnit) ?? null;

  const result = useMemo(() => {
    if (inputValue === '' || inputValue === '-') return '';
    const num = parseFloat(inputValue);
    if (isNaN(num)) return '';
    const converted = convert(num, fromUnit, toUnit, category);
    return formatNumber(converted, precision);
  }, [inputValue, fromUnit, toUnit, category, precision]);

  const handleSwap = () => {
    onFromUnitChange(toUnit);
    onToUnitChange(fromUnit);
    if (result !== '') onInputChange(result);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      onCopied('Copied!');
    } catch {
      onCopied('Copy failed');
    }
  };

  const fromSymbol = units[fromUnit]?.symbol ?? fromUnit;
  const toSymbol   = units[toUnit]?.symbol   ?? toUnit;

  return (
    <Card className="overflow-hidden p-0">
      {/* ── Unit system presets strip ── */}
      {presets && presets.length > 0 && (
        <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 px-4 py-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]">Common pairings</p>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => {
              const isActive = preset.from === fromUnit && preset.to === toUnit;
              return (
                <button
                  key={`${preset.from}-${preset.to}`}
                  type="button"
                  onClick={() => {
                    onFromUnitChange(preset.from);
                    onToUnitChange(preset.to);
                  }}
                  className={cn(
                    'rounded-lg px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
                    isActive
                      ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                      : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]',
                  )}
                  aria-pressed={isActive}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 divide-y divide-[rgb(var(--border))] sm:grid-cols-[1fr_44px_1fr] sm:divide-x sm:divide-y-0">

        {/* ── FROM ── */}
        <div className="space-y-3 p-5">
          <Label
            htmlFor="from-unit"
            className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]"
          >
            From
          </Label>
          <Select
            id="from-unit"
            value={fromUnit}
            onChange={(e) => onFromUnitChange(e.target.value)}
            aria-label="From unit"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {units[key].label} ({units[key].symbol})
              </option>
            ))}
          </Select>
          <Input
            id="from-value"
            type="text"
            inputMode="decimal"
            placeholder="0"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            aria-label={`Value in ${fromSymbol}`}
            className="h-14 text-2xl font-mono font-semibold tracking-tight"
          />
          {fromUnit && (
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))]">{fromSymbol}</p>
          )}
        </div>

        {/* ── SWAP ── */}
        <div className="flex items-center justify-center p-2 sm:p-0">
          <button
            onClick={handleSwap}
            aria-label="Swap units"
            title="Swap units"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))] shadow-sm transition-all hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]"
          >
            <svg
              className="h-4 w-4 rotate-90 sm:rotate-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        {/* ── TO ── */}
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="to-unit"
              className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]"
            >
              To
            </Label>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md px-2 py-0.5 text-xs text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]"
                aria-label="Copy result to clipboard"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            )}
          </div>
          <Select
            id="to-unit"
            value={toUnit}
            onChange={(e) => onToUnitChange(e.target.value)}
            aria-label="To unit"
          >
            {unitKeys.map((key) => (
              <option key={key} value={key}>
                {units[key].label} ({units[key].symbol})
              </option>
            ))}
          </Select>
          <div
            role="status"
            aria-live="polite"
            aria-label={`Result in ${toSymbol}`}
            className="flex h-14 w-full items-center overflow-x-auto rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--muted))] px-3"
          >
            {result
              ? <span className="whitespace-nowrap text-2xl font-mono font-semibold tracking-tight text-[rgb(var(--foreground))]">{result}</span>
              : <span className="text-[rgb(var(--muted-foreground))]">—</span>
            }
          </div>
          {toUnit && (
            <p className="text-xs font-medium text-[rgb(var(--muted-foreground))]">{toSymbol}</p>
          )}
        </div>

      </div>
    </Card>
  );
}
