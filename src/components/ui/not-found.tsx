'use client';

import { ArrowLeftIcon, FileQuestionIcon } from 'lucide-react';

import LinkButton from './link-button';

interface NotFoundProps {
  backTo?: {
    href: string;
    label: string;
  };
  description?: string;
  title?: string;
}

export function NotFound({
  backTo = {
    href: '/',
    label: 'Go back home',
  },
  description = 'The resource you are looking for does not exist or has been moved.',
  title = 'Not Found',
}: NotFoundProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <FileQuestionIcon className="size-8 text-muted-foreground" />
      <h1 className="mt-4 text-3xl font-serif">{title}</h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <LinkButton className="mt-6" href={backTo.href} variant="link">
        <ArrowLeftIcon className="size-4" />
        {backTo.label}
      </LinkButton>
    </div>
  );
}
