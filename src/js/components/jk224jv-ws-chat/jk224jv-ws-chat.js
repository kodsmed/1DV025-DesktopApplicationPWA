/**
 * The jk224jv-ws-chat component.
 * Creates a chat using websockets.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-input-dialogue/'
import './components/jk224jv-tts/'
import './components/jk224jv-stt/'
const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='container'>
    <div id='messages'>
      <textarea readonly="true"></textarea>
      <jk224jv-tts></jk224jv-tts>
      <jk224jv-stt></jk224jv-stt>
    </div>
    <jk224jv-input-dialogue minlength="0" maxlength="128" message="" ></jk224jv-input.dialogue>
  </div>
`

customElements.define('jk224jv-ws-chat',
/**
 * Represents a jk224jv-ws-chat element.
 */
  class extends HTMLElement {
    /**
     * Shortcut to textarea element. The output.
     */
    #display

    /**
     * Shortcut to the WebSocket connection.
     */
    #socket

    /**
     * Shortcut to the TextToSpeech module/component element.
     */
    #tts

    /**
     * Variable Username.
     *
     * @example 'victor-charlie-charlie'
     * @param {string}
     */
    #username

    /**
     * Variable if datastorage is aproved of not.
     *
     * @param {boolean}
     */
    #storageAccepted

    /**
     * Buffers messages untill connection is re-established.
     */
    #sendBuffer

    /**
     * Should it loose connection, this keeps track of the how long to wait for next retry
     */
    #reconnectTimeout // {number}
    #timeoutId

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // set the private fields
      this.#sendBuffer = []
      this.#reconnectTimeout = 250
      this.#timeoutId = null

      // get elements in the shadowroot
      this.#display = this.shadowRoot.querySelector('textarea')
      this.#tts = this.shadowRoot.querySelector('jk224jv-tts')

      // set up the websocket connection.
      this.#connectWS()

      // set listeners
      this.addEventListener('inputReceived', (event) => this.#inputHandler(event))
      this.addEventListener('sttRecieved', (event) => this.inputHandler(event.detail))

      // is username set? If so, retrieve. else, aquire.
      const username = this.#getCookie('username')
      const input = this.shadowRoot.querySelector('jk224jv-input-dialogue')
      if (username) {
        this.#username = username
        input.setAttribute('message', username)
      } else {
        input.setAttribute('message', 'Send me your prefered username')
      }
    }

    /**
     * Listen to these attrbutes set in html.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['zindex', 'data-storage']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - the attributes name
     * @param {*} oldValue - the previous value
     * @param {*} newValue - the new value
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'zindex') {
        this.style.zIndex = parseInt(newValue)
      }
      this.#storageAccepted = this.hasAttribute('data-storage')
    }

    /**
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      this.#socket.close()
      this.#socket = null
    }

    /**
     * Redirects the event to the propper function.
     *
     * @param {event} event - event from input component.
     */
    #inputHandler (event) {
      if (!this.#username) {
        this.#setUsername(event)
      } else {
        const data =
          {
            type: 'message',
            data: event.detail,
            username: this.#username,
            channel: '1',
            key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
          }
        this.#sendMessage(data)
      }
    }

    /**
     * Connects to the websocketserver.
     */
    #connectWS () {
      this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      // once open start listening for messages.
      this.#socket.addEventListener('open', () => {
        this.#socket.addEventListener('message', (event) => this.#recieveMessage(event))
      })

      // if there is an error, log and shut-down.
      this.#socket.addEventListener('error', (error) => {
        console.error('WS error:', error.message, 'Closing.')
        this.#socket.close()
      })

      // connection lost of shut-down. Log to user and reconnect.
      this.#socket.addEventListener('close', () => {
        this.#display.textContent += '\nws-chat: connection was lost...'
        this.#reconnect()
      })
    }

    /**
     * Sends a new message to the ws server. If unable, store to sendBuffer.
     *
     * @todo Make username set-able.
     *
     * @param {object} data - inputReceived from input-dialogue component.
     */
    async #sendMessage (data) {
      if (this.#socket.readyState === WebSocket.OPEN) {
        this.#socket.send(await JSON.stringify(data))
      } else {
        this.#sendBuffer.push(data)
        this.#display.textContent += `\nBuffered: ${data.data}... sending on reconnect.`
      }
    }

    /**
     * Sets the username. If allowed, store it in a cookie, or else tell the user.
     *
     * @param {event} event - inputReceived from input-dialogue component.
     */
    #setUsername (event) {
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

        if (parseInt(this.getAttribute('zindex')) === 999) {
          // the text content can deal with script... speechesynther not so much.
          this.#tts.say(this.#cleanForTTS(msg.data))
        }
      }
    }

    /**
     * Tries to reconnect to the server.
     */
    #reconnect () {
      this.#display.textContent += '\nws-chat: trying to reconnect...'
      this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      // and new listeners
      this.#socket.addEventListener('open', () => {
        window.clearTimeout(this.#timeoutId)
        this.#display.textContent += '\nws-chat: Reconnected. Sending any buffered messages.'
        while (this.#sendBuffer.length > 0) {
          this.#sendMessage(this.#sendBuffer.shift())
        }
        this.#socket.addEventListener('message', (event) => this.#recieveMessage(event))
        this.#socket.addEventListener('error', (error) => {
          console.error('WS error:', error.message, 'Closing.')
          this.#socket.close()
        })
        this.#socket.addEventListener('close', () => {
          this.#display.textContent += '\nws-chat: connection was lost...'
          window.setTimeout(
            this.#reconnect.bind(this),
            Math.min(10000, this.#reconnectTimeout += this.#reconnectTimeout)
          )
        })
      })
      // try again
      this.#timeoutId = window.setTimeout(
        this.#reconnect.bind(this),
        Math.min(10000, this.#reconnectTimeout += this.#reconnectTimeout)
      )
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
     * Cleans data specificly to make sence in TTS.
     *
     * @param {string} unclean - untrusted data.
     * @returns {string} escaped.
     */
    #cleanForTTS (unclean) {
      return unclean.replace(/</g, '').replace(/>/g, '').replace(/&/g, ' and ').replace(/"/g, ' quote ').replace(/'/g, '').replace(/\//g, ' backslash ')
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
