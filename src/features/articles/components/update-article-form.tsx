'use client';

import { type Article } from '@prisma/client';

import { useUpdateArticle } from '../hooks/useArticles';
import { type BaseArticleFormValues } from '../schemas/article';
import { ArticleFormBase } from './article-form-base';

export function UpdateArticleForm({
  article,
}: {
  article: Article;
}) {
  const { isPending, mutateAsync: updateArticle } = useUpdateArticle();

  const defaultValues: BaseArticleFormValues = {
    content: article.content,
    status: article.status,
    title: article.title,
    visibility: article.visibility,
  };

  const onSubmit = async (values: BaseArticleFormValues) => {
    await updateArticle({ data: values, where: { id: article.id } });
  };

  return (
    <ArticleFormBase
      defaultValues={defaultValues}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
