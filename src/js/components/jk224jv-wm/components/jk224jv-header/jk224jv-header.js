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
      <div class='green hidden'></div>
      <div class='lime hidden'></div>
      <div class='red hidden'></div>
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

    /**
     * TimeoutId
     */
    #timeoutId

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
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
        //
      }
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      
    }

    /**
     * Create a string containing the localtime in a 24h HH:MM format.
     *
     * @returns {string} - HH:MM
     */
    #currentLocalTime () {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      return `${hours}`.padStart(2, '0') + ' : ' + `${minutes}.padStart(2, '0)`
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
