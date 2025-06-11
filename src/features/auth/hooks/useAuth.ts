'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { signIn, signUp } from '~/lib/auth-client';
import { useRouter } from '~/lib/i18n/navigation';

import type { LoginFormValues, SignupFormValues } from '../schemas/auth';

export function useLogin() {
  const t = useTranslations();
  const router = useRouter();

  const loginFn = async (values: LoginFormValues) => {
    const { email, password } = values;

    return signIn.email({ email, password }, {
      onError: (error) => {
        if (error.error.code === 'INVALID_CREDENTIALS') {
          toast.error(t('common.result.error.login'), {
            description: t('common.result.error.invalid-credentials'),
          });
        } else {
          toast.error(t('common.result.error.login'), {
            description: t('common.result.error.unknown'),
          });
        }
      },
      onSuccess: () => {
        toast.success(t('common.result.success.login'));
        router.push('/articles');
      },
    });
  };

  const { isPending, mutateAsync: login } = useMutation({ mutationFn: loginFn });

  return { isPending, login };
}

export function useSignup() {
  const t = useTranslations();
  const router = useRouter();

  const signupFn = async (values: SignupFormValues) => {
    const { email, name, password } = values;

    return signUp.email({ email, name, password }, {
      onError: (error) => {
        if (error.error.code === 'USER_ALREADY_EXISTS') {
          toast.error(t('common.result.error.signup'), {
            description: t('common.result.error.user-exists'),
          });
        } else {
          toast.error(t('common.result.error.signup'), {
            description: t('common.result.error.unknown'),
          });
        }
      },
      onSuccess: () => {
        toast.success(t('common.result.success.signup'));
        router.push('/login');
      },
    });
  };

  const { isPending, mutateAsync: signup } = useMutation({ mutationFn: signupFn });

  return { isPending, signup };
}
