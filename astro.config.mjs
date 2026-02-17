import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://meilleur-classement.com',
  base: '/',
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
