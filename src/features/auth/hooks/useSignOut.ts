'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signOut } from '~/lib/auth-client';

export function useSignOut() {
  const router = useRouter();

  const logout = () => {
    signOut({
      fetchOptions: {
        onError: () => {
          toast.error('Failed to sign out');
        },
        onSuccess: () => {
          toast.success('Signed out successfully');
          router.push('/login');
        },
      },
    });
  };

  return { logout };
}
