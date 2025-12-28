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

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/60"
      aria-label="Navegacao mobile"
    >
      <div className="flex items-center justify-around h-16 px-2">
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
                'flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[56px] rounded-lg transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn('h-5 w-5', isActive && 'stroke-[2.5px]')}
                aria-hidden="true"
              />
              <span className="text-[10px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)] bg-card" />
    </nav>
  );
}
