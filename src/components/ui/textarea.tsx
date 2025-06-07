import * as React from 'react';
import { useRef } from 'react';

import { cn } from '~/lib/utils/cn';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  autosize?: boolean;
}

function Textarea({ autosize, className, ...props }: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea || !autosize) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autosize) adjustHeight();
    props.onInput?.(e);
  };

  return (
    <textarea
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        autosize ? 'overflow-hidden resize-none min-h-[2.25rem]' : 'min-h-16',
        className,
      )}
      data-slot="textarea"
      onInput={handleInput}
      ref={textareaRef}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };

