import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signIn, signUp } from '~/lib/auth-client';

import type { LoginFormValues, SignupFormValues } from '../schemas/auth';

export function useLogin() {
  const router = useRouter();

  const loginFn = async (values: LoginFormValues) => {
    const { email, password } = values;

    return signIn.email({ email, password }, {
      onError: (error) => {
        if (error.error.code === 'INVALID_CREDENTIALS') {
          toast.error('Failed to sign in', {
            description: 'Invalid email or password',
          });
        } else {
          toast.error('Failed to sign in', {
            description: 'An unknown error occurred',
          });
        }
      },
      onSuccess: () => {
        toast.success('Signed in successfully');
        router.push('/');
      },
    });
  };

  const { isPending, mutateAsync: login } = useMutation({ mutationFn: loginFn });

  return { isPending, login };
}

export function useSignup() {
  const router = useRouter();

  const signupFn = async (values: SignupFormValues) => {
    const { email, name, password } = values;

    return signUp.email({ email, name, password }, {
      onError: (error) => {
        if (error.error.code === 'USER_ALREADY_EXISTS') {
          toast.error('Failed to sign up', {
            description: 'An account with that email already exists',
          });
        } else {
          toast.error('Failed to sign up', {
            description: 'An unknown error occurred',
          });
        }
      },
      onSuccess: () => {
        toast.success('Account created successfully');
        router.push('/login');
      },
    });
  };

  const { isPending, mutateAsync: signup } = useMutation({ mutationFn: signupFn });

  return { isPending, signup };
}
