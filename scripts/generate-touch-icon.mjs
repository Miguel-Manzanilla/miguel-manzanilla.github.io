/**
 * Genera public/apple-touch-icon.png (180x180) a partir de public/favicon.png.
 *
 * iOS no acepta el favicon del sitio como icono de portada: sin este archivo
 * aparece un icono vacio al guardar la pagina en la pantalla de inicio.
 *
 *   node scripts/generate-touch-icon.mjs
 */
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = resolve(ROOT, 'public/favicon.png')
const OUT = resolve(ROOT, 'public/apple-touch-icon.png')

await sharp(SOURCE)
  .resize(180, 180, { fit: 'cover' })
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log(`OK  ${OUT}`)
