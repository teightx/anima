import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getLangFromSearchParams, t } from '@/lib/i18n';

interface ReadingsPageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function ReadingsPage({
  searchParams,
}: ReadingsPageProps) {
  const params = await searchParams;
  const lang = getLangFromSearchParams(params);

  return (
    <PageContainer>
      <PageHeader
        title={t(lang, 'page.readings.title')}
        description={t(lang, 'page.readings.subtitle')}
      />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t(lang, 'common.inDevelopment')}
          </CardTitle>
          <CardDescription>
            {lang === 'en'
              ? 'This section will present interpretations and patterns identified in your data.'
              : 'Esta secao apresentara interpretacoes e padroes identificados nos seus dados.'}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Insights Grid Placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </Card>
      </div>

      {/* Detailed Reading Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Card>
    </PageContainer>
  );
}
