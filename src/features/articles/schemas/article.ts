import { ArticleStatus, ArticleVisibility } from '@prisma/client';
import { z } from 'zod';

export const baseArticleSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' }),
  status: z.nativeEnum(ArticleStatus),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  visibility: z.nativeEnum(ArticleVisibility),
});

export type BaseArticleFormValues = z.infer<typeof baseArticleSchema>;
