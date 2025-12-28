import Link from 'next/link';

const navLinks = [
  {
    href: '/hoje',
    label: 'Hoje',
    description: 'Check-in diário e estado atual',
  },
  {
    href: '/historico',
    label: 'Histórico',
    description: 'Visualize sua jornada ao longo do tempo',
  },
  {
    href: '/leituras',
    label: 'Leituras',
    description: 'Insights e análises do seu bem-estar',
  },
  {
    href: '/protocolos',
    label: 'Protocolos',
    description: 'Tratamentos e acompanhamentos ativos',
  },
  {
    href: '/anima',
    label: 'Ânima',
    description: 'Seu companheiro de jornada',
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-3 text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Ânima
        </h1>
        <p className="text-xl text-[var(--color-text-muted)]">
          Acompanhamento contínuo
        </p>
      </header>

      {/* Navigation Links */}
      <nav className="w-full max-w-md">
        <ul className="space-y-3">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-all hover:border-[var(--color-accent)] hover:shadow-md"
              >
                <span className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                  {link.label}
                </span>
                <span className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer hint */}
      <footer className="mt-12 text-center text-sm text-[var(--color-text-muted)]">
        <p>MVP em construção • Prompt 01 concluído</p>
      </footer>
    </main>
  );
}
