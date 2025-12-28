'use client';

import { ReactNode } from 'react';
import { AppSidebar, MobileNav } from '@/components/nav';

interface ShellProps {
  children: ReactNode;
}

/**
 * Shell - Layout principal da aplicacao com navegacao
 * Desktop: sidebar fixa a esquerda + area de conteudo
 * Mobile: conteudo + bottom navigation
 */
export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Desktop */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="md:pl-56 flex flex-col min-h-screen">
        {/* Content */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-24 md:pb-6">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <MobileNav />
    </div>
  );
}

export default Shell;
