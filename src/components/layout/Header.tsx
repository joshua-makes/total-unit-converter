import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))]/90 backdrop-blur-sm">
      <Container className="flex h-full items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--primary))] text-sm text-[rgb(var(--primary-foreground))] font-bold select-none">
            ⚡
          </div>
          <span className="text-base font-bold tracking-tight">
            Quick<span className="text-[rgb(var(--primary))]">Unit</span>Swap
          </span>
        </div>

        {/* Search trigger */}
        <button
          type="button"
          onClick={onSearchOpen}
          aria-label="Search units and formulas"
          className="flex flex-1 max-w-xs items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))]/60 px-3 py-1.5 text-sm text-[rgb(var(--muted-foreground))] transition-colors hover:border-[rgb(var(--foreground))]/30 hover:text-[rgb(var(--foreground))]"
        >
          <svg className="h-3.5 w-3.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 18a7.5 7.5 0 006.15-3.15z" />
          </svg>
          <span className="flex-1 text-left text-xs">Search units &amp; formulas…</span>
          <kbd className="hidden items-center gap-0.5 rounded border border-[rgb(var(--border))] px-1 py-0.5 text-[10px] sm:inline-flex">
            <span>⌘</span><span>K</span>
          </kbd>
        </button>

        <div className="flex items-center gap-1 shrink-0">
          <ThemeToggle />
          <a
            href="https://github.com/joshua-makes/total-unit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--foreground))]"
            aria-label="View source on GitHub"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </Container>
    </header>
  );
}
