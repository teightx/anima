import { PageHeader, PageContainer } from '@/components/layout';
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

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.today.title')}
        description={formatDisplayDate(asOf, lang === 'en' ? 'en-US' : 'pt-BR')}
      />

      <TodayClient date={asOf} asOf={asOf} fetchOptions={fetchOptions} />
    </PageContainer>
  );
}
