import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LogoMock, ImageMock } from '@/components/brand';

export const metadata: Metadata = {
  title: 'Ânima — Acompanhamento contínuo de bem-estar',
  description:
    'Ferramenta de registro e observação para acompanhamento pessoal de bem-estar ao longo do tempo. Dados pertencem ao usuário. Tecnologia como suporte, não substituição.',
  openGraph: {
    title: 'Ânima',
    description: 'Acompanhamento contínuo de bem-estar',
    type: 'website',
    locale: 'pt_BR',
  },
};


// ============================================================================
// Content
// ============================================================================

const WHAT_IT_IS = {
  title: 'O que é',
  content: `Ânima é uma ferramenta de registro e observação para acompanhamento pessoal de bem-estar ao longo do tempo. Permite registrar estados diários, observar padrões e, opcionalmente, compartilhar dados com profissionais de saúde de sua escolha.`,
};

const WHAT_IT_IS_NOT = {
  title: 'O que não é',
  items: [
    'Não é terapia nem substitui acompanhamento profissional',
    'Não é um chatbot ou assistente de IA conversacional',
    'Não faz diagnósticos nem prescreve tratamentos',
    'Não oferece conselhos médicos ou psicológicos',
  ],
};

const HOW_IT_WORKS = {
  title: 'Como funciona',
  blocks: [
    {
      title: 'Registros',
      description: 'Check-ins diários com indicadores simples: humor, energia, sono. Anotações livres quando desejar.',
    },
    {
      title: 'Histórico',
      description: 'Visualização de registros ao longo do tempo. Lacunas são normais e não são julgadas.',
    },
    {
      title: 'Observações',
      description: 'Observações derivadas dos dados com fontes científicas. Você decide o que é relevante.',
    },
    {
      title: 'Compartilhamento',
      description: 'Opcional e granular. Você controla quais dados são visíveis para profissionais autorizados.',
    },
  ],
};

const PRINCIPLES = {
  title: 'Princípios',
  items: [
    {
      title: 'Dados pertencem ao usuário',
      description: 'Suas informações são suas. Controle total sobre acesso e compartilhamento.',
    },
    {
      title: 'Consentimento explícito',
      description: 'Nada é compartilhado sem autorização. Cada categoria pode ser habilitada individualmente.',
    },
    {
      title: 'Observação acima de julgamento',
      description: 'O sistema observa e apresenta. Não diagnostica, não prescreve, não cobra frequência.',
    },
    {
      title: 'Tecnologia como suporte',
      description: 'Ferramenta para facilitar acompanhamento, não para substituir relações de cuidado.',
    },
  ],
};

const STATUS = {
  title: 'Status',
  content: 'Produto em desenvolvimento controlado. Acesso disponível mediante convite para validação inicial.',
};

// ============================================================================
// Components
// ============================================================================

function Section({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ============================================================================
// Page
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Logo e texto */}
          <div className="text-center space-y-4">
            <LogoMock size="large" />
            <p className="text-xl text-foreground/90 font-serif">
              Acompanhamento contínuo de bem-estar
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Ferramenta de registro e observação para acompanhamento pessoal ao longo do tempo.
              Dados sob seu controle. Tecnologia como suporte, não substituição.
            </p>
            <div className="pt-6">
              <Link
                href="/today"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Entrar
              </Link>
            </div>
          </div>
          
          {/* Visual mock */}
          <div className="pt-8">
            <ImageMock ratio="16:9" variant="light" alt="Visual provisório" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-12">
          
          {/* O que é */}
          <Section title={WHAT_IT_IS.title}>
            <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
              {WHAT_IT_IS.content}
            </p>
          </Section>

          <Separator className="bg-border/40" />

          {/* O que não é */}
          <Section title={WHAT_IT_IS_NOT.title}>
            <ul className="space-y-2">
              {WHAT_IT_IS_NOT.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                  <span className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          <Separator className="bg-border/40" />

          {/* Como funciona */}
          <Section title={HOW_IT_WORKS.title}>
            <div className="grid gap-4 sm:grid-cols-2">
              {HOW_IT_WORKS.blocks.map((block, i) => (
                <Card key={i} variant="static">
                  <CardContent className="p-4 space-y-1.5">
                    <h3 className="text-[0.875rem] font-medium text-foreground">
                      {block.title}
                    </h3>
                    <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
                      {block.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Separator className="bg-border/40" />

          {/* Princípios */}
          <Section title={PRINCIPLES.title}>
            <div className="space-y-4">
              {PRINCIPLES.items.map((item, i) => (
                <div key={i} className="space-y-1">
                  <h3 className="text-[0.875rem] font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Separator className="bg-border/40" />

          {/* Status */}
          <Section title={STATUS.title}>
            <p className="text-[0.9375rem] text-muted-foreground leading-relaxed">
              {STATUS.content}
            </p>
          </Section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <LogoMock size="small" />
            <p className="text-[0.75rem] text-muted-foreground/60 mt-1">
              Acompanhamento contínuo de bem-estar
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/demo" 
              className="text-[0.75rem] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              Ver demo
            </Link>
            <span className="text-[0.75rem] text-muted-foreground/40">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

