import { prisma } from './config/database';

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
    }
  });
  console.log(JSON.stringify(articles, null, 2));
}

main().catch(console.error);
