'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { CATEGORIES, type Category } from '@/lib/units';
import { convert } from '@/lib/convert';
import { formatNumber } from '@/lib/format';

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
    if (result !== '') {
      onInputChange(result);
    }
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
  const toSymbol = units[toUnit]?.symbol ?? toUnit;

  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
        {/* From */}
        <div className="space-y-2">
          <Label htmlFor="from-unit">From</Label>
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
            placeholder="Enter value…"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            aria-label={`Value in ${fromSymbol}`}
          />
        </div>

        {/* Swap */}
        <div className="flex items-center justify-center sm:pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwap}
            aria-label="Swap units"
            title="Swap from/to units"
          >
            ⇄
          </Button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="to-unit">To</Label>
            {result && (
              <button
                onClick={handleCopy}
                className="text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors"
                aria-label="Copy result to clipboard"
              >
                📋 Copy
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
            className="flex h-10 w-full items-center rounded-lg border border-[rgb(var(--input))] bg-[rgb(var(--muted))] px-3 text-sm font-mono"
          >
            {result || <span className="text-[rgb(var(--muted-foreground))]">—</span>}
          </div>
        </div>
      </div>
    </Card>
  );
}
