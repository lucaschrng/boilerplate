'use client';

import { type Article, ArticleStatus, ArticleVisibility } from '@prisma/client';
import dayjs from 'dayjs';
import { GlobeIcon, LockIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import LinkButton from '~/components/ui/link-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { useDeleteArticle } from '~/lib/hooks';
import { cn } from '~/lib/utils/cn';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { mutate: deleteArticle } = useDeleteArticle();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-serif">{article.title}</CardTitle>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
        <CardDescription>
          {dayjs(article.updatedAt).format('MMM D, YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-muted-foreground">
          {article.content}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => deleteArticle({ where: { id: article.id } })} size="icon" variant="outline">
                <Trash2Icon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete article</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <LinkButton href={`/articles/${article.id}/edit`} size="icon">
                <PencilIcon className="size-4" />
              </LinkButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit article</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
