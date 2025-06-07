'use client';

import { toast } from 'sonner';

import { useSession } from '~/lib/auth-client';
import { useCreateArticle as useCreateArticleHook, useFindManyArticle as useFindManyArticleHook } from '~/lib/hooks/article';

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
