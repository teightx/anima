'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  History,
  BookOpen,
  FileText,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme';

const navItems = [
  {
    href: '/today',
    label: 'Hoje',
    icon: CalendarDays,
  },
  {
    href: '/history',
    label: 'Historico',
    icon: History,
  },
  {
    href: '/readings',
    label: 'Leituras',
    icon: BookOpen,
  },
  {
    href: '/protocols',
    label: 'Protocolos',
    icon: FileText,
  },
  {
    href: '/anima',
    label: 'Anima',
    icon: Sparkles,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-1 min-h-0 bg-card border-r border-border/60">
        {/* Logo */}
        <div className="flex items-center h-14 px-4 border-b border-border/60">
          <Link
            href="/today"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Anima
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-2 py-4 space-y-1"
          aria-label="Navegacao principal"
        >
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
                  'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
