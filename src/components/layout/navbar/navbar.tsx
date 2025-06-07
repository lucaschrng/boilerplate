import Link from 'next/link';

import LinkButton from '~/components/ui/link-button';

import { UserMenu } from './user-menu';

export async function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex bg-background border-b divide-x">
      <div className="flex items-center justify-between pl-6 pr-4 py-4 flex-1">
        <Link className="text-lg font-medium" href="/">Boilerplate</Link>
        <div className="flex gap-1">
          <LinkButton href="/" variant="ghost">Articles</LinkButton>
          <LinkButton href="/articles/my" variant="ghost">My Articles</LinkButton>
        </div>
      </div>
      <div className="flex items-center p-3.5">
        <UserMenu />
      </div>
    </nav>
  );
}
