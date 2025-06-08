'use client';

import { ArticleStatus } from '@prisma/client';
import { toast } from 'sonner';

import { useSession } from '~/lib/auth-client';
import {
  useCreateArticle as useCreateArticleHook,
  useDeleteArticle as useDeleteArticleHook,
  useFindManyArticle as useFindManyArticleHook,
  useUpdateArticle as useUpdateArticleHook,
} from '~/lib/hooks/article';

export const useFindManyArticle = () => {
  const { data: session } = useSession();
  return useFindManyArticleHook({
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

export const useCreateArticle = () => {
  return useCreateArticleHook({
    onError: (error) => {
      toast.error('Failed to create article', {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success('Article created successfully');
    },
  });
};

export const useUpdateArticle = () => {
  return useUpdateArticleHook({
    onError: (error) => {
      toast.error('Failed to update article', {
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.success('Article updated successfully');
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
