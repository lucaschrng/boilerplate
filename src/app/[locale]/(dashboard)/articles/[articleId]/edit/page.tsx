'use client';

import { useTranslations } from 'next-intl';
import { use } from 'react';

import { NotFound } from '~/components/ui/not-found';
import { ArticleSkeleton, UpdateArticleForm } from '~/features/articles';
import { useFindUniqueArticle } from '~/lib/hooks';

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const t = useTranslations('articles.edit');
  const resolvedParams = use(params);
  const { data: article, isLoading } = useFindUniqueArticle({ where: { id: resolvedParams.articleId } });

  if (isLoading) return <ArticleSkeleton />;
  if (!article) return (
    <NotFound
      backTo={{
        href: '/articles/my',
        label: 'Back to My Articles',
      }}
      description="The article you are looking for does not exist or has been removed."
      title="Article Not Found"
    />
  );

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-2 rounded-lg px-3 py-1">
        <h1 className="text-2xl font-serif">{t('title')}</h1>
        <div className="border-b border-muted-foreground flex-1" />
      </div>
      <UpdateArticleForm article={article} />
    </div>
  );
}
