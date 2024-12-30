import fs from 'fs';
import xmlbuilder from 'xmlbuilder';
import dotenv from 'dotenv';
import { SEO_CONFIG } from './seo.config';

dotenv.config({
  path: 'src/environments/.env',
});

const SITEMAP_FILE_PATH = './src/seo/production/sitemap.xml';
const DOMAIN_URL = process.env['APP_DOMAIN_URL'];

console.log('Start creating sitemap.xml...');

const root = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
root.att('xmlns:image', 'https://www.google.com/schemas/sitemap-image/1.1');

// Get SEO for static pages
const staticPages = Object.values(SEO_CONFIG.pages).filter(
  (page) => page.url !== undefined,
);

staticPages.forEach((page) => {
  const url = root.ele('url');
  url.ele('loc', `${DOMAIN_URL}/${page.url}`);
  url.ele('changefreq', page.changeFrequency);
  url.ele('priority', page.priority);

  if (page.image) {
    const imageNode = url.nod('image:image');
    imageNode.ele('image:loc', `${DOMAIN_URL}/${page.image.url}`);
  }
});


fs.writeFileSync(SITEMAP_FILE_PATH, root.end({ pretty: true }));

console.log(`Created ${staticPages.length} sitemap entries...`);
console.log('End creating sitemap.xml...');