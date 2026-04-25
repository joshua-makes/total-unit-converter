'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { CATEGORIES, type Category } from '@/lib/units';
import { CALCULATIONS } from '@/lib/calculations';
import { CATEGORY_ICONS } from '@/components/converter/CategoryTabs';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SearchResult =
  | { type: 'category'; category: Category }
  | { type: 'unit'; category: Category; unitKey: string }
  | { type: 'formula'; category: Category; formulaId: string };

interface IndexEntry {
  result: SearchResult;
  searchText: string;
  primaryLabel: string;
  secondaryLabel: string;
  badge: 'category' | 'unit' | 'formula';
}

// ── Search index (built once at module load) ──────────────────────────────────

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const [cat, def] of Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][]) {
    // Category
    entries.push({
      result: { type: 'category', category: cat },
      searchText: def.name.toLowerCase(),
      primaryLabel: def.name,
      secondaryLabel: 'Category',
      badge: 'category',
    });

    // Each unit
    for (const [key, unit] of Object.entries(def.units)) {
      entries.push({
        result: { type: 'unit', category: cat, unitKey: key },
        searchText: `${unit.label} ${unit.symbol} ${def.name}`.toLowerCase(),
        primaryLabel: unit.label,
        secondaryLabel: `${def.name} · ${unit.symbol}`,
        badge: 'unit',
      });
    }
  }

  // Formulas
  for (const [cat, formulas] of Object.entries(CALCULATIONS) as [Category, NonNullable<(typeof CALCULATIONS)[Category]>][]) {
    if (!formulas) continue;
    for (const formula of formulas) {
      entries.push({
        result: { type: 'formula', category: cat, formulaId: formula.id },
        searchText: `${formula.name} ${CATEGORIES[cat].name} calculator`.toLowerCase(),
        primaryLabel: formula.name,
        secondaryLabel: `${CATEGORIES[cat].name} · Calculator`,
        badge: 'formula',
      });
    }
  }

  return entries;
}

const INDEX = buildIndex();

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (result: SearchResult) => void;
}

export function SearchOverlay({ open, onClose, onSelect }: Props) {
  const [query, setQuery]       = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef  = useRef<HTMLInputElement>(null);
  const listRef   = useRef<HTMLUListElement>(null);

  // Focus / reset when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      // Small delay so the element is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo<IndexEntry[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return INDEX.filter((e) => e.searchText.includes(q)).slice(0, 24);
  }, [query]);

  useEffect(() => setActiveIdx(0), [results]);

  // Scroll active item into view
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      commit(results[activeIdx]);
    }
  }

  function commit(entry: IndexEntry) {
    onSelect(entry.result);
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
      onMouseDown={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--background))] shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] px-4 py-3">
          <svg
            className="h-4 w-4 shrink-0 text-[rgb(var(--muted-foreground))]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 18a7.5 7.5 0 006.15-3.15z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search units, categories, formulas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[rgb(var(--muted-foreground))]"
            aria-label="Search"
            aria-autocomplete="list"
          />
          <kbd className="hidden items-center rounded border border-[rgb(var(--border))] px-1.5 py-0.5 text-[10px] text-[rgb(var(--muted-foreground))] sm:inline-flex">
            ESC
          </kbd>
        </div>

        {/* Empty state */}
        {!query.trim() && (
          <p className="px-4 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
            Type to search conversions and calculators
          </p>
        )}

        {/* Results */}
        {query.trim() && (
          <ul ref={listRef} role="listbox" className="max-h-80 overflow-y-auto py-1.5">
            {results.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-[rgb(var(--muted-foreground))]">
                No results for &ldquo;{query}&rdquo;
              </li>
            ) : (
              results.map((entry, i) => (
                <li
                  key={`${entry.result.type}-${entry.result.category}-${'unitKey' in entry.result ? entry.result.unitKey : 'formulaId' in entry.result ? entry.result.formulaId : ''}`}
                  role="option"
                  aria-selected={i === activeIdx}
                  data-active={i === activeIdx}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseDown={() => commit(entry)}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                    i === activeIdx ? 'bg-[rgb(var(--muted))]' : '',
                  )}
                >
                  <span className="w-6 shrink-0 text-center text-xl leading-none" aria-hidden="true">
                    {CATEGORY_ICONS[entry.result.category]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{entry.primaryLabel}</p>
                    <p className="truncate text-xs text-[rgb(var(--muted-foreground))]">{entry.secondaryLabel}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      entry.badge === 'category' && 'bg-[rgb(var(--primary))]/15 text-[rgb(var(--primary))]',
                      entry.badge === 'unit'     && 'bg-sky-500/15 text-sky-600 dark:text-sky-400',
                      entry.badge === 'formula'  && 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
                    )}
                  >
                    {entry.badge}
                  </span>
                </li>
              ))
            )}
          </ul>
        )}

        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-[rgb(var(--border))] px-4 py-2 text-[10px] text-[rgb(var(--muted-foreground))]">
          <span><kbd className="font-sans">↑↓</kbd> navigate</span>
          <span><kbd className="font-sans">↵</kbd> select</span>
          <span><kbd className="font-sans">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
