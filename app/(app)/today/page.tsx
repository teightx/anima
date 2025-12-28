import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { getAsOfDate, formatDisplayDate } from '@/lib/appDate';
import { TodayClient } from '@/features/checkin';

interface TodayPageProps {
  searchParams: Promise<{ lang?: string; asOf?: string }>;
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const asOf = getAsOfDate(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.today.title')}
        description={formatDisplayDate(asOf, lang === 'en' ? 'en-US' : 'pt-BR')}
      />

      <TodayClient date={asOf} asOf={asOf} />
    </PageContainer>
  );
}
