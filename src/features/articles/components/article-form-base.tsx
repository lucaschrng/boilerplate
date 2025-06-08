'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArticleStatus, ArticleVisibility } from '@prisma/client';
import { GlobeIcon, LockIcon, SaveIcon, SendIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';

import { type BaseArticleFormValues, baseArticleSchema } from '../schemas/article';

export function ArticleFormBase({
  defaultValues,
  isPending,
  onSubmit,
}: {
  defaultValues: BaseArticleFormValues
  isPending: boolean
  onSubmit: (values: BaseArticleFormValues) => void
}) {
  const form = useForm<BaseArticleFormValues>({
    defaultValues,
    resolver: zodResolver(baseArticleSchema),
  });

  const handleSaveDraft = () => {
    form.setValue('status', ArticleStatus.DRAFT);
    void form.handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    form.setValue('status', ArticleStatus.PUBLISHED);
    void form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form} >
      <form>
        <div className="fixed w-full left-0 bottom-0 flex justify-center" >
          <div className="max-w-2xl w-full flex justify-between bg-background border rounded-t-xl p-2" >
            <FormField
              control={form.control}
              name="visibility"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value} >
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      < SelectContent >
                        <SelectItem value={ArticleVisibility.PUBLIC}> <GlobeIcon className="size-4" /> Public </SelectItem>
                        <SelectItem value={ArticleVisibility.PRIVATE} > <LockIcon className="size-4" /> Private </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  < FormMessage />
                </FormItem>
              )
              }
            />
            < div className="flex justify-end gap-2" >
              <Button
                disabled={isPending}
                isLoading={isPending && form.getValues('status') === ArticleStatus.DRAFT}
                onClick={handleSaveDraft}
                type="button"
                variant="secondary"
              >
                <SaveIcon className="size-4" />
                Save draft
              </Button>
              < Button
                disabled={isPending}
                isLoading={isPending && form.getValues('status') === ArticleStatus.PUBLISHED}
                onClick={handlePublish}
                type="button"
              >
                <SendIcon className="size-4" />
                Publish
              </Button>
            </div>
          </div>
        </div>
        <div className="grid gap-6 pb-18 pt-2 px-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    autoFocus
                    autosize
                    className="!bg-transparent border-none !ring-0 p-0 shadow-none !text-5xl font-serif rounded-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                < FormMessage />
              </FormItem>
            )}
          />
          < FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    autosize
                    className="!bg-transparent border-none !ring-0 p-0 shadow-none rounded-none"
                    placeholder="Write your article content here..."
                    {...field}
                  />
                </FormControl>
                < FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
