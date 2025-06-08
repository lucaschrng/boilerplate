'use client';

import { use } from 'react';

import { NotFound } from '~/components/ui/not-found';
import { ArticleSkeleton } from '~/features/articles';
import { ArticleView } from '~/features/articles/components/article-view';
import { useFindUniqueArticle } from '~/lib/hooks';

export default function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const resolvedParams = use(params);
  const { data: article, isLoading } = useFindUniqueArticle({
    include: { author: true },
    where: { id: resolvedParams.articleId },
  });

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

  return <ArticleView article={article} />;
}
