const { PrismaClient } = require('./src/generated/prisma');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function dump() {
  const all = await prisma.pageSeo.findMany({
    include: { category: true },
    orderBy: [{ pageType: 'asc' }, { label: 'asc' }]
  });

  console.log(`=== FULL DUMP OF ALL ${all.length} PAGE SEO RECORDS ===`);
  all.forEach((r, i) => {
    console.log(`[${i + 1}] ID: ${r.id} | Type: ${r.pageType} | Slug: "${r.slug}" | Label: "${r.label}" | Category: ${r.category?.name || 'N/A'}`);
    console.log(`    MetaTitle: ${r.metaTitle}`);
    console.log(`    Canonical: ${r.canonicalUrl}`);
    console.log(`    Keywords:  ${JSON.stringify(r.extraMeta)}`);
    console.log(`    Robots:    ${r.robots} | Active: ${r.isActive}`);
  });

  await prisma.$disconnect();
  await pool.end();
}

dump().catch(e => { console.error(e); process.exit(1); });
