"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const sitemap_1 = require("sitemap");
const stream_1 = require("stream");
const currentDate = new Date().toISOString().split('T')[0];
// List your site URLs here
const urls = [{ url: '/', changefreq: 'monthly', priority: 1, lastmod: currentDate }];
async function generateSitemap() {
    const stream = new sitemap_1.SitemapStream({ hostname: 'https://www.invenus.dev' });
    stream_1.Readable.from(urls).pipe(stream);
    const xmlString = await (0, sitemap_1.streamToPromise)(stream).then((data) => data.toString());
    (0, fs_1.writeFileSync)('public/sitemap.xml', xmlString);
    console.log('Sitemap generated successfully!');
}
generateSitemap().catch((error) => {
    console.error('Failed to generate sitemap:', error);
});
