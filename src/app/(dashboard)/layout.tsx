import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { Navbar } from '~/components/layout/navbar';
import { auth } from '~/server/auth';

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
