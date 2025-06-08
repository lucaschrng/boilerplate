'use client';

import { ArticleStatus, ArticleVisibility } from '@prisma/client';

import { useCreateArticle } from '../hooks/useArticles';
import { type BaseArticleFormValues } from '../schemas/article';
import { ArticleFormBase } from './article-form-base';

export function CreateArticleForm() {
  const { isPending, mutateAsync: createArticle } = useCreateArticle();

  const defaultValues: BaseArticleFormValues = {
    content: '',
    status: ArticleStatus.DRAFT,
    title: '',
    visibility: ArticleVisibility.PUBLIC,
  };

  const onSubmit = async (values: BaseArticleFormValues) => {
    await createArticle({ data: values });
  };

  return (
    <ArticleFormBase
      defaultValues={defaultValues}
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}
