'use client';

import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import LinkButton from '~/components/ui/link-button';
import { Skeleton } from '~/components/ui/skeleton';

import { useFindPublishedArticles } from '../hooks/useArticles';
import { ArticleCard } from './article-card';

export function ArticlesList() {
  const t = useTranslations();
  const { data: articles, isLoading } = useFindPublishedArticles();

  if (isLoading) {
    return <ArticleListSkeleton />;
  }

  if (!articles?.length) {
    return <EmptyArticleList />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-3">
        <h1 className="text-3xl font-serif">{t('articles.list.title')}</h1>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <ArticleCard article={article} className="hover:bg-muted hover:[&_*]:data-[slot=card-title]:underline hover:[&_*]:data-[slot=card-title]:underline-offset-4 transition-colors duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="border rounded-lg p-6" key={i}>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12 mt-2" />
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyArticleList() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h2 className="text-3xl font-serif mb-2">{t('articles.list.empty.title')}</h2>
      <p className="text-muted-foreground mb-6">{t('articles.list.empty.description')}</p>
      <LinkButton href="/articles/new">
        <PlusIcon className="size-4" />
        {t('articles.list.empty.create')}
      </LinkButton>
    </div>
  );
}
