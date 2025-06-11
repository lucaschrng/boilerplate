'use client';

import { ArticleStatus, ArticleVisibility } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useSession } from '~/lib/auth-client';
import {
  useCreateArticle as useCreateArticleHook,
  useDeleteArticle as useDeleteArticleHook,
  useFindManyArticle as useFindManyArticleHook,
  useUpdateArticle as useUpdateArticleHook,
} from '~/lib/hooks/article';

export const useFindMyArticles = () => {
  const { data: session } = useSession();
  return useFindManyArticleHook({
    include: { author: true },
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      authorId: {
        equals: session?.user.id,
      },
    },
  });
};

export const useFindPublishedArticles = () => {
  return useFindManyArticleHook({
    include: { author: true },
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      status: {
        equals: ArticleStatus.PUBLISHED,
      },
      visibility: {
        equals: ArticleVisibility.PUBLIC,
      },
    },
  });
};

export const useCreateArticle = () => {
  const t = useTranslations();
  const router = useRouter();
  return useCreateArticleHook({
    onError: (error) => {
      toast.error(t('common.result.error.create', { entity: t('common.entities.article').toLowerCase() }), {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success(t('common.result.success.create', { entity: t('common.entities.article') }));
      router.push(`/articles/${data?.id}`);
    },
  });
};

export const useUpdateArticle = () => {
  const t = useTranslations();
  const router = useRouter();
  return useUpdateArticleHook({
    onError: (error) => {
      toast.error(t('common.result.error.update', { entity: t('common.entities.article').toLowerCase() }), {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success(t('common.result.success.update', { entity: t('common.entities.article') }));
      router.push(`/articles/${data?.id}`);
    },
  });
};

export const useDeleteArticle = () => {
  const t = useTranslations();
  return useDeleteArticleHook({
    onError: (error) => {
      toast.error(t('common.result.error.delete', { entity: t('common.entities.article').toLowerCase() }), {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success(t('common.result.success.delete', { entity: t('common.entities.article') }));
    },
  });
};

export const useUnpublishArticle = () => {
  const t = useTranslations();
  const { mutate, mutateAsync, ...rest } = useUpdateArticleHook({
    onError: (error) => {
      toast.error(t('common.result.error.unpublish', { entity: t('common.entities.article').toLowerCase() }), {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success(t('common.result.success.unpublish', { entity: t('common.entities.article') }));
    },
  });

  return {
    ...rest,
    mutate: (articleId: string) =>
      mutate({
        data: { status: ArticleStatus.DRAFT },
        where: { id: articleId },
      }),
    mutateAsync: (articleId: string) =>
      mutateAsync({
        data: { status: ArticleStatus.DRAFT },
        where: { id: articleId },
      }),
  };
};
