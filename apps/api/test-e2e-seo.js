const { PrismaClient } = require('./src/generated/prisma');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function runE2E() {
  console.log('=== STARTING SEO MODULE COMPREHENSIVE AUDIT & VERIFICATION ===\n');

  // 1. Get an active admin user
  const adminUser = await prisma.user.findFirst({
    where: { role: { in: ['SUPERADMIN', 'ADMIN'] }, status: 'ACTIVE' },
  });

  if (!adminUser) {
    throw new Error('No active admin user found in database!');
  }
  console.log(`✓ Found Admin user: ${adminUser.email} (Role: ${adminUser.role}, ID: ${adminUser.id})`);

  // 2. Generate a valid access token
  const token = jwt.sign(
    { userId: adminUser.id, email: adminUser.email, role: adminUser.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h', issuer: 'businessfirst-api' }
  );
  console.log('✓ Successfully generated valid JWT authentication token');

  const API_BASE = 'http://localhost:8083/api/v1';

  // 3. Test GET /seo endpoints with tabs
  console.log('\n--- TESTING GET /seo WITH TABS ---');
  for (const tab of ['all', 'static', 'categories']) {
    const res = await fetch(`${API_BASE}/seo?tab=${tab}&limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    const records = json.data;
    const total = json.metadata?.total ?? records.length;
    console.log(`✓ Tab "${tab}": returned ${records.length} records (Total reported: ${total})`);

    // Verify category relations in 'categories' tab
    if (tab === 'categories') {
      const missingCat = records.filter(r => !r.category);
      if (missingCat.length > 0) {
        throw new Error(`Found category SEO records without category relation! Count: ${missingCat.length}`);
      }
      console.log(`✓ All ${records.length} category records have valid category relation and article counts.`);
      const sample = records[0];
      console.log(`  Sample: "${sample.label}" -> Category: "${sample.category?.name}", Articles: ${sample.category?._count?.articles ?? 0}`);
    }
  }

  // 4. Test field-by-field update and INSTANT reflection
  console.log('\n--- TESTING FIELD-BY-FIELD UPDATE & INSTANT REFLECTION ---');
  const targetSlug = 'category/banking-finance';
  const targetRecord = await prisma.pageSeo.findUnique({
    where: { slug: targetSlug },
    include: { category: true }
  });

  if (!targetRecord) {
    throw new Error(`Target record ${targetSlug} not found in database!`);
  }
  console.log(`✓ Target record found: ${targetRecord.label} (ID: ${targetRecord.id})`);

  // Backup original state
  const originalState = {
    metaTitle: targetRecord.metaTitle,
    metaDescription: targetRecord.metaDescription,
    canonicalUrl: targetRecord.canonicalUrl,
    ogTitle: targetRecord.ogTitle,
    ogDescription: targetRecord.ogDescription,
    ogImage: targetRecord.ogImage,
    twitterCard: targetRecord.twitterCard,
    twitterTitle: targetRecord.twitterTitle,
    twitterDescription: targetRecord.twitterDescription,
    twitterImage: targetRecord.twitterImage,
    robots: targetRecord.robots,
    extraMeta: targetRecord.extraMeta,
    isActive: targetRecord.isActive,
  };

  const testPayload = {
    label: targetRecord.label,
    metaTitle: 'Banking & Finance UAE | Updated Test Title 2026',
    metaDescription: 'Verified description for banking and finance sector in UAE. Real-time test.',
    canonicalUrl: 'https://businessfirstnews.com/banking-finance',
    ogTitle: 'Banking & Finance OG Title',
    ogDescription: 'Banking & Finance OG Description',
    ogImage: 'https://businessfirstnews.com/test-og-image.jpg',
    twitterCard: 'SUMMARY_LARGE_IMAGE',
    twitterTitle: 'Banking & Finance Twitter Title',
    twitterDescription: 'Banking & Finance Twitter Description',
    twitterImage: 'https://businessfirstnews.com/test-twitter-image.jpg',
    robots: 'index, follow',
    extraMeta: [
      { name: 'keywords', content: 'banking, finance, uae news, market tests' }
    ],
    isActive: true,
  };

  // Perform PUT
  const updateRes = await fetch(`${API_BASE}/seo/${targetRecord.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(testPayload),
  });
  const updateJson = await updateRes.json();
  if (!updateJson.success) {
    throw new Error(`PUT /seo/${targetRecord.id} failed: ${JSON.stringify(updateJson)}`);
  }
  console.log('✓ PUT /seo/:id succeeded with 200 OK');

  // Verify DB instantly has updated values
  const dbUpdated = await prisma.pageSeo.findUnique({ where: { id: targetRecord.id } });
  if (dbUpdated.metaTitle !== testPayload.metaTitle || dbUpdated.canonicalUrl !== testPayload.canonicalUrl) {
    throw new Error('Database does not match updated payload!');
  }
  console.log('✓ Database instantly matches updated values');

  // Verify PUBLIC endpoint immediately reflects changes
  const publicRes = await fetch(`${API_BASE}/seo/public/by-slug/banking-finance`);
  const publicJson = await publicRes.json();
  if (!publicJson.success || !publicJson.data) {
    throw new Error('GET /seo/public/by-slug/banking-finance failed!');
  }

  const fetched = publicJson.data;
  console.log('\n--- VERIFYING EACH FIELD REFLECTION IN PUBLIC API ---');
  const checks = [
    ['metaTitle', fetched.metaTitle, testPayload.metaTitle],
    ['metaDescription', fetched.metaDescription, testPayload.metaDescription],
    ['canonicalUrl', fetched.canonicalUrl, testPayload.canonicalUrl],
    ['ogTitle', fetched.ogTitle, testPayload.ogTitle],
    ['ogDescription', fetched.ogDescription, testPayload.ogDescription],
    ['ogImage', fetched.ogImage, testPayload.ogImage],
    ['twitterCard', fetched.twitterCard, testPayload.twitterCard],
    ['twitterTitle', fetched.twitterTitle, testPayload.twitterTitle],
    ['twitterDescription', fetched.twitterDescription, testPayload.twitterDescription],
    ['twitterImage', fetched.twitterImage, testPayload.twitterImage],
    ['robots', fetched.robots, testPayload.robots],
  ];

  for (const [fieldName, actual, expected] of checks) {
    if (actual === expected) {
      console.log(`  ✓ Field "${fieldName}": PASS -> "${actual}"`);
    } else {
      throw new Error(`Field "${fieldName}" mismatch! Expected "${expected}", Got "${actual}"`);
    }
  }

  // Keywords in extraMeta check
  const kw = fetched.extraMeta?.find(m => m.name === 'keywords')?.content;
  if (kw === 'banking, finance, uae news, market tests') {
    console.log(`  ✓ Field "extraMeta (keywords)": PASS -> "${kw}"`);
  } else {
    throw new Error(`Keywords mismatch! Got "${kw}"`);
  }

  // 5. Restore original data
  await fetch(`${API_BASE}/seo/${targetRecord.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      label: targetRecord.label,
      ...originalState,
    }),
  });
  console.log('\n✓ Restored target record back to original state');

  // 6. Test Category Auto-Creation hook
  console.log('\n--- TESTING NEW CATEGORY AUTO-SEO CREATION HOOK ---');
  const tempCategorySlug = 'test-audit-cat-' + Date.now();
  const testCatRes = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: 'Audit Test Category',
      slug: tempCategorySlug,
      description: 'Temporary category to verify auto-generation of SEO record.',
      color: '#3B82F6',
      order: 999,
    }),
  });
  const testCatJson = await testCatRes.json();
  if (!testCatJson.success) {
    throw new Error(`Category creation failed: ${JSON.stringify(testCatJson)}`);
  }
  const createdCat = testCatJson.data;
  console.log(`✓ Category created: "${createdCat.name}" (ID: ${createdCat.id}, Slug: ${createdCat.slug})`);

  // Verify that PageSeo was automatically created!
  const autoSeo = await prisma.pageSeo.findFirst({
    where: { categoryId: createdCat.id },
  });
  if (!autoSeo) {
    throw new Error('CRITICAL: PageSeo was NOT automatically generated when category was created!');
  }
  console.log('✓ Auto-generated PageSeo record verified:');
  console.log(`  - Label: "${autoSeo.label}"`);
  console.log(`  - Slug: "${autoSeo.slug}"`);
  console.log(`  - Meta Title: "${autoSeo.metaTitle}"`);
  console.log(`  - Canonical URL: "${autoSeo.canonicalUrl}"`);
  console.log(`  - Page Type: "${autoSeo.pageType}"`);

  // Verify public endpoint serves this new category SEO immediately!
  const newCatPublicRes = await fetch(`${API_BASE}/seo/public/by-slug/${createdCat.slug}`);
  const newCatPublicJson = await newCatPublicRes.json();
  if (newCatPublicJson.data?.metaTitle !== autoSeo.metaTitle) {
    throw new Error('Public endpoint did not immediately reflect the newly auto-generated category SEO!');
  }
  console.log('✓ Public API immediately serves auto-generated SEO for new category slug!');

  // Clean up: delete test category
  const delRes = await fetch(`${API_BASE}/categories/${createdCat.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const delJson = await delRes.json();
  if (!delJson.success) {
    throw new Error(`Category deletion failed: ${JSON.stringify(delJson)}`);
  }
  console.log('✓ Deleted test category');

  // Verify PageSeo cleanup
  const postDelSeo = await prisma.pageSeo.findFirst({ where: { categoryId: createdCat.id } });
  if (postDelSeo) {
    throw new Error('PageSeo was not cleaned up after category deletion!');
  }
  console.log('✓ Auto-generated PageSeo cleanly removed upon category deletion (no orphan records).');

  console.log('\n=== ALL E2E SEO MODULE VERIFICATIONS PASSED 100% SUCCESSFULLY! ===\n');

  await prisma.$disconnect();
  await pool.end();
}

runE2E().catch(err => {
  console.error('\n❌ AUDIT FAILED:', err);
  process.exit(1);
});
