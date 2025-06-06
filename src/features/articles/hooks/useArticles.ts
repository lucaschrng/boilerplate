'use client';

import { toast } from 'sonner';

import { useCreateArticle as useCreateArticleHook } from '~/lib/hooks/article';


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
