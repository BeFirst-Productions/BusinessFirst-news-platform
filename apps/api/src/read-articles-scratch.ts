import { prisma } from './config/database';

async function main() {
  const articles = await prisma.article.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    }
  });
  console.log("ARTICLES IN DATABASE:");
  for (const article of articles) {
    console.log(`\n--- Title: ${article.title} ---`);
    console.log(article.content);
  }
}

main().catch(console.error);
