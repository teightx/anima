import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { ObservabilityClient } from '@/features/observability';

interface DashboardPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.dashboard.title')}
        description={t(lang, 'page.dashboard.subtitle')}
      />

      <ObservabilityClient asOf={asOf} fetchOptions={fetchOptions} />
    </PageContainer>
  );
}
