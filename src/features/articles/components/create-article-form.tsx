'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

import { useCreateArticle } from '../hooks/useArticles';
import { type Article, type CreateArticleFormValues, createArticleSchema } from '../schemas/article';

export function CreateArticleForm() {
  const [status, setStatus] = useState<Article['status']>('DRAFT');
  const { isPending, mutateAsync: createArticle } = useCreateArticle();

  const form = useForm<CreateArticleFormValues>({
    defaultValues: {
      content: '',
      title: '',
    },
    resolver: zodResolver(createArticleSchema),
  });

  const onSubmit = async (values: CreateArticleFormValues) => {
    await createArticle({
      data: {
        ...values,
        status,
      },
    });
  };

  const handleSaveAsDraft = () => {
    setStatus('DRAFT');
    void form.handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setStatus('PUBLISHED');
    void form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Create Article</CardTitle>
        <CardDescription>
          Fill in the details to create a new article
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome article" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        placeholder="Write your article content here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  isLoading={isPending && status === 'DRAFT'}
                  onClick={handleSaveAsDraft}
                  type="button"
                  variant="outline"
                >
                  Save as Draft
                </Button>
                <Button
                  isLoading={isPending && status === 'PUBLISHED'}
                  onClick={handlePublish}
                  type="button"
                >
                  Publish
                </Button>
              </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}
