/**
 * The jk224jv-window component.
 * Creates a windows-like box (div) with the following capabilities:
 * Movable:@todo required - not yet implemented
 * Closable: @todo required - not yet implemented
 * Minimizable: @todo extra - not yet implemented
 * Resizeable: @todo extra - not yet implemented
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 0.0.1 - Alfa
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='window'>
    <div id='header'>
      <div id='title'><p>Window</p></div>
      <div id='icons'>
        <button class='button-6' id='minimize'>_</button>
        <button class='button-6' id='maximize'>□</button>
        <button class='button-6' id='close'>X</button>
      </div>
    </div>
    <slot name="window-content"></slot>
  </div>
`

customElements.define('jk224jv-window',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
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
     * @return {string}
     */
    static get observedAttributes () {}

    attributeChangedCallback (name, oldValue, newValue) {}

    connectedCallback () {}

    disconnectedCallback () {}
})
