/**
 * Fuente unica de verdad para los metadatos del sitio.
 * Todo lo que aparece en <head>, JSON-LD o el footer se deriva de aqui.
 */

export const SITE = {
  /** Nombre corto, usado en la cabecera y como sufijo del titulo. */
  NAME: 'Miguel Manzanilla Ocana',
  /** Nombre con tilde, para textos visibles. */
  DISPLAY_NAME: 'Miguel Manzanilla Ocaña',
  /** Rol principal. */
  ROLE: 'Desarrollador Full Stack',
  /** Titulo completo para <title> y Open Graph. */
  TITLE: 'Miguel Manzanilla Ocaña — Desarrollador Full Stack',
  DESCRIPTION:
    'Desarrollador Full Stack en VIEWNEXT. Construyo interfaces bonitas y funcionales con Java, JavaScript, TypeScript, Python, SQL y Astro. Disponible para nuevos retos.',
  /** Usado para el JSON-LD de Person. */
  LOCATION: {
    city: 'Toledo',
    region: 'Madrid',
    country: 'ES',
  },
  EMAIL: 'miguelmanzanillaocana@gmail.com',
  LOCALE: 'es_ES',
  LANG: 'es',
} as const

export const LINKS = {
  github: 'https://github.com/Miguel-Manzanilla',
  linkedin: 'https://www.linkedin.com/in/miguel-manzanilla-ocaña-66327b280/',
  mail: `mailto:${SITE.EMAIL}`,
  viewnext: 'https://www.viewnext.com',
  servicomtel: 'https://www.servicomtel.es',
  cv: '/CV.pdf',
} as const

/** Red de seguridad social para la cabecera. */
export const NAV_LINKS = [
  { text: 'Experiencia', href: '/work' },
  { text: 'Proyectos', href: '/portfolio' },
  { text: 'GitHub', href: LINKS.github, external: true },
] as const
