import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getLangFromSearchParams, t } from '@/lib/i18n';

interface TodayPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function TodayPage({ searchParams }: TodayPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.today.title')}
        description={t(lang, 'page.today.subtitle')}
      />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t(lang, 'common.inDevelopment')}
          </CardTitle>
          <CardDescription>
            {lang === 'en'
              ? 'This section will allow you to record your daily state and view metrics.'
              : 'Esta secao permitira registrar seu estado diario e visualizar metricas do dia.'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Placeholder Widgets */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </Card>
      </div>

      {/* Timeline Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
