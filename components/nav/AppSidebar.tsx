'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  History,
  BarChart3,
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
    label: 'Histórico',
    icon: History,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
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
    label: 'Ânima',
    icon: Sparkles,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:fixed md:inset-y-0 z-40">
      <div className="flex flex-col flex-1 min-h-0 bg-card/80 backdrop-blur-sm border-r border-border/40">
        {/* Logo */}
        <div className="flex items-center h-16 px-5 border-b border-border/40">
          <Link
            href="/today"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Ânima
          </Link>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-3 py-5 space-y-0.5"
          aria-label="Navegação principal"
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
                  'flex items-center gap-3 px-3 py-2.5 text-[0.9375rem] font-medium rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-primary/8 text-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Tema</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
