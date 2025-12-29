'use client';

import { QuietCard, QuietCardHeader, QuietCardContent, QuietCardFooter } from '@/components/system';
import { Skeleton } from '@/components/ui/skeleton';

export function ObservationsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Tabs skeleton */}
      <Skeleton className="h-9 w-64" />

      {/* Cards skeleton */}
      {[1, 2, 3].map(i => (
        <QuietCard key={i} padding="none">
          <QuietCardHeader className="p-5 pb-3">
            <Skeleton className="h-6 w-3/4 mb-3" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </QuietCardHeader>
          <QuietCardContent className="px-5">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </QuietCardContent>
          <QuietCardFooter className="px-5 pb-5">
            <Skeleton className="h-8 w-32" />
          </QuietCardFooter>
        </QuietCard>
      ))}
    </div>
  );
}

