import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
        title={t(lang, 'page.anima.title')}
        description={t(lang, 'page.anima.subtitle')}
      />

      {/* Therapy Hub */}
      <TherapyClient fetchOptions={fetchOptions} />

      {/* Settings Section - Mobile Theme Toggle Access */}
      <Card variant="static" className="mt-6">
        <CardHeader>
          <CardTitle className="text-[0.9375rem]">Preferências</CardTitle>
          <CardDescription>
            Ajustes de aparência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Tema</p>
              <p className="text-[0.75rem] text-muted-foreground">
                Modo claro ou escuro
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
