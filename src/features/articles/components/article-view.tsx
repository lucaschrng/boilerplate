'use client';

import { type Article, ArticleStatus, ArticleVisibility, type User } from '@prisma/client';
import dayjs from 'dayjs';
import { GlobeIcon, LockIcon, PencilIcon } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import LinkButton from '~/components/ui/link-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { useSession } from '~/lib/auth-client';
import { cn } from '~/lib/utils/cn';

export function ArticleView({
  article,
}: {
  article: { author: User } & Article;
}) {
  const { data: session } = useSession();
  const isAuthor = session?.user.id === article.author.id;

  return (
    <>
      <div className="max-w-2xl w-full flex justify-between py-2 mb-3">
        <div className="flex items-center gap-2">
          {isAuthor ? (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {article.visibility === ArticleVisibility.PUBLIC ? (
                      <GlobeIcon className="size-4 text-muted-foreground" />
                    ) : (
                      <LockIcon className="size-4 text-muted-foreground" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{article.visibility === ArticleVisibility.PUBLIC ? 'Public article' : 'Private article'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Badge
                className={cn(article.status === ArticleStatus.PUBLISHED && 'bg-blue-500 text-white')}
                variant={article.status === ArticleStatus.PUBLISHED ? 'default' : 'secondary'}
              >
                {article.status === ArticleStatus.PUBLISHED ? 'Published' : 'Draft'}
              </Badge>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Written by <span className="font-semibold text-foreground">{article.author.name}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Last updated {dayjs(article.updatedAt).format('MMM D, YYYY')}
          </span>
          {isAuthor && (
            <LinkButton href={`/articles/${article.id}/edit`} size="sm">
              <PencilIcon className="size-4 mr-1" />
              Edit
            </LinkButton>
          )}
        </div>
      </div>

      <div className="grid gap-6 pb-18 pt-2">
        <h1 className="text-5xl font-serif">{article.title}</h1>
        <div className="whitespace-pre-wrap text-justify">{article.content}</div>
      </div>
    </>
  );
}
