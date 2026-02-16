import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://meilleur-choix.com',
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
