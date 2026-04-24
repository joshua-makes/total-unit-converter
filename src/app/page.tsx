'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { CategoryTabs } from '@/components/converter/CategoryTabs';
import { ConverterPanel } from '@/components/converter/ConverterPanel';
import { QuickConversions } from '@/components/converter/QuickConversions';
import { PrecisionControl } from '@/components/converter/PrecisionControl';
import { Toast } from '@/components/ui/Toast';
import { type Category, CATEGORIES } from '@/lib/units';
import { loadPrefs, savePrefs } from '@/lib/storage';

const DEFAULT_CATEGORY: Category = 'length';
const DEFAULT_PRECISION = 4;

export default function HomePage() {
  const [category, setCategory] = useState<Category>(DEFAULT_CATEGORY);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');
  const [inputValue, setInputValue] = useState<string>('');
  const [precision, setPrecision] = useState<number>(DEFAULT_PRECISION);
  const [toast, setToast] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

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
      toUnit: units.includes(toUnit) ? toUnit : (units[1] ?? units[0]),
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

  return (
    <div className="flex min-h-screen flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Header />
      <main className="flex-1 py-8">
        <Container>
          <CategoryTabs value={category} onChange={handleCategoryChange} />
          <div className="mt-6">
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
          </div>
          <div className="mt-4">
            <PrecisionControl value={precision} onChange={setPrecision} />
          </div>
          <div className="mt-6">
            <QuickConversions
              category={category}
              precision={precision}
              onSelect={handleQuickConversion}
            />
          </div>
        </Container>
      </main>
      <Footer />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
