import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { auth } from '~/server/auth';

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }
  return (
    <>{children}</>
  );
};

export default Layout;
