import type { Metadata } from 'next';
import Link from 'next/link';
import { LogoMock, ImageMock } from '@/components/brand';
import { landingCopy } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Ânima — Acompanhamento contínuo do cotidiano',
  description:
    'Ferramenta de registro e observação para organizar informações do dia a dia ao longo do tempo. Dados sob seu controle. Tecnologia como suporte, não substituição.',
  openGraph: {
    title: 'Ânima',
    description: 'Acompanhamento contínuo do cotidiano',
    type: 'website',
    locale: 'pt_BR',
  },
};

// ============================================================================
// Page
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ================================================================
          A) HERO
          ================================================================ */}
      <header className="px-4 pt-12 pb-8 sm:px-6 lg:px-8 sm:pt-16 sm:pb-12">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Logo e texto */}
          <div className="text-center space-y-5">
            <LogoMock size="large" />
            <h1 className="text-2xl sm:text-3xl font-serif text-foreground/90 tracking-tight">
              {landingCopy.hero.headline}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {landingCopy.hero.text}
            </p>
            <div className="pt-4 flex items-center justify-center gap-4">
              <Link
                href="/today"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {landingCopy.hero.cta}
              </Link>
              <Link
                href="/demo"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {landingCopy.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* Visual mock - grande, acima da dobra */}
          <div className="pt-4">
            <ImageMock ratio="21:9" variant="material" alt="Visual provisório" />
          </div>
        </div>
      </header>

      {/* ================================================================
          CONTENT
          ================================================================ */}
      <main className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16">
          {/* ================================================================
              B) O QUE VOCÊ VÊ NO PRODUTO
              ================================================================ */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {landingCopy.features.title}
            </h2>
            <ul className="space-y-2.5">
              {landingCopy.features.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                  <span className="text-[0.9375rem] text-muted-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Divider */}
          <div className="border-t border-border/40" />

          {/* ================================================================
              C) COMO AS TELAS SE ORGANIZAM
              ================================================================ */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {landingCopy.screens.title}
            </h2>
            <div className="space-y-3">
              {landingCopy.screens.items.map((screen, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-[0.9375rem] font-medium text-foreground">
                    {screen.name}
                  </span>
                  <span className="text-[0.875rem] text-muted-foreground">
                    — {screen.description}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border/40" />

          {/* ================================================================
              D) CONTROLE E LIMITES
              ================================================================ */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {landingCopy.limits.title}
            </h2>
            <div className="rounded-xl border border-hairline bg-surface-2/30 p-5 space-y-2.5">
              {landingCopy.limits.items.map((item, i) => (
                <p key={i} className="text-[0.875rem] text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t border-border/40" />

          {/* ================================================================
              E) ESTADO DO PRODUTO
              ================================================================ */}
          <section className="space-y-3">
            <h2 className="text-[0.9375rem] font-medium text-foreground">
              {landingCopy.status.title}
            </h2>
            <p className="text-[0.875rem] text-muted-foreground/80 leading-relaxed">
              {landingCopy.status.text}
            </p>
          </section>
        </div>
      </main>

      {/* ================================================================
          F) FOOTER
          ================================================================ */}
      <footer className="border-t border-border/40 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-3 text-center">
          <LogoMock size="small" />
          <p className="text-[0.75rem] text-muted-foreground/50">
            {landingCopy.footer.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
