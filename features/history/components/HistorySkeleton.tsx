'use client';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function HistorySkeleton() {
  return (
    <div className="space-y-4">
      {/* Tabs skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Calendar/List skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 mx-auto" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
