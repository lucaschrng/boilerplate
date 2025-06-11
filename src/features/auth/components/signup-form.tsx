'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Link } from '~/lib/i18n/navigation';

import { useSignup } from '../hooks/useAuth';
import { createSignupSchema, type SignupFormValues } from '../schemas/auth';

export function SignupForm() {
  const t = useTranslations();
  const { isPending, signup } = useSignup();

  const signupSchema = createSignupSchema(t);
  const form = useForm<SignupFormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupFormValues) => {
    await signup(values);
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('auth.signup.title')}</CardTitle>
        <CardDescription>
          {t('auth.signup.description')}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.form.name')}</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.form.email')}</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('common.form.password')}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" isLoading={isPending} type="submit">
                {t('auth.signup.submit')}
              </Button>
              <Button className="w-full" disabled variant="outline">
                {t('auth.signup.with-google')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('auth.signup.has-account')}{' '}
              <Link className="underline" href="/login">
                {t('common.actions.login')}
              </Link>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
