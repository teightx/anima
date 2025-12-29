'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  FolderOpen,
  Eye,
  ListChecks,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme';
import { LogoMock } from '@/components/brand';

const navItems = [
  {
    href: '/today',
    label: 'Hoje',
    icon: CalendarDays,
  },
  {
    href: '/records',
    label: 'Registros',
    icon: FolderOpen,
  },
  {
    href: '/readings',
    label: 'Observações',
    icon: Eye,
  },
  {
    href: '/protocols',
    label: 'Planos',
    icon: ListChecks,
  },
  {
    href: '/anima',
    label: 'Configurações',
    icon: Settings,
  },
];

/**
 * AppSidebar — Navegação lateral do Ânima (Desktop)
 * 
 * Características:
 * - Fundo discreto com backdrop blur
 * - Item ativo: fundo sutil + borda esquerda fina (2px)
 * - Ícones com espessura e opacidade consistentes
 * - Espaçamento vertical calmo
 * - Visual "silencioso", integrado ao produto
 */
export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-[var(--sidebar-width)] md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-1 min-h-0 bg-surface/60 backdrop-blur-sm border-r border-hairline">
        {/* Logo */}
        <div className="flex items-center h-14 px-5">
          <LogoMock asLink href="/today" size="default" />
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-3 py-4"
          aria-label="Navegação principal"
        >
          <ul className="space-y-[var(--nav-item-gap)]">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      // Base
                      'group relative flex items-center gap-3 px-3 h-[var(--nav-item-height)] rounded-md',
                      'text-body-sm font-medium transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1',
                      
                      // Estados
                      isActive
                        ? 'bg-surface-2/80 text-text-primary'
                        : 'text-text-muted hover:bg-surface-2/50 hover:text-text-secondary'
                    )}
                  >
                    {/* Borda esquerda ativa */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[var(--nav-active-border)] h-5 rounded-r-full bg-primary"
                        aria-hidden="true"
                      />
                    )}
                    
                    <Icon
                      className={cn(
                        'h-[18px] w-[18px] shrink-0 transition-colors',
                        isActive ? 'text-primary' : 'opacity-70 group-hover:opacity-100'
                      )}
                      strokeWidth={isActive ? 2 : 1.5}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-hairline">
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
