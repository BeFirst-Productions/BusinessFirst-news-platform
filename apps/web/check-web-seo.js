async function testPages() {
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Category: Banking & Finance', path: '/banking-finance' },
    { name: 'Category: Aviation & Aerospace', path: '/aviation-aerospace' },
    { name: 'Static: About Us', path: '/about' },
    { name: 'Static: Contact', path: '/contact' },
    { name: 'Policy: Privacy Policy', path: '/privacy-policy' },
    { name: 'Static: Latest News', path: '/news' },
  ];

  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r.path}`);
      const html = await res.text();
      
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
      const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);

      console.log(`\n=== PAGE: ${r.name} (${r.path}) ===`);
      console.log('Status:', res.status);
      console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');
      console.log('Description:', descMatch ? descMatch[1].slice(0, 70) + '...' : 'NONE');
      console.log('Canonical:', canMatch ? canMatch[1] : 'NONE');
      console.log('Robots:', robotsMatch ? robotsMatch[1] : 'NONE');
    } catch (err) {
      console.error(`Error fetching ${r.name}:`, err.message);
    }
  }
}

testPages();
