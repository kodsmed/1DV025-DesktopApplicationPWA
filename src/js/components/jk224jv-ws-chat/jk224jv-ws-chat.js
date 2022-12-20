/**
 * The jk224jv-ws-chat component.
 * Creates a chat using websockets.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-input-dialogue/index.js'
const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='container'>
    <div id='messages'>
      <textarea readonly="true"></textarea>
    </div>
    <jk224jv-input-dialogue minlength="0" message=""></jk224jv-input.dialogue>
  </div>
`

customElements.define('jk224jv-ws-chat',
/**
 * Represents a jk224jv-ws-chat element.
 */
  class extends HTMLElement {
    #display
    #socket
    #messageListener
    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // get elements in the shadowroot
      this.#display = this.shadowRoot.querySelector('textarea')
      // set listeners
      this.addEventListener('load', (event) => {
        this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
        this.#socket.addEventListener('open', (event) => {
          this.#messageListener = this.#recieveMessage(event)
          this.#socket.addEventListener('message', (event) => this.#messageListener)
        })
        this.#socket.addEventListener('close', (event) => {
          this.#socket.removeEventListener('message', this.#messageListener)
        })
      })
      this.addEventListener('inputRecieved', (event) => this.#sendMessage(event))
    }

    /**
     * Listen to these attrbutes set in html.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - the attributes name
     * @param {*} oldValue - the previous value
     * @param {*} newValue - the new value
     */
    attributeChangedCallback (name, oldValue, newValue) {
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

    #sendMessage (event) {

    }

    #recieveMessage (event) {

    }
  })
