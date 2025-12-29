import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { ObservationsClient } from '@/features/observations';

interface ObservationsPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function ObservationsPage({
  searchParams,
}: ObservationsPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.observations.title')}
        description={t(lang, 'page.observations.subtitle')}
      />

      <ObservationsClient asOf={asOf} fetchOptions={fetchOptions} />
    </PageContainer>
  );
}

