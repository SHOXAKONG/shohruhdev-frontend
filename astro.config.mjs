// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://shohruhdev.uz',

  integrations: [react()],

  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight',
    },
  },

  vite: {
    plugins: [tailwindcss()],

    server: {
      // Vite rejects requests whose Host header it doesn't know, so the
      // tunnel hostname has to be listed or it answers "Blocked request".
      allowedHosts: ['shoxakong.1master.uz'],
    },
  },
});