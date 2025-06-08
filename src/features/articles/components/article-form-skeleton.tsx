'use client';

import { Skeleton } from '~/components/ui/skeleton';

export function ArticleSkeleton() {
  return (
    <div className="grid gap-6 pb-18 pt-2 px-6">
      <div>
        <Skeleton className="h-12 w-3/4" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-11/12" />
        <Skeleton className="h-6 w-10/12" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-9/12" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-8/12" />
      </div>
    </div>
  );
}
