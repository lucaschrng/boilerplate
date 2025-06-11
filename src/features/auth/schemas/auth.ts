import { z } from 'zod';

export const createLoginSchema = (t: (key: string) => string) => z.object({
  email: z.string().email(t('common.validation.email')),
  password: z.string().min(8, t('common.validation.password-min-length')),
});

export const createSignupSchema = (t: (key: string) => string) => z.object({
  email: z.string().email(t('common.validation.email')),
  name: z.string().min(3, t('common.validation.name-min-length')),
  password: z.string().min(8, t('common.validation.password-min-length')),
});

// Type definitions remain the same
export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupFormValues = z.infer<ReturnType<typeof createSignupSchema>>;
