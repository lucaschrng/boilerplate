import { Transition } from '@headlessui/react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '~/lib/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        icon: 'size-9',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      },
    },
  },
);

const loaderVariants = cva(
  'animate-spin mr-0 transition-all duration-200 data-closed:opacity-0 data-closed:size-0',
  {
    defaultVariants: {
      size: 'default',
    },
    variants: {
      size: {
        default: 'size-4 data-closed:-mr-2',
        icon: 'size-4 data-closed:-mr-2',
        lg: 'size-4 data-closed:-mr-2',
        sm: 'size-3.5 data-closed:-mr-1.5',
      },
    },
  },
);

function Button({
  asChild = false,
  className,
  isLoading = false,
  size,
  variant,
  ...props
}: {
  asChild?: boolean
  isLoading?: boolean
} &
  React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot="button"
      disabled={isLoading || props.disabled}
      {...props}
    >
      <Transition show={isLoading}>
        <Loader2 className={cn(loaderVariants({ size }))} />
      </Transition>
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
