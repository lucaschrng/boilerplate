'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { signOut } from '~/lib/auth-client';
import { useRouter } from '~/lib/i18n/navigation';

export function useLogout() {
  const t = useTranslations();
  const router = useRouter();

  const logout = () => {
    signOut({
      fetchOptions: {
        onError: () => {
          toast.error(t('common.result.error.logout'), {
            description: t('common.result.error.unknown'),
          });
        },
        onSuccess: () => {
          toast.success(t('common.result.success.logout'));
          router.push('/login');
        },
      },
    });
  };

  return { logout };
}
