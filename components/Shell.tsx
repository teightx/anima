'use client';

import { ReactNode, Suspense } from 'react';
import { AppSidebar, MobileNav } from '@/components/nav';
import { DemoIndicator } from '@/components/layout';

interface ShellProps {
  children: ReactNode;
}

/**
 * Shell — Layout principal do Ânima
 * 
 * Estrutura:
 * - Desktop: sidebar fixa (216px) + área de conteúdo centralizada
 * - Mobile: conteúdo + bottom navigation
 * 
 * Container:
 * - max-width: 896px (56rem)
 * - Padding consistente
 * - Ritmo vertical padronizado
 */
export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="md:pl-[var(--sidebar-width)] flex flex-col min-h-screen overflow-x-hidden">
        {/* Content */}
        <main className="flex-1 py-6 md:py-8 pb-24 md:pb-8 overflow-x-hidden">
          <div className="container-app">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <MobileNav />

      {/* Demo Mode Indicator */}
      <Suspense fallback={null}>
        <DemoIndicator />
      </Suspense>
    </div>
  );
}

export default Shell;
