import { hasLocale } from 'next-intl';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { redirect } from '~/lib/i18n/navigation';
import { routing } from '~/lib/i18n/routing';
import { auth } from '~/server/auth';

const Layout: React.FC<PropsWithChildren<{ params: Promise<{ locale: string }> }>> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect({ href: '/articles', locale });
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  );
};

export default Layout;
