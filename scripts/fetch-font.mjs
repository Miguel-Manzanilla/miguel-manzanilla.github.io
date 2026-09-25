/**
 * Descarga la version variable de Inter (woff2) desde Google Fonts.
 *
 * Se ejecuta a mano: `node scripts/fetch-font.mjs`
 * El .woff2 queda commiteado en public/fonts/, asi el sitio no depende de
 * Google Fonts en tiempo de ejecucion.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = resolve(ROOT, 'public/fonts')
const OUT_FILE = resolve(OUT_DIR, 'inter-variable.woff2')

// Sin un User-Agent moderno, Google Fonts responde con .ttf en vez de .woff2.
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'

async function main() {
  const css = await fetch(CSS_URL, {
    headers: { 'User-Agent': UA },
  }).then((res) => res.text())

  // Nos interesa la fuente variable: cubre 100..900 en un solo archivo.
  const match = css.match(
    /font-weight:\s*100\s+900;[\s\S]*?url\((https:\/\/[^)]+\.woff2)\)/,
  )

  if (!match) {
    throw new Error(
      'No se encontro una fuente variable woff2 en la respuesta de Google Fonts.',
    )
  }

  const [, url] = match
  const font = await fetch(url, { headers: { 'User-Agent': UA } }).then((res) =>
    res.arrayBuffer(),
  )

  await mkdir(OUT_DIR, { recursive: true })
  await writeFile(OUT_FILE, Buffer.from(font))

  console.log(`OK  ${OUT_FILE}  ${(font.byteLength / 1024).toFixed(1)} KB`)
  console.log(`    origen: ${url}`)
}

main().catch((error) => {
  console.error('ERROR', error.message)
  process.exit(1)
})
