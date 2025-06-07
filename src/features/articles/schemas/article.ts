import { ArticleVisibility } from '@prisma/client';
import { z } from 'zod';

export const createArticleSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' }),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
  visibility: z.nativeEnum(ArticleVisibility),
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
