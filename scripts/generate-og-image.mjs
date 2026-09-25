/**
 * Genera la imagen Open Graph del sitio (public/og-image.png).
 *
 * Antes, `HeadSEO.astro` apuntaba a `View1.png`, un archivo que no existia en
 * public/, asi que todos los previews al compartir en redes salian rotos.
 *
 * Se ejecuta a mano cuando cambia el nombre o el rol:
 *   node scripts/generate-og-image.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/og-image.png')

const WIDTH = 1200
const HEIGHT = 630

// Paleta alineada con las variables CSS de src/styles/globals.css.
const BG_LIGHT = '#faf9f9'
const BG_DARK = '#1c1917'
const ORANGE = '#f97316'
const ORANGE_DARK = '#ea580c'
const MUTED_LIGHT = '#78716c'
const MUTED_DARK = '#a8a29e'
const WHITE = '#fafaf9'

const NAME = 'Miguel Manzanilla Ocaña'
const ROLE = 'Desarrollador Full Stack'
const STACK = 'Java · TypeScript · Python · SQL · Astro · React'
const SITE_URL = 'miguel-manzanilla.github.io'

/** Escapa el texto para poder insertarlo en el SVG sin romperlo. */
const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildSvg(scheme) {
  const dark = scheme === 'dark'
  const bg = dark ? BG_DARK : BG_LIGHT
  const muted = dark ? MUTED_DARK : MUTED_LIGHT
  const heading = dark ? WHITE : BG_DARK

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ORANGE}"/>
      <stop offset="100%" stop-color="${ORANGE_DARK}"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${bg}"/>
  <rect x="0" y="0" width="${WIDTH}" height="10" fill="url(#accent)"/>

  <g font-family="Segoe UI, Inter, Helvetica, Arial, sans-serif">
    <text x="80" y="196" font-size="30" font-weight="600" fill="${ORANGE}" letter-spacing="1">${escape(ROLE.toUpperCase())}</text>

    <text x="80" y="300" font-size="72" font-weight="800" fill="${heading}">${escape(NAME)}</text>

    <rect x="80" y="344" width="96" height="6" rx="3" fill="url(#accent)"/>

    <text x="80" y="428" font-size="30" fill="${muted}">${escape(STACK)}</text>

    <text x="80" y="536" font-size="28" fill="${muted}">${escape(SITE_URL)}</text>
  </g>
</svg>`
}

async function main() {
  await mkdir(dirname(OUT), { recursive: true })

  for (const scheme of ['light', 'dark']) {
    const target =
      scheme === 'light' ? OUT : resolve(ROOT, 'public/og-image-dark.png')

    await sharp(Buffer.from(buildSvg(scheme)))
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(target)

    console.log(`OK  ${target}`)
  }
}

main().catch((error) => {
  console.error('ERROR', error)
  process.exit(1)
})
