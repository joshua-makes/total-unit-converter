const KEY = 'tuc:prefs';

export interface Prefs {
  category: string;
  fromUnit: string;
  toUnit: string;
  precision: number;
}

export function loadPrefs(): Partial<Prefs> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<Prefs>;
  } catch {
    return {};
  }
}

export function savePrefs(prefs: Prefs): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}
