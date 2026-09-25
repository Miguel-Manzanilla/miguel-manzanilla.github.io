/**
 * Datos del CV en un único sitio.
 *
 * Antes estos datos estaban duplicados entre `ExperienceCard.astro` y
 * `work.astro` (y ya desincronizados: faltaba el puesto actual de
 * VIEWNEXT en la página /work). Ahora ambas páginas leen de aquí.
 */

import { LINKS } from './site'

export type Experience = {
  position: string
  company: string
  start: string
  /** Texto mostrado; los puestos en curso usan 'Actualidad'. */
  end: string
  link: string
  tasks: string[]
}

/** Del más reciente al más antiguo. */
export const EXPERIENCE: Experience[] = [
  {
    position: 'Desarrollador Full Stack',
    company: 'VIEWNEXT',
    start: 'Septiembre 2024',
    end: 'Actualidad',
    link: LINKS.viewnext,
    tasks: [
      'Desarrollo de aplicaciones web y APIs REST.',
      'Construcción de interfaces accesibles y responsivas.',
      'Colaboración en equipos ágiles junto a QA y producto.',
    ],
  },
  {
    position: 'Desarrollador Java (Prácticas)',
    company: 'VIEWNEXT',
    start: 'Abril 2024',
    end: 'Septiembre 2024',
    link: LINKS.viewnext,
    tasks: [
      'Desarrollo de aplicaciones en Java.',
      'Colaboración en proyectos de equipo.',
      'Implementación de soluciones innovadoras.',
    ],
  },
  {
    position: 'Técnico de Redes (Prácticas)',
    company: 'Servicomtel (Talavera de la Reina)',
    start: 'Marzo 2022',
    end: 'Mayo 2022',
    link: LINKS.servicomtel,
    tasks: [
      'Mantenimiento de redes y sistemas.',
      'Soporte técnico a usuarios.',
      'Documentación de procesos y procedimientos.',
    ],
  },
]

export type Education = {
  title: string
  institution: string
  duration: string
}

export const EDUCATION: Education[] = [
  {
    title: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
    institution: 'IES Ribera del Tajo',
    duration: '2022 - 2024',
  },
  {
    title: 'Grado Medio en Sistemas Microinformáticos y Redes',
    institution: 'IES Ribera del Tajo',
    duration: '2020 - 2022',
  },
]

export const LANGUAGES = [
  { language: 'Castellano', level: 'Nativo' },
  { language: 'Inglés', level: 'Nivel B1' },
]

/** Habilidades técnicas agrupadas por área, para la página /work. */
export const SKILL_GROUPS = [
  {
    label: 'Lenguajes',
    skills: ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL', 'PL/SQL'],
  },
  {
    label: 'Frontend',
    skills: ['HTML5', 'CSS', 'React', 'Astro', 'Tailwind CSS'],
  },
  {
    label: 'Backend y datos',
    skills: ['Node.js', 'Spring Boot', 'Oracle Database', 'REST APIs'],
  },
  {
    label: 'Móvil y sistemas',
    skills: ['Android Studio', 'Windows', 'Unix'],
  },
]

/** Versión plana, para chips y etiquetas. */
export const TECH_SKILLS = SKILL_GROUPS.flatMap((group) => group.skills)

export type Project = {
  title: string
  link: string
  description: string
  /** Etiqueta de la tecnología principal, se muestra como badge. */
  tech: string
}

/** Del más destacado al más sencillo. */
export const PROJECTS: Project[] = [
  {
    title: 'VideoJuego Super Pang',
    link: 'https://github.com/Miguel-Manzanilla/VideoJuego-Super-Pang-MMO',
    description: 'Juego tipo arcade con multijugador en red.',
    tech: 'Java',
  },
  {
    title: 'Buscaminas Android',
    link: 'https://github.com/Miguel-Manzanilla/Buscaminas-Android_Java',
    description: 'Clásico Buscaminas con interfaz Android nativa.',
    tech: 'Java / Android',
  },
  {
    title: 'Lista Compra Android',
    link: 'https://github.com/Miguel-Manzanilla/Lista_Compra-Android_Java',
    description:
      'App para gestionar listas de la compra con persistencia local.',
    tech: 'Java / Android',
  },
  {
    title: 'Reproductor Media Android',
    link: 'https://github.com/Miguel-Manzanilla/Reproductor_Media-Android_Java',
    description: 'Reproductor de audio y vídeo para Android.',
    tech: 'Java / Android',
  },
  {
    title: 'Cliente FTP Gráfico',
    link: 'https://github.com/Miguel-Manzanilla/ClienteFTP_Grafico-Java_WindowBuilder',
    description: 'Cliente FTP de escritorio con interfaz Swing.',
    tech: 'Java / Swing',
  },
  {
    title: 'Número Secreto',
    link: 'https://github.com/Miguel-Manzanilla/Numero_Secreto-Cliente_Servidor-Python',
    description: 'Juego cliente-servidor sobre sockets en Python.',
    tech: 'Python',
  },
]

/** Instituciones y formación continua. Sin enlace cuando no hay web pública. */
export const STUDIES = [
  { institution: 'IES Ribera del Tajo', link: null },
  { institution: 'IES Los Navalmorales', link: null },
  { institution: 'Udemy', link: 'https://www.udemy.com/' },
] as const
