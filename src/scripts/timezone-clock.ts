/**
 * Reloj de la zona horaria sin dependencias.
 *
 * Antes esto usaba `moment-timezone`, que arrastraba ~850 KB de JavaScript
 * (moment + la base de datos de zonas horarias) para mostrar una hora.
 * `Intl.DateTimeFormat` viene en el navegador y hace lo mismo gratis.
 *
 * Se implementa como un web component en vez de una isla de React para no
 * cargar el runtime de React en esta parte de la página.
 */

const TIMEZONE = 'Europe/Madrid'
const PLACE = 'Madrid, España'

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  timeZone: TIMEZONE,
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('es-ES', {
  timeZone: TIMEZONE,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

class TimeZoneClock extends HTMLElement {
  #timer?: number

  connectedCallback() {
    this.#render()
    // 'document.hidden' evita despertarse cada segundo en una pestaña de fondo.
    this.#timer = window.setInterval(() => {
      if (!document.hidden) this.#render()
    }, 1000)
  }

  disconnectedCallback() {
    if (this.#timer) window.clearInterval(this.#timer)
  }

  #render() {
    const now = new Date()
    const date = this.querySelector('[data-date]')
    const time = this.querySelector('[data-time]')
    if (date) date.textContent = dateFormatter.format(now)
    if (time) time.textContent = timeFormatter.format(now)
  }
}

if (!customElements.get('timezone-clock')) {
  customElements.define('timezone-clock', TimeZoneClock)
}
