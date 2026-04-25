'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tuc:theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tuc:theme', 'light');
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </Button>
  );
}
