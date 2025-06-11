'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Link } from '~/lib/i18n/navigation';

import { useLogin } from '../hooks/useAuth';
import { createLoginSchema, type LoginFormValues } from '../schemas/auth';

export function LoginForm() {
  const t = useTranslations();

  const { isPending, login } = useLogin();

  const loginSchema = createLoginSchema(t);
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    await login(values);
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
        <CardDescription>
          {t('auth.login.description')}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-4">
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
                {t('auth.login.submit')}
              </Button>
              <Button className="w-full" disabled variant="outline">
                {t('auth.login.with-google')}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t('auth.login.no-account')}{' '}
              <Link className="underline" href="/signup">
                {t('common.actions.signup')}
              </Link>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
