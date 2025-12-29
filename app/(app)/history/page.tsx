import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate, toISODate, parseISODate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { HistoryClient } from '@/features/history';

interface HistoryPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);

  // Calculate date range: last 30 days ending on asOf
  const endDate = asOf;
  const startDateObj = parseISODate(asOf);
  startDateObj.setDate(startDateObj.getDate() - 29);
  const startDate = toISODate(startDateObj);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.history.title')}
        description={t(lang, 'page.history.subtitle')}
      />

      <HistoryClient
        asOf={asOf}
        startDate={startDate}
        endDate={endDate}
        fetchOptions={fetchOptions}
      />
    </PageContainer>
  );
}
