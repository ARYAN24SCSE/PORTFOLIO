import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { generateSemanticHtml, generateJsonLd, getSiteDomain } from './src/data/generateStaticHtml'

function portfolioStaticGeneratorPlugin(): Plugin {
  return {
    name: 'vite-plugin-portfolio-static-generator',
    transformIndexHtml(html) {
      const domain = getSiteDomain();
      const canonicalUrl = `${domain}/`;
      const jsonLd = generateJsonLd();
      const semanticHtml = generateSemanticHtml();

      return html
        .replace(/<!-- %CANONICAL_URL% -->/g, canonicalUrl)
        .replace(/<!-- %OG_URL% -->/g, canonicalUrl)
        .replace(/<!-- %TWITTER_URL% -->/g, canonicalUrl)
        .replace(/<!-- %JSON_LD% -->/g, `<script type="application/ld+json">\n${jsonLd}\n  </script>`)
        .replace(/<!-- %STATIC_HTML% -->/g, `\n${semanticHtml}\n  `);
    },
    generateBundle() {
      const domain = getSiteDomain();
      const dateStr = new Date().toISOString().split('T')[0];
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${domain}/</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
      const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`;

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapContent,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsContent,
      });
    },
  };
}

export default defineConfig({
  plugins: [
    portfolioStaticGeneratorPlugin(),
    react(),
    tailwindcss(),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/gsap') || id.includes('@gsap')) {
            return 'gsap-vendor';
          }
          if (id.includes('node_modules/motion')) {
            return 'motion-vendor';
          }
        },
      },
    },
  },
})
