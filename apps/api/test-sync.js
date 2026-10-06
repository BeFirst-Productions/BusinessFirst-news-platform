const { PrismaClient } = require('./src/generated/prisma');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function verifyAll() {
  const all = await prisma.pageSeo.findMany({
    orderBy: [{ pageType: 'asc' }, { label: 'asc' }],
  });

  console.log(`Audited ${all.length} records:`);
  let nullCanonicals = 0;
  all.forEach((r, idx) => {
    if (!r.canonicalUrl) nullCanonicals++;
    console.log(`[${idx+1}] ${r.label.padEnd(38)} | Canonical: ${r.canonicalUrl || 'MISSING'}`);
  });
  console.log(`\nTotal with missing canonical: ${nullCanonicals}`);

  await prisma.$disconnect();
  await pool.end();
}

verifyAll().catch(console.error);
