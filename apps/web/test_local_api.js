async function testLocalApi() {
  const res = await fetch('http://localhost:8083/api/v1/seo/public/by-slug/');
  const json = await res.json();
  console.log('Local API Home SEO:', json.data.metaTitle);
  console.log('Local API Home Canonical:', json.data.canonicalUrl);

  const aboutRes = await fetch('http://localhost:8083/api/v1/seo/public/by-slug/about');
  const aboutJson = await aboutRes.json();
  console.log('Local API About SEO:', aboutJson.data.metaTitle);

  const catRes = await fetch('http://localhost:8083/api/v1/seo/public/by-slug/banking-finance');
  const catJson = await catRes.json();
  console.log('Local API Category SEO:', catJson.data.metaTitle, catJson.data.canonicalUrl);

  process.exit(0);
}

testLocalApi().catch(e => {
  console.error(e);
  process.exit(1);
});
