import { z } from 'zod';

export const createArticleSchema = z.object({
  content: z
    .string()
    .min(10, { message: 'Content must be at least 10 characters long' }),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title cannot exceed 100 characters' }),
});

export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;

export const articleSchema = createArticleSchema.extend({
  authorId: z.string(),
  createdAt: z.string().or(z.date()),
  id: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  updatedAt: z.string().or(z.date()),
  visibility: z.enum(['PUBLIC', 'PRIVATE']),
});

export type Article = z.infer<typeof articleSchema>;
