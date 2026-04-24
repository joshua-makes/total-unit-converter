import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--background))] backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[rgb(var(--primary))]">⚡</span>
            <span className="text-lg font-semibold">Total Unit Converter</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="https://github.com/bestacles/total-unit-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
