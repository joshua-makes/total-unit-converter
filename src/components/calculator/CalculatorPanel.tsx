'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Label } from '@/components/ui/Label';
import { CATEGORIES, type Category } from '@/lib/units';
import { CALCULATIONS, type Formula } from '@/lib/calculations';
import { convert } from '@/lib/convert';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';

interface Props {
  category: Category;
  precision: number;
}

function initInputs(formula: Formula | undefined): Record<string, string> {
  if (!formula) return {};
  const result: Record<string, string> = {};
  for (const inp of formula.inputs) {
    if (inp.defaultValue !== undefined) result[inp.id] = String(inp.defaultValue);
  }
  return result;
}

export function CalculatorPanel({ category, precision }: Props) {
  const formulas = useMemo(
    () => CALCULATIONS[category] ?? [],
    [category],
  );
  const [formulaId, setFormulaId] = useState<string>(formulas[0]?.id ?? '');
  const [inputs, setInputs] = useState<Record<string, string>>(() => initInputs(formulas[0]));
  const [outputUnitKey, setOutputUnitKey] = useState<string>(formulas[0]?.outputConvertFromKey ?? '');

  const formula = useMemo(
    () => formulas.find((f) => f.id === formulaId) ?? formulas[0],
    [formulas, formulaId],
  );

  function handleFormulaChange(id: string) {
    const next = formulas.find((f) => f.id === id);
    setFormulaId(id);
    setInputs(initInputs(next));
    setOutputUnitKey(next?.outputConvertFromKey ?? '');
  }

  const numericInputs = useMemo<Record<string, number>>(() => {
    if (!formula) return {};
    const result: Record<string, number> = {};
    for (const inp of formula.inputs) {
      const raw = inputs[inp.id];
      if (raw !== undefined && raw !== '') {
        result[inp.id] = parseFloat(raw);
      } else if (inp.defaultValue !== undefined) {
        result[inp.id] = inp.defaultValue;
      }
    }
    return result;
  }, [inputs, formula]);

  const result = useMemo(() => {
    if (!formula) return null;
    return formula.compute(numericInputs);
  }, [formula, numericInputs]);

  const convertedResult = useMemo<number | null>(() => {
    if (result === null || !formula?.outputConvertCategory || !formula?.outputConvertFromKey) return result;
    if (!outputUnitKey || outputUnitKey === formula.outputConvertFromKey) return result;
    return convert(result, formula.outputConvertFromKey, outputUnitKey, formula.outputConvertCategory as Category);
  }, [result, formula, outputUnitKey]);

  if (formulas.length === 0) {
    return (
      <Card className="p-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
        No calculators available for this category yet.
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0 animate-slide-up">
      {/* ── Formula selector ── */}
      <div className="border-b border-[rgb(var(--border))] p-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--muted-foreground))]">
          Formula
        </p>
        <div className="flex flex-wrap gap-2">
          {formulas.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFormulaChange(f.id)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                f.id === formula?.id
                  ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
                  : 'bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))]',
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {formula && (
        <>
          {/* ── Expression strip ── */}
          <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--muted))]/30 px-5 py-3">
            <code className="text-sm font-mono text-[rgb(var(--primary))]">
              {formula.expression}
            </code>
          </div>

          {/* ── Inputs ── */}
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {formula.inputs.map((inp) => (
                <div key={inp.id} className="space-y-1.5">
                  <Label htmlFor={`calc-${inp.id}`} className="text-sm font-medium">
                    {inp.label}
                    {inp.unit && (
                      <span className="ml-1.5 text-[11px] font-normal text-[rgb(var(--muted-foreground))]">
                        {inp.unit}
                      </span>
                    )}
                  </Label>
                  <Input
                    id={`calc-${inp.id}`}
                    type="number"
                    inputMode="decimal"
                    placeholder={inp.placeholder}
                    min={inp.min}
                    max={inp.max}
                    step={inp.step ?? 'any'}
                    value={inputs[inp.id] ?? ''}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [inp.id]: e.target.value }))
                    }
                    className="h-10"
                  />
                </div>
              ))}
            </div>

            {/* ── Result ── */}
            <div className="mt-5 rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/8 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                  {formula.outputLabel}
                </span>
                {formula.outputConvertCategory && (
                  <Select
                    value={outputUnitKey}
                    onChange={(e) => setOutputUnitKey(e.target.value)}
                    className="h-8 w-auto min-w-[8rem] py-0 text-sm"
                    aria-label="Output unit"
                  >
                    {Object.entries(CATEGORIES[formula.outputConvertCategory as Category].units).map(([key, def]) => (
                      <option key={key} value={key}>{def.label} ({def.symbol})</option>
                    ))}
                  </Select>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tabular-nums text-[rgb(var(--primary))]">
                  {convertedResult !== null
                    ? formatNumber(convertedResult, precision)
                    : <span className="text-base font-normal text-[rgb(var(--muted-foreground))]">Enter values above</span>
                  }
                </span>
                {convertedResult !== null && (
                  <span className="text-sm font-normal text-[rgb(var(--muted-foreground))]">
                    {formula.outputConvertCategory
                      ? CATEGORIES[formula.outputConvertCategory as Category].units[outputUnitKey]?.symbol ?? ''
                      : formula.outputUnit
                    }
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
