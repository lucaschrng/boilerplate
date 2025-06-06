import Link from 'next/link';

import LinkButton from '~/components/ui/link-button';

import { UserMenu } from './user-menu';

export async function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-primary/5 border-b">
      <Link className="text-lg font-medium" href="/">Boilerplate</Link>
      <div className="flex gap-1">
        <LinkButton href="/" variant="ghost">Articles</LinkButton>
        <LinkButton href="my-articles" variant="ghost">My Articles</LinkButton>
        <UserMenu className="ml-2" />
      </div>
    </nav>
  );
}
