'use client';

import { PencilIcon } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from '~/components/ui/card';
import LinkButton from '~/components/ui/link-button';
import { Skeleton } from '~/components/ui/skeleton';

import { useFindMyArticles } from '../hooks/useArticles';
import { ArticleCard } from './article-card';

export function MyArticlesList() {
  const { data: articles, isLoading } = useFindMyArticles();

  if (isLoading) {
    return <ArticleListSkeleton />;
  }

  if (!articles || articles.length === 0) {
    return <EmptyArticleList />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-3xl font-serif">My Articles</h1>
        <LinkButton href="/articles/new" size="sm">
          <PencilIcon className="size-4" />
          New Article
        </LinkButton>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} variant="myArticles" />
        ))}
      </div>
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-1/4 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function EmptyArticleList() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl font-serif mb-2">No articles yet</h2>
      <p className="text-muted-foreground mb-6">Start creating your first article</p>
      <LinkButton href="/articles/new">
        <PencilIcon className="size-4" />
        Create Article
      </LinkButton>
    </div>
  );
}
