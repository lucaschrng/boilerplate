import { PrismaClient } from '@prisma/client';

import { auth } from '../../src/server/auth.js';
import { seedData } from './data.js';

const prisma = new PrismaClient();

async function main() {
  const results = {
    articles: [],
    users: [],
  };

  for (const userData of seedData.users) {
    const session = await auth.api.signUpEmail({
      body: {
        email: userData.email,
        name: userData.name,
        password: 'password',
      },
    });

    const articles = await prisma.article.createMany({
      data: userData.articles.map((article) => ({
        ...article,
        authorId: session.user.id,
      })),
    });

    results.users.push(session.user as never);
    results.articles.push(articles as never);
  }

  console.log(`Seeded ${results.users.length} users with their articles`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
