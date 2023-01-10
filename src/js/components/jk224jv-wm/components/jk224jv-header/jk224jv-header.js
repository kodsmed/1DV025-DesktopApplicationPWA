/**
 * The jk224jv-HEADER component.
 * Creates a windows-like application header / infobar.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='container'>
    <div id='clocks'><p id='localtime'></p><p id='sessiontime'></div>
    <div id='title'><h2>Personal Web Desktop</h2></div>
    <div id='connection'>
      <p>Connection: </p>
      <div class='green hidden' title='online'></div>
      <div class='lime hidden' title='online - new message'></div>
      <div class='red hidden' title='offline'></div>
    </div>
  </div>
`

customElements.define('jk224jv-header',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    /**
     * Shortcuts to elements.
     */
    #clock //         p element displaying local time.
    #sessionClock //  p element displaying elpased session time.
    #red //           div element indicating offline mode.
    #green //         div element indicating online mode.
    #lime //          div element indicating message.

    /**
     * TimeoutId
     */
    #timeoutId

    /**
     * Contains a Date object created at construction.
     */
    #dateStart

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // store variables
      this.#dateStart = new Date()

      // set shortcuts to elements
      this.#clock = this.shadowRoot.querySelector('#localtime')
      this.#sessionClock = this.shadowRoot.querySelector('#sessiontime')
      this.#red = this.shadowRoot.querySelector('.red')
      this.#green = this.shadowRoot.querySelector('.green')
      this.#lime = this.shadowRoot.querySelector('.lime')

      this.#timeoutId = window.setTimeout(this.#updateClocks.bind(this), 1000)
    }

    /**
     * Listen to these attrbutes set in html.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['data-offline']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - the attributes name
     * @param {*} oldValue - the previous value
     * @param {*} newValue - the new value
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'data-offline') {
        const isTrueSet = (newValue === 'true')
        this.#updateConnectionDisplay(isTrueSet)
      }
    }

    /**
     * Updates the clocks.
     */
    #updateClocks () {
      this.#clock.textContent = `Time: ${this.#currentLocalTime()}`
      this.#sessionClock.textContent = `Session time: ${this.#timeElapsed(new Date(), this.#dateStart)}`

      this.#timeoutId = window.setTimeout(this.#updateClocks.bind(this), 1000)
    }

    /**
     * Update the displayed connectionstatus.
     *
     * @param {boolean} status - should contain 'true' or 'false'.
     */
    #updateConnectionDisplay (status) {}

    /**
     * Create a string containing the localtime in a 24h HH:MM format.
     *
     * @returns {string} - HH:MM
     */
    #currentLocalTime () {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      return `${hours}`.padStart(2, '0') + ' : ' + `${minutes}`.padStart(2, '0')
    }

    /**
     * Create a string containing how much time differ btw two Date objects.
     *
     * @param {Date} dateA - a date object.
     * @param {Date} dateB - a date object.
     * @returns {string} HH:MM:SS
     */
    #timeElapsed (dateA, dateB) {
      const elapsedms = dateA - dateB

      const seconds = Math.floor((elapsedms / 1000) % 60)
      const minutes = Math.floor((elapsedms / (1000 * 60)) % 60)
      const hours = Math.floor((elapsedms / (1000 * 60 * 60)) % 24)

      return `${hours}`.padStart(2, '0') + ' : ' + `${minutes}`.padStart(2, '0') + ' : ' + `${seconds}`.padStart(2, '0')
    }
  })
