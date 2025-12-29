import { PageHeader, PageContainer } from '@/components/layout';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
} from '@/components/system';
import { ThemeToggle } from '@/components/theme';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { parseTestOptions } from '@/lib/apiClient';
import { TherapyClient } from '@/features/therapy';

interface AnimaPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function AnimaPage({ searchParams }: AnimaPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const fetchOptions = parseTestOptions(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.settings.title')}
        description={t(lang, 'page.settings.subtitle')}
      />

      {/* Therapy Hub */}
      <TherapyClient fetchOptions={fetchOptions} />

      {/* Settings Section - Mobile Theme Toggle Access */}
      <QuietCard>
        <QuietCardHeader>
          <QuietCardTitle>Preferências</QuietCardTitle>
          <QuietCardDescription>
            Ajustes de aparência
          </QuietCardDescription>
        </QuietCardHeader>
        <QuietCardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-sm font-medium text-text-primary">Tema</p>
              <p className="text-caption text-text-muted">
                Modo claro ou escuro
              </p>
            </div>
            <ThemeToggle />
          </div>
        </QuietCardContent>
      </QuietCard>
    </PageContainer>
  );
}
