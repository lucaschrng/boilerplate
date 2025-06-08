import type { Metadata } from 'next';

import { CreateArticleForm } from '~/features/articles';

export const metadata: Metadata = {
  description: 'Create a new article for your blog',
  title: 'Create New Article',
};

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-2 rounded-lg px-3 py-1">
        <h1 className="text-2xl font-serif">New Article</h1>
        <div className="border-b border-muted-foreground flex-1" />
      </div>
      <CreateArticleForm />
    </div>
  );
}
