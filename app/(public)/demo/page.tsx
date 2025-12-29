import Link from 'next/link';
import { ArrowRight, Calendar, FolderOpen, Eye, ListChecks, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogoMock } from '@/components/brand';

const DEMO_SECTIONS = [
  {
    name: 'Hoje',
    description: 'registro do dia atual',
    href: '/today?demo=1',
    icon: Calendar,
  },
  {
    name: 'Registros',
    description: 'histórico, lista e gráficos',
    href: '/records?demo=1',
    icon: FolderOpen,
  },
  {
    name: 'Observações',
    description: 'leituras descritivas baseadas nos dados',
    href: '/readings?demo=1',
    icon: Eye,
  },
  {
    name: 'Planos',
    description: 'estruturas opcionais de organização',
    href: '/protocols?demo=1',
    icon: ListChecks,
  },
  {
    name: 'Configurações',
    description: 'controle de dados e compartilhamento',
    href: '/anima?demo=1',
    icon: Settings,
  },
];

export default function DemoPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 space-y-10">
      {/* Header */}
      <header className="text-center space-y-4">
        <LogoMock size="large" />
        <p className="text-lg text-muted-foreground">
          Demonstração do produto
        </p>
      </header>

      {/* Context */}
      <section className="rounded-xl border border-hairline bg-surface-2/30 p-5 space-y-3">
        <p className="text-[0.9375rem] text-foreground leading-relaxed">
          Esta é uma demonstração do Ânima.
        </p>
        <p className="text-[0.875rem] text-muted-foreground leading-relaxed">
          Os dados exibidos são exemplos e servem apenas para mostrar a navegação 
          e a organização das informações.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/today?demo=1">
            Entrar no app
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>

      {/* Navigation */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground text-center">
          Navegação rápida
        </h2>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {DEMO_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.name} href={section.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-text-muted">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-foreground">
                          {section.name}
                        </span>
                        <p className="text-[0.8125rem] text-muted-foreground truncate">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Status */}
      <section className="text-center space-y-2 pt-4 border-t border-border/40">
        <p className="text-[0.75rem] text-muted-foreground/60">
          Ambiente de demonstração • Dados de exemplo
        </p>
        <LogoMock size="small" showDot={false} />
      </section>
    </div>
  );
}
