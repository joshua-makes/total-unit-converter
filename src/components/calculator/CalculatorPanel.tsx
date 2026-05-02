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

function initInputUnits(formula: Formula | undefined): Record<string, string> {
  if (!formula) return {};
  const result: Record<string, string> = {};
  for (const inp of formula.inputs) {
    if (inp.convertCategory && inp.convertBaseKey) {
      result[inp.id] = inp.convertBaseKey;
    }
  }
  return result;
}

/**
 * Finds which Category contains `unitKey` as a unit, enabling output conversion.
 * Returns null for composite/derived units (e.g. "kg/m²", "N·m", "%").
 */
function findOutputConversion(
  unitKey: string,
): { category: Category; baseKey: string } | null {
  for (const [catKey, catDef] of Object.entries(CATEGORIES) as Array<
    [Category, (typeof CATEGORIES)[Category]]
  >) {
    if (Object.prototype.hasOwnProperty.call(catDef.units, unitKey)) {
      return { category: catKey, baseKey: unitKey };
    }
  }
  return null;
}

export function CalculatorPanel({ category, precision }: Props) {
  const formulas = useMemo(
    () => CALCULATIONS[category] ?? [],
    [category],
  );
  const [formulaId, setFormulaId] = useState<string>(formulas[0]?.id ?? '');
  const [inputs, setInputs] = useState<Record<string, string>>(() => initInputs(formulas[0]));
  const [inputUnits, setInputUnits] = useState<Record<string, string>>(() => initInputUnits(formulas[0]));
  const [outputUnit, setOutputUnit] = useState<string>(formulas[0]?.outputUnit ?? '');

  const formula = useMemo(
    () => formulas.find((f) => f.id === formulaId) ?? formulas[0],
    [formulas, formulaId],
  );

  function handleFormulaChange(id: string) {
    const next = formulas.find((f) => f.id === id);
    setFormulaId(id);
    setInputs(initInputs(next));
    setInputUnits(initInputUnits(next));
    setOutputUnit(next?.outputUnit ?? '');
  }

  const numericInputs = useMemo<Record<string, number>>(() => {
    if (!formula) return {};
    const result: Record<string, number> = {};
    for (const inp of formula.inputs) {
      const raw = inputs[inp.id];
      let num: number | undefined;
      if (raw !== undefined && raw !== '') {
        num = parseFloat(raw);
      } else if (inp.defaultValue !== undefined) {
        num = inp.defaultValue;
      }
      if (num !== undefined) {
        // Auto-convert from selected unit to the base unit compute() expects
        if (inp.convertCategory && inp.convertBaseKey) {
          const selectedUnit = inputUnits[inp.id] ?? inp.convertBaseKey;
          if (selectedUnit !== inp.convertBaseKey && isFinite(num)) {
            num = convert(num, selectedUnit, inp.convertBaseKey, inp.convertCategory as Category);
          }
        }
        result[inp.id] = num;
      }
    }
    return result;
  }, [inputs, inputUnits, formula]);

  const result = useMemo(() => {
    if (!formula) return null;
    return formula.compute(numericInputs);
  }, [formula, numericInputs]);

  const outputConversion = useMemo(
    () => (formula ? findOutputConversion(formula.outputUnit) : null),
    [formula],
  );

  const displayResult = useMemo(() => {
    if (result === null || !outputConversion || outputUnit === outputConversion.baseKey) {
      return result;
    }
    return convert(result, outputConversion.baseKey, outputUnit, outputConversion.category);
  }, [result, outputConversion, outputUnit]);

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
                    {!inp.convertCategory && inp.unit && (
                      <span className="ml-1.5 text-[11px] font-normal text-[rgb(var(--muted-foreground))]">
                        {inp.unit}
                      </span>
                    )}
                  </Label>
                  {inp.convertCategory ? (
                    <div className="flex gap-2">
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
                        className="h-10 min-w-0 flex-1"
                      />
                      <Select
                        value={inputUnits[inp.id] ?? inp.convertBaseKey ?? ''}
                        onChange={(e) =>
                          setInputUnits((prev) => ({ ...prev, [inp.id]: e.target.value }))
                        }
                        className="h-10 w-auto max-w-[9rem] shrink-0 text-xs"
                        aria-label={`Unit for ${inp.label}`}
                      >
                        {Object.entries(CATEGORIES[inp.convertCategory as Category].units).map(([key, def]) => (
                          <option key={key} value={key}>{def.symbol}</option>
                        ))}
                      </Select>
                    </div>
                  ) : (
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
                  )}
                </div>
              ))}
            </div>

            {/* ── Result ── */}
            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[rgb(var(--primary))]/25 bg-[rgb(var(--primary))]/8 px-5 py-4">
              <span className="text-sm font-medium text-[rgb(var(--muted-foreground))]">
                {formula.outputLabel}
              </span>
              {result !== null ? (
                <div className="flex items-center gap-2">
                  <span className="text-right text-2xl font-bold tabular-nums text-[rgb(var(--primary))]">
                    {formatNumber((displayResult ?? result) as number, precision)}
                  </span>
                  {outputConversion ? (
                    <Select
                      value={outputUnit}
                      onChange={(e) => setOutputUnit(e.target.value)}
                      className="h-9 w-auto max-w-[9rem] shrink-0 text-xs"
                      aria-label="Output unit"
                    >
                      {Object.entries(CATEGORIES[outputConversion.category].units).map(([key, def]) => (
                        <option key={key} value={key}>{def.symbol}</option>
                      ))}
                    </Select>
                  ) : (
                    formula.outputUnit && (
                      <span className="ml-1.5 text-sm font-normal text-[rgb(var(--muted-foreground))]">
                        {formula.outputUnit}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <span className="text-base font-normal text-[rgb(var(--muted-foreground))]">
                  Enter values above
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
