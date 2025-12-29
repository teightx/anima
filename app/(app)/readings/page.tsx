import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { ReadingsClient } from '@/features/readings';

interface ReadingsPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function ReadingsPage({
  searchParams,
}: ReadingsPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.readings.title')}
        description={t(lang, 'page.readings.subtitle')}
      />

      <ReadingsClient asOf={asOf} fetchOptions={fetchOptions} />
    </PageContainer>
  );
}
