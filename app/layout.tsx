import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ânima',
  description: 'Acompanhamento contínuo de saúde mental e bem-estar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
    </html>
  );
}
