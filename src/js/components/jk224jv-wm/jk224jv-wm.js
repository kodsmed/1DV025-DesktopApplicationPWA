/**
 * The jk224jv-wm component.
 * Creates a window manager.
 * Movable: @since 7d0c96ae
 * Closable: @todo required - not yet implemented
 * Minimizable: @todo extra - not yet implemented
 * Resizeable: @since 7d0c96ae
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='desktop'>
    <div id='header'>a</div>
    <div id='surface'>c
      <jk224jv-window height="fit-content" x='50px' y='50px'>
        <jk224jv-ws-chat slot="window-content"></jk224jv-ws-chat>
      </jk224jv-window>
    </div>
    <div id='dock'>b</div>
  </div>
`

customElements.define('jk224jv-wm',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    #header
    #surface
    #dock

    #windows

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // get elements in the shadowroot
      this.#header = this.shadowRoot.querySelector('#header')

      // set listeners
      this.addEventListener('minimizeMe', this.#minimizeHandler)
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      //
    }

    /**
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      //
    }

    /**
     * Minimize the window.
     */
    #minimizeHandler () {
      //
    }

    /**
     * Dispach an event telling the window manager to remove this component.
     */
    #closeWindow () {
      this.dispatchEvent(new CustomEvent('closeMe'))
    }
  })
