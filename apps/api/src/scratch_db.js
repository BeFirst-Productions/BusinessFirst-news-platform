const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:postgres_dev_2024@localhost:5432/businessfirst_news?schema=public'
});

async function run() {
  const res = await pool.query('SELECT id, email, name, "isActive", "createdAt" FROM "Newsletter" ORDER BY "createdAt" DESC LIMIT 20');
  console.log('=== NEWSLETTER SUBSCRIBERS IN DB ===');
  console.log(JSON.stringify(res.rows, null, 2));
  pool.end();
}
run();
