import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? 'https://miguel-manzanilla.github.io'
    : 'http://localhost:4321',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    // El sitemap es lo que permite que Google indexe /work y /portfolio.
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    build: {
      // Aviso a partir de 250 KB: el bundle de este sitio deberia quedar muy
      // por debajo, asi que superarlo suele significar que se ha colado una
      // dependencia pesada (como estuvo pasando con moment-timezone, 847 KB).
      chunkSizeWarningLimit: 250,
    },
  },
})
