import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { PageHeader, PageContainer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate, formatDisplayDate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { TodayClient } from '@/features/checkin';

interface TodayPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);

  // Construir URL de registros preservando asOf
  const recordsUrl = `/history?asOf=${asOf}&view=calendar`;

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.today.title')}
        description={formatDisplayDate(asOf, lang === 'en' ? 'en-US' : 'pt-BR')}
        actions={
          <Button variant="ghost" size="sm" asChild className="gap-1 text-text-muted">
            <Link href={recordsUrl}>
              Ver em Registros
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <TodayClient date={asOf} asOf={asOf} fetchOptions={fetchOptions} />
    </PageContainer>
  );
}
