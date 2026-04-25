import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] py-6 text-center text-sm text-[rgb(var(--muted-foreground))]">
      <Container>
        <p>
          Built with Next.js 15 + Tailwind CSS v4 ·{' '}
          <a
            href="https://github.com/bestacles/total-unit-converter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[rgb(var(--foreground))] transition-colors underline"
          >
            View source
          </a>
        </p>
      </Container>
    </footer>
  );
}
