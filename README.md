# Portafolio — Miguel Manzanilla Ocaña

Sitio personal y portafolio profesional, construido con
[Astro](https://astro.build), React islands y Tailwind CSS. Desplegado en
GitHub Pages.

## Puesta en marcha

```bash
pnpm install     # o: npm install
pnpm dev         # servidor de desarrollo en http://localhost:4321
pnpm build       # genera el sitio estatico en dist/
pnpm preview     # sirve dist/ para comprobar el resultado
```

## Comandos

| Comando            | Qué hace                                             |
| ------------------ | ---------------------------------------------------- |
| `pnpm dev`         | Servidor de desarrollo con hot reload.               |
| `pnpm build`       | Compila el sitio estatico en `dist/`.                |
| `pnpm preview`     | Sirve `dist/` localmente.                            |
| `pnpm check`       | Comprueba los tipos con `astro check`.               |
| `pnpm format`      | Formatea el codigo con Prettier.                     |
| `pnpm assets:font` | Descarga la fuente Inter variable a `public/fonts/`. |
| `pnpm assets:og`   | Regenera la imagen Open Graph.                       |

## Estructura

```
src/
  components/       Tarjetas de la portada y componentes de UI (shadcn)
    sections/       Cada tarjeta del home es un componente
    ui/             Primitivas de shadcn/ui
  layouts/          Plantillas de pagina
  lib/
    site.ts         Metadatos del sitio: nombre, enlaces, contacto
    cv.ts           Datos del CV (experiencia, estudios, proyectos...)
  pages/            Rutas: /, /work, /portfolio, 404
  scripts/          Codigo que se ejecuta en el navegador
  styles/           Tailwind y variables del tema
scripts/            Utilidades de mantenimiento (fuente, imagen OG, iconos)
```

Los datos personales (experiencia, proyectos, estudios) estan **todos** en
`src/lib/cv.ts`. Para actualizar el CV, edita solo ese fichero: el home, `/work`
y `/portfolio` se actualizan a la vez.

## Notas de mantenimiento

**Gestor de paquetes: pnpm.** Se eliminó `package-lock.json`; tener dos
lockfiles hace que divergan y rompan los installs. Los workflows usan
`pnpm install --frozen-lockfile`.

**`@astrojs/check` está pineado a `0.9.4`.** A partir de `0.9.5` el paquete
dejó de incluir el campo `main` en su `package.json`, y el detector de Astro 4
comprueba las dependencias con el paquete `resolve`, que solo mira `main`. El
resultado es que `astro check` cree que la dependencia no está instalada y se
ofrezca a instalarla interactivamente, rompiendo el CI. Al subir a Astro 5 se
puede deshacer el pin.

**Fuente autoalojada.** Inter se sirve desde `public/fonts/` en vez de Google
Fonts: evita una conexión de terceros y el `@import` que bloqueaba el render.
Para regenerarla, `pnpm assets:font`.

**Imagen Open Graph.** `public/og-image.png` la genera
`scripts/generate-og-image.mjs`. Si cambias el nombre o el rol, ejecuta
`pnpm assets:og` y actualiza `SITE` en `src/lib/site.ts`.

**Límite de tamaño de bundle.** `astro.config.ts` avisa a partir de 250 KB por
chunk. Sirve para detectar dependencias pesadas que se cuelan sin darte cuenta.

## Despliegue

Cada `push` a `main` dispara `.github/workflows/deploy.yml`, que compila y
publica en GitHub Pages. `.github/workflows/quality.yml` comprueba tipos,
formato y build en cada push y pull request.

El proyecto esta configurado para GitHub Pages
(`https://miguel-manzanilla.github.io`). `netlify.toml` y `vercel.json` se
mantienen por si algun dia se cambia de hosting.

## Licencia

MIT.
