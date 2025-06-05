import type { User } from '@prisma/client';

import { enhance } from '@zenstackhq/runtime';
import { NextRequestHandler } from '@zenstackhq/server/next';
import { headers } from 'next/headers';

import { auth } from '~/server/auth';
import { db } from '~/server/db';

// create an enhanced Prisma client with user context
async function getPrisma() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return enhance(db, { user: session?.user as User });
}

const handler = NextRequestHandler({ getPrisma, useAppDir: true });

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
