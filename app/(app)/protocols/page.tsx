import { PageHeader, PageContainer } from '@/components/layout';
import { getLangFromSearchParams, t } from '@/lib/i18n';
import { parseTestOptions } from '@/lib/apiClient';
import { ProtocolsClient } from '@/features/protocols';

interface ProtocolsPageProps {
  searchParams: Promise<{
    lang?: string;
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function ProtocolsPage({
  searchParams,
}: ProtocolsPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);
  const fetchOptions = parseTestOptions(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.protocols.title')}
        description={t(lang, 'page.protocols.subtitle')}
      />

      <ProtocolsClient fetchOptions={fetchOptions} />
    </PageContainer>
  );
}
