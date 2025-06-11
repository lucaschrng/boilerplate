'use client';

import { LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { useLogout } from '~/features/auth';
import { useSession } from '~/lib/auth-client';

export function UserMenu({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations();
  const { data: session } = useSession();
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Button className="flex w-full h-full" size="icon" variant="ghost">
          <Avatar className="rounded-sm size-10">
            <AvatarImage className="rounded-sm" src={session?.user.image ?? undefined} />
            <AvatarFallback className="rounded-sm">{session?.user.name?.split(' ').map((name) => name[0]).join('')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-lg">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-sm">
              <AvatarImage className="rounded-sm" src={session?.user.image ?? undefined} />
              <AvatarFallback className="rounded-sm">{session?.user.name?.split(' ').map((name) => name[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{session?.user.name}</span>
              <span className="truncate text-xs">{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          {t('common.actions.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  );
}
