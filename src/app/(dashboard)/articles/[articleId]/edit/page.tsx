'use client';

import { use } from 'react';

import { NotFound } from '~/components/ui/not-found';
import { ArticleFormSkeleton, UpdateArticleForm } from '~/features/articles';
import { useFindUniqueArticle } from '~/lib/hooks';

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const resolvedParams = use(params);
  const { data: article, isLoading } = useFindUniqueArticle({ where: { id: resolvedParams.articleId } });

  if (isLoading) return <ArticleFormSkeleton />;
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

  return <UpdateArticleForm article={article} />;
}
