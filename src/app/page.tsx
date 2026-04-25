'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryNav, CATEGORY_ICONS } from '@/components/converter/CategoryTabs';
import { ConverterPanel } from '@/components/converter/ConverterPanel';
import { QuickConversions } from '@/components/converter/QuickConversions';
import { PrecisionControl } from '@/components/converter/PrecisionControl';
import { CalculatorPanel } from '@/components/calculator/CalculatorPanel';
import { Toast } from '@/components/ui/Toast';
import { type Category, CATEGORIES } from '@/lib/units';
import { loadPrefs, savePrefs } from '@/lib/storage';
import { cn } from '@/lib/utils';

const DEFAULT_CATEGORY: Category = 'length';
const DEFAULT_PRECISION = 4;

export default function HomePage() {
  const [category, setCategory]     = useState<Category>(DEFAULT_CATEGORY);
  const [fromUnit, setFromUnit]     = useState<string>('m');
  const [toUnit, setToUnit]         = useState<string>('km');
  const [inputValue, setInputValue] = useState<string>('');
  const [precision, setPrecision]   = useState<number>(DEFAULT_PRECISION);
  const [toast, setToast]           = useState<string | null>(null);
  const [mounted, setMounted]       = useState(false);
  const [mode, setMode]             = useState<'convert' | 'calculate'>('convert');

  useEffect(() => {
    setMounted(true);
    const prefs = loadPrefs();
    if (prefs.category && prefs.category in CATEGORIES) {
      const cat = prefs.category as Category;
      setCategory(cat);
      const units = Object.keys(CATEGORIES[cat].units);
      setFromUnit(prefs.fromUnit && units.includes(prefs.fromUnit) ? prefs.fromUnit : units[0]);
      setToUnit(prefs.toUnit && units.includes(prefs.toUnit) ? prefs.toUnit : (units[1] ?? units[0]));
    }
    if (typeof prefs.precision === 'number') setPrecision(prefs.precision);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const units = Object.keys(CATEGORIES[category].units);
    savePrefs({
      category,
      fromUnit: units.includes(fromUnit) ? fromUnit : units[0],
      toUnit:   units.includes(toUnit)   ? toUnit   : (units[1] ?? units[0]),
      precision,
    });
  }, [category, fromUnit, toUnit, precision, mounted]);

  const handleCategoryChange = useCallback((cat: Category) => {
    setCategory(cat);
    const units = Object.keys(CATEGORIES[cat].units);
    setFromUnit(units[0]);
    setToUnit(units[1] ?? units[0]);
    setInputValue('');
  }, []);

  const handleQuickConversion = useCallback((value: number, from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
    setInputValue(String(value));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  const unitCount = Object.keys(CATEGORIES[category].units).length;

  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Header />

      {/* ── Body: sidebar + main ── */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* CategoryNav renders:
            - <aside> (desktop sidebar, hidden on mobile)
            - <div>   (mobile picker, hidden on desktop)
            Both are flex children; CSS hides the irrelevant one per breakpoint. */}
        <CategoryNav value={category} onChange={handleCategoryChange} />

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6 lg:p-8">

            {/* Category heading */}
            <div className="flex items-center gap-3 animate-pop-in">
              <span className="text-4xl leading-none" aria-hidden="true">
                {CATEGORY_ICONS[category]}
              </span>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold leading-tight">{CATEGORIES[category].name}</h1>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  {unitCount} unit{unitCount !== 1 ? 's' : ''} available
                </p>
              </div>

              {/* Convert / Calculate mode toggle */}
              <div className="flex rounded-xl bg-[rgb(var(--muted))] p-1 gap-0.5 shrink-0" role="tablist" aria-label="Mode">
                {(['convert', 'calculate'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => setMode(m)}
                    className={cn(
                      'rounded-lg px-3 py-1 text-sm font-medium capitalize transition-colors',
                      mode === m
                        ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm'
                        : 'text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]',
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Main panel: Converter or Calculator */}
            {mode === 'convert' ? (
              <ConverterPanel
                category={category}
                fromUnit={fromUnit}
                toUnit={toUnit}
                inputValue={inputValue}
                precision={precision}
                onFromUnitChange={setFromUnit}
                onToUnitChange={setToUnit}
                onInputChange={setInputValue}
                onCopied={showToast}
              />
            ) : (
              <CalculatorPanel
                key={category}
                category={category}
                precision={precision}
              />
            )}

            {/* Precision control — always visible */}
            <PrecisionControl value={precision} onChange={setPrecision} />

            {/* Quick conversions — only in convert mode */}
            {mode === 'convert' && (
              <QuickConversions
                category={category}
                precision={precision}
                onSelect={handleQuickConversion}
              />
            )}

          </div>
        </main>
      </div>

      <Footer />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
