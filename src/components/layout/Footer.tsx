export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))] py-4">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-1.5 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-[rgb(var(--muted-foreground))]">Total Unit Converter — 20 categories, 181+ units</p>
        <p className="text-xs text-[rgb(var(--muted-foreground))]">
          Built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--foreground))]">
            Next.js 15
          </a>
          {' + '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--foreground))]">
            Tailwind v4
          </a>
          {' · '}
          <a href="https://github.com/bestacles/total-unit-converter" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[rgb(var(--foreground))]">
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
