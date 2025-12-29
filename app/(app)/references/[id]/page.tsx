import { PageContainer } from '@/components/layout';
import { parseTestOptions } from '@/lib/apiClient';
import { ReferenceClient } from '@/features/references';

interface ReferencePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    asOf?: string;
    delay?: string;
    error?: string;
  }>;
}

export default async function ReferencePage({
  params,
  searchParams,
}: ReferencePageProps) {
  const { id } = await params;
  const search = await searchParams;
  const fetchOptions = parseTestOptions(search);

  // Build back URL preserving asOf if present
  const backHref = search.asOf ? `/readings?asOf=${search.asOf}` : '/readings';

  return (
    <PageContainer>
      <ReferenceClient
        referenceId={id}
        backHref={backHref}
        fetchOptions={fetchOptions}
      />
    </PageContainer>
  );
}

