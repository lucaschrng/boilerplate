'use client';

import type { NextPage } from 'next';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { signUp } from '~/lib/auth-client';

const Signup: NextPage = () => {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(8),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, name, password } = values;
    await signUp.email({ email, name, password }, {
      onError: (error) => {
        if (error.error.code === 'USER_ALREADY_EXISTS') {
          toast.error('Fail to sign up', {
            description: 'An account with that email already exists',
          });
        } else {
          toast.error('Fail to sign up', {
            description: 'An unknown error occurred',
          });
        }
      },
      onSuccess: () => {
        toast.success('Account created successfully');
        router.push('/login');
      },
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your email and choose a password to create an account
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
                      <FormLabel>Full Name</FormLabel>
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
                      <FormLabel>Email</FormLabel>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">
                  Sign Up
                </Button>
                <Button className="w-full" disabled variant="outline">
                  Sign up with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link className="underline" href="/login">
                  Login
                </Link>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
