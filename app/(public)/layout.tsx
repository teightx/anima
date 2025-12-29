import type { Metadata } from 'next';

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

/**
 * Layout para páginas públicas (sem shell de navegação)
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}

