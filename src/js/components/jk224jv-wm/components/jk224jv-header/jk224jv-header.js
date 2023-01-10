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
    #buttons // div containing the launch buttons
    #minis // div containing representations of minimized windows.

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
  })
