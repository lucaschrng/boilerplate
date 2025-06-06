import type { Metadata } from 'next';

import { CreateArticleForm } from '~/features/articles';

export const metadata: Metadata = {
  description: 'Create a new article for your blog',
  title: 'Create New Article',
};

export default function NewArticlePage() {
  return (
    <CreateArticleForm />
  );
}
