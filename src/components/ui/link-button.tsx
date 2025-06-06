import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import Link, { type LinkProps } from 'next/link';

import { cn } from '~/lib/utils/cn';

import { buttonVariants } from './button';

type LinkButtonProps = {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
} &
  LinkProps & VariantProps<typeof buttonVariants>;

export default function LinkButton({
  children,
  className,
  size,
  variant,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
