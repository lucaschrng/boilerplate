import { redirect } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { auth } from '~/server/auth';

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  );
};

export default Layout;
