'use client';

import { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

/**
 * Shell component - Base layout wrapper with theme support
 * The theme toggle will be added in Prompt 02
 */
export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Header placeholder for future navigation */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xl font-bold">Ânima</span>
          {/* Theme toggle will be added here in Prompt 02 */}
          <div className="h-8 w-8 rounded-full bg-[var(--color-bg-tertiary)]" />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer placeholder */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-4xl px-4 py-4 text-center text-sm text-[var(--color-text-muted)] sm:px-6 lg:px-8">
          Ânima MVP • Em desenvolvimento
        </div>
      </footer>
    </div>
  );
}

export default Shell;
