import Link from 'next/link';
import { ArrowRight, Calendar, BarChart3, BookOpen, FileText, Sparkles, History } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DEMO_STEPS = [
  {
    number: 1,
    title: 'Hoje',
    description: 'Registro do dia, resumo e anotações',
    href: '/today?demo=1',
    icon: Calendar,
    highlight: 'Ponto de entrada do usuário',
  },
  {
    number: 2,
    title: 'Histórico',
    description: 'Calendário com lacunas visíveis',
    href: '/history?demo=1',
    icon: History,
    highlight: 'Padrões ao longo do tempo',
  },
  {
    number: 3,
    title: 'Painel',
    description: 'Gráficos de tendência e variações',
    href: '/dashboard?demo=1',
    icon: BarChart3,
    highlight: 'Visão agregada',
  },
  {
    number: 4,
    title: 'Leituras',
    description: 'Observações derivadas + fontes científicas',
    href: '/readings?demo=1',
    icon: BookOpen,
    highlight: 'Feedback do usuário',
  },
  {
    number: 5,
    title: 'Protocolos',
    description: 'Biblioteca e protocolo em andamento',
    href: '/protocols?demo=1',
    icon: FileText,
    highlight: 'Acompanhamento estruturado',
  },
  {
    number: 6,
    title: 'Ânima',
    description: 'Modo terapia e controle de compartilhamento',
    href: '/anima?demo=1',
    icon: Sparkles,
    highlight: 'Controle do usuário',
  },
];

const KEY_MESSAGES = [
  'Observacional, não prescritivo',
  'Dados do usuário, controle do usuário',
  'Baseado em evidências',
  'Sem julgamento sobre lacunas',
  'Design institucional e de longo prazo',
];

export default function DemoPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Roteiro de Demonstração</h1>
          <Badge variant="outline" className="text-[0.6875rem]">2–3 min</Badge>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Apresente o Ânima como um produto de acompanhamento contínuo de bem-estar: 
          observacional, institucional e centrado no controle do usuário.
        </p>
      </header>

      {/* Quick Start */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Início Rápido</CardTitle>
          <CardDescription>
            Clique para iniciar a demo no ponto recomendado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/today?demo=1">
              Iniciar Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Steps */}
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Roteiro em 6 passos</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {DEMO_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <Link key={step.number} href={step.href}>
                <Card className="h-full transition-colors hover:border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[0.6875rem] font-medium text-muted-foreground">
                            {step.number}.
                          </span>
                          <span className="text-sm font-medium">{step.title}</span>
                        </div>
                        <p className="text-[0.8125rem] text-muted-foreground line-clamp-1">
                          {step.description}
                        </p>
                        <p className="text-[0.6875rem] text-primary/70">
                          {step.highlight}
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

      {/* Key Messages */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Mensagens-chave</h2>
        <div className="flex flex-wrap gap-2">
          {KEY_MESSAGES.map((message, i) => (
            <Badge key={i} variant="secondary" className="text-[0.75rem] font-normal">
              {message}
            </Badge>
          ))}
        </div>
      </section>

      {/* Technical Notes */}
      <section className="rounded-lg bg-muted/30 p-4 space-y-2">
        <h2 className="text-[0.8125rem] font-medium text-muted-foreground">Notas Técnicas</h2>
        <ul className="text-[0.75rem] text-muted-foreground/70 space-y-1">
          <li>• <strong>Modo demo:</strong> <code className="bg-muted px-1 rounded">?demo=1</code> fixa a data em 2024-12-30</li>
          <li>• <strong>Dataset:</strong> 30 dias de dados simulados com padrões realistas</li>
          <li>• <strong>Lacunas:</strong> Dias 8, 15, 22 e 23 sem registro (intencional)</li>
          <li>• <strong>Protocolo ativo:</strong> "Regulação de Sono" em andamento</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="pt-4 border-t border-border/40">
        <p className="text-[0.75rem] text-muted-foreground/60 text-center">
          Ânima — Acompanhamento contínuo de bem-estar
        </p>
      </footer>
    </div>
  );
}

