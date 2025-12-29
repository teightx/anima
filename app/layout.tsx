import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ToastProvider } from '@/components/feedback';

export const metadata: Metadata = {
  title: 'Ânima',
  description: 'Acompanhamento contínuo de bem-estar e saúde mental',
  applicationName: 'Ânima',
};

export const viewport: Viewport = {
  themeColor: [
    // Light: Porcelana fria - hsl(45 20% 97%)
    { media: '(prefers-color-scheme: light)', color: '#f8f7f5' },
    // Dark: Ink azul - hsl(222 28% 8%)
    { media: '(prefers-color-scheme: dark)', color: '#0f1318' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Script inline para aplicar tema antes da renderização (previne flash)
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('anima-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored :
      (stored === 'system' || !stored) ?
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') :
        'light';
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('light');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Theme script - executa antes de qualquer renderização */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider defaultTheme="system">
          <TooltipProvider delayDuration={300}>
            <ToastProvider>{children}</ToastProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
