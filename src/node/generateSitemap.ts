import { writeFileSync } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const currentDate = new Date().toISOString().split('T')[0];

// List your site URLs here
const urls = [{ url: '/', changefreq: 'monthly', priority: 1, lastmod: currentDate }];

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: 'https://www.invenus.dev' });
  Readable.from(urls).pipe(stream);
  const xmlString = await streamToPromise(stream).then((data) => data.toString());
  writeFileSync('public/sitemap.xml', xmlString);
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch((error) => {
  console.error('Failed to generate sitemap:', error);
});
