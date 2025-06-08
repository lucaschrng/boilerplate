'use client';

import { Skeleton } from '~/components/ui/skeleton';

export function ArticleFormSkeleton() {
  return (
    <div>
      <div className="fixed w-full left-0 bottom-0 flex justify-center">
        <div className="max-w-2xl w-full flex justify-between bg-background border rounded-t-xl p-2">
          <Skeleton className="h-9 w-32" />
          <div className="flex justify-end gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>

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
    </div>
  );
}
