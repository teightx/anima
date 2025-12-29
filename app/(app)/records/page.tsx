import Link from 'next/link';
import { PageHeader, PageContainer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { getAsOfDate } from '@/lib/appDate';
import { parseTestOptions } from '@/lib/apiClient';
import { RecordsClient } from '@/features/records';
import type { RecordsView } from '@/features/records';

interface RecordsPageProps {
  searchParams: Promise<{
    view?: string;
    asOf?: string;
    delay?: string;
    error?: string;
    demo?: string;
    lang?: string;
  }>;
}

function getInitialView(viewParam?: string): RecordsView {
  const validViews: RecordsView[] = ['calendar', 'list', 'trends'];
  if (viewParam && validViews.includes(viewParam as RecordsView)) {
    return viewParam as RecordsView;
  }
  return 'calendar';
}

function getSubtitle(view: RecordsView): string | undefined {
  // Não retornar subtitle condicional - isso causa movimento do layout
  return undefined;
}

export default async function RecordsPage({ searchParams }: RecordsPageProps) {
  const params = await searchParams;
  const asOf = getAsOfDate(params);
  const fetchOptions = parseTestOptions(params);
  const initialView = getInitialView(params.view);

  return (
    <PageContainer>
      <PageHeader
        title="Registros"
        description={getSubtitle(initialView)}
      >
        <Button asChild variant="ghost" size="sm">
          <Link href="/today">Ir para hoje</Link>
        </Button>
      </PageHeader>

      <RecordsClient
        asOf={asOf}
        initialView={initialView}
        fetchOptions={fetchOptions}
      />
    </PageContainer>
  );
}

