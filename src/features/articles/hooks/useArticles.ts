'use client';

import { ArticleStatus, ArticleVisibility } from '@prisma/client';
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
  const router = useRouter();
  return useCreateArticleHook({
    onError: (error) => {
      toast.error('Failed to create article', {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success('Article created successfully');
      router.push(`/articles/${data?.id}`);
    },
  });
};

export const useUpdateArticle = () => {
  const router = useRouter();
  return useUpdateArticleHook({
    onError: (error) => {
      toast.error('Failed to update article', {
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast.success('Article updated successfully');
      router.push(`/articles/${data?.id}`);
    },
  });
};

export const useDeleteArticle = () => {
  return useDeleteArticleHook({
    onError: (error) => {
      toast.error('Failed to delete article', {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success('Article deleted successfully');
    },
  });
};

export const useUnpublishArticle = () => {
  const { mutate, mutateAsync, ...rest } = useUpdateArticleHook({
    onError: (error) => {
      toast.error('Failed to unpublish article', {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success('Article unpublished successfully');
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
