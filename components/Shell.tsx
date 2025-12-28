'use client';

import { ReactNode } from 'react';
import { ThemeToggle } from '@/components/theme';
import { Separator } from '@/components/ui/separator';

interface ShellProps {
  children: ReactNode;
}

/**
 * Shell - Layout principal da aplicação
 * Header com título e ThemeToggle
 * Container centralizado com largura máxima
 */
export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Ânima
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <Separator className="mb-4" />
          <p className="text-center text-sm text-muted-foreground">
            Ânima — Acompanhamento contínuo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Shell;
