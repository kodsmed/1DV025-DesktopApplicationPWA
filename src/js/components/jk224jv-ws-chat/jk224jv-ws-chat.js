/**
 * The jk224jv-ws-chat component.
 * Creates a chat using websockets.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-input-dialogue/'
import './components/jk224jv-tts/'
const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='container'>
    <div id='messages'>
      <textarea readonly="true"></textarea>
      <jk224jv-tts></jk224jv-tts>
    </div>
    <jk224jv-input-dialogue minlength="0" maxlength="128" message="" ></jk224jv-input.dialogue>
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
    #username
    #storageAccepted
    #tts
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
      this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
      this.#socket.addEventListener('open', (event) => {
        this.#socket.addEventListener('message', (event) => this.#recieveMessage(event))
      })

      this.addEventListener('inputReceived', (event) => this.#sendMessage(event))

      const username = this.#getCookie('username')
      if (username) {
        this.#username = username
        this.shadowRoot.querySelector('jk224jv-input-dialogue').setAttribute('message', username)
      } else {
        this.shadowRoot.querySelector('jk224jv-input-dialogue').setAttribute('message', 'Send me your prefered username')
      }

      this.#storageAccepted = this.#getCookie('storageAccepted')
      this.#tts = this.shadowRoot.querySelector('jk224jv-tts')
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
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
      this.#socket = null
    }

    /**
     * Sends a new message to the ws server.
     *
     * @todo Make username set-able.
     *
     * @param {event} event - inputReceived from input-dialogue component.
     */
    async #sendMessage (event) {
      if (this.#username) {
        const data =
        {
          type: 'message',
          data: event.detail,
          username: this.#username, // todo: make set-able.
          channel: '1',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        this.#socket.send(await JSON.stringify(data))
      } else {
        this.#username = event.detail
        if (this.#storageAccepted) {
          const date = new Date()
          date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000))
          document.cookie = `username = ${event.detail}; expires=${date.toGMTString()}`
          this.#display.textContent += '\nws-chat: username saved; clear cookies to reset.'
        } else {
          this.#display.textContent += '\nws-chat: you have opted out of datastorage; your username will reset after this session.'
        }
        this.shadowRoot.querySelector('jk224jv-input-dialogue').setAttribute('message', event.detail)
      }
    }

    /**
     * Handling incomming messages from the ws server.
     *
     * @param {event} event - ws-message event.
     */
    async #recieveMessage (event) {
      const msg = await JSON.parse(event.data)
      if (this.#clean(msg.type) === 'message' || this.#clean(msg.type) === 'notification') {
        this.#display.textContent += `\n${msg.username}: ${msg.data}` // goes into 'safesink'.
        this.#display.scrollTop = this.#display.scrollHeight
      }
      if (this.hasAttribute('ontop')) {
        // the text content can deal with script... speechesynther not so much.
        this.#tts.say(this.#clean(msg.data))
      }
    }

    /**
     * Cleans data.
     *
     * @param {string} unclean - untrusted data.
     * @returns {string} escaped.
     */
    #clean (unclean) {
      return unclean.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F')
    }

    /**
     * Reads cookies. Return the value of the cookie with matching name.
     *
     * @param {string} name - name of cookie.
     * @returns {string} value
     */
    #getCookie (name) {
      const pattern = RegExp(name + '=.[^;]*')
      const matched = document.cookie.match(pattern)
      if (matched) {
        const cookie = matched[0].split('=')
        return cookie[1]
      }
      return false
    }
  })
