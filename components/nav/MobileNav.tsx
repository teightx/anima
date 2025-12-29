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
    label: 'Leituras',
    icon: Eye,
  },
  {
    href: '/protocols',
    label: 'Planos',
    icon: ListChecks,
  },
  {
    href: '/anima',
    label: 'Config',
    icon: Settings,
  },
];

/**
 * MobileNav — Navegação inferior do Ânima (Mobile)
 * 
 * Características:
 * - Fundo sólido discreto
 * - Item ativo: cor primária + indicador sutil
 * - Ícones com espessura consistente
 * - Labels compactos
 * - Safe area para iOS
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-surface border-t border-hairline"
      style={{ width: '100vw', maxWidth: '100%' }}
      aria-label="Navegação mobile"
    >
      <div className="flex items-stretch h-16">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                // Base
                'relative flex-1 flex flex-col items-center justify-center gap-0.5 py-2',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:bg-surface-2',
                
                // Estados
                isActive
                  ? 'text-primary'
                  : 'text-text-muted active:text-text-secondary'
              )}
            >
              {/* Indicador superior ativo */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
              
              <Icon
                className="h-5 w-5"
                strokeWidth={isActive ? 2 : 1.5}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-[10px] font-medium leading-none',
                  isActive ? 'text-primary' : 'text-text-muted'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)] bg-surface" />
    </nav>
  );
}
