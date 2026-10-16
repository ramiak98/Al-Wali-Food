// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.alwalifood.com',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
