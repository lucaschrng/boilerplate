import type { Metadata } from 'next';

import { MyArticlesList } from '~/features/articles';

export const metadata: Metadata = {
  description: 'My articles',
  title: 'My Articles',
};

export default function MyArticlesPage() {
  return (
    <MyArticlesList />
  );
}
