async function test() {
  const pages = [
    { name: 'Home', url: 'http://localhost:3000' },
    { name: 'About', url: 'http://localhost:3000/about' },
    { name: 'Contact', url: 'http://localhost:3000/contact' },
    { name: 'Advertise', url: 'http://localhost:3000/advertise' },
    { name: 'News', url: 'http://localhost:3000/news' },
    { name: 'Privacy Policy', url: 'http://localhost:3000/privacy-policy' },
    { name: 'Banking & Finance', url: 'http://localhost:3000/banking-finance' },
  ];

  for (const p of pages) {
    try {
      const res = await fetch(p.url);
      const html = await res.text();

      const titleMatch = html.match(/<title>([^<]*)<\/title>/);
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);

      console.log(`\n=== ${p.name} (${p.url}) ===`);
      console.log('Title:      ', titleMatch ? titleMatch[1] : 'NOT FOUND');
      console.log('Description:', descMatch ? descMatch[1].substring(0, 70) + '...' : 'NOT FOUND');
      console.log('Canonical:  ', canonMatch ? canonMatch[1] : 'NOT FOUND');
    } catch (e) {
      console.error(`Failed ${p.name}:`, e.message);
    }
  }

  process.exit(0);
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
