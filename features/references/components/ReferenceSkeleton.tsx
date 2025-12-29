'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ReferenceSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-24" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-full max-w-lg" />
          <Skeleton className="h-4 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      </div>

      {/* Summary skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>

      {/* Key findings skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-2 w-2 mt-1.5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-2 w-2 mt-1.5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <div className="flex items-start gap-3">
            <Skeleton className="h-2 w-2 mt-1.5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        </CardContent>
      </Card>

      {/* Meta skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

