import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://analytics-ds.github.io',
  base: '/meilleur-choix',
  output: 'static',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
