/**
 * The jk224jv-stt component.
 * Creates a module the provides speech-to-text transformation.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='container'>
    <input type="checkbox" value="enabled" name="enabled" id="enabled">
    <label for="enable">Enable Speech > Text</label>
    <select name="voices" id="voices"></select>
    <button>Listen</button>
    <p id="info"> </p>
  </div>
  `

customElements.define('jk224jv-stt',
/**
 * Representing the element.
 */
  class extends HTMLElement {
    /**
     * Shortcut to checkbox element
     */
    #enabled

    /**
     * Shortcut to the select element
     */
    #selector

    /**
     * Shortcut to the paragraph element
     */
    #p

    /**
     * Stores the speechrecogniser.
     */
    #myEars

    /**
     * THE button
     */
    #button

    /**
     * Initiate the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#enabled = this.shadowRoot.querySelector('#enabled')
      this.#selector = this.shadowRoot.querySelector('#voices')
      this.#p = this.shadowRoot.querySelector('p')
      this.#button = this.shadowRoot.querySelector('button')

      // start or stop
      this.#enabled.addEventListener('change', () => this.#enableChangleHandler())
      // tie in the language selector so it restarts if the language change.
      this.#selector.addEventListener('change', () => this.#stopSTT())
      this.#button.addEventListener('click', () => this.#startSTT())
    }

    /**
     * Run once as the component is connected to the DOM.
     */
    connectedCallback () {
      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const langs = [
          { code: 'en-gb', name: '--Select Language--' },
          { code: 'sv', name: 'Svenska' },
          { code: 'en-gb', name: 'English' },
          { code: 'fr', name: 'Français' },
          { code: 'de', name: 'Deutsch' }
        ]
        for (let i = 0; i < langs.length; i++) {
          const optionToAdd = document.createElement('option')
          optionToAdd.value = langs[i].code
          optionToAdd.textContent = langs[i].name
          this.#selector.appendChild(optionToAdd)
        }
        this.#p.textContent = 'Your browser have support.'
      } else {
        // Speech recognition is not supported
        this.#enabled.setAttribute('disabled', true)
        this.#p.textContent = 'No browser support.'
      }
    }

    /**
     * Looks at the checkbox and calls the propper function.
     */
    #enableChangleHandler () {
      console.log('change')
      if (!this.#enabled.checked) {
        this.#stopSTT()
      }
    }

    /**
     * Stops the speechrecognition.
     */
    #stopSTT () {
      console.log('stop')
      if (this.#myEars) {
        this.#myEars.stop()
        this.#myEars = null
      }
      this.#p.textContent = 'No voicerecognition running'
      this.#p.style.color = 'black'
    }

    /**
     * Starts the speechrecognition.
     */
    #startSTT () {
      console.log('start')
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (this.#myEars) {
        this.#myEars.stop()
        this.#myEars = null
      }

      this.#myEars = new SpeechRecognition()

      // Set the language
      this.#myEars.lang = this.#selector.value

      this.#myEars.addEventListener('start', () => {
        this.#p.style.color = 'red'
        const option = this.#selector.selectedOptions[0]
        this.#p.textContent = `Voicerecognition in: ${option.textContent}`
      })

      this.#myEars.addEventListener('speechend', () => { this.#stopSTT() })

      this.#myEars.addEventListener('error', (error) => {
        this.#enabled.checked = false
        console.log('ws-chat: speecregognition error', error.message, 'Closing')
      })

      this.#myEars.addEventListener('result', (event) => {
        const latestIndex = event.resultIndex
        const text = event.results[latestIndex][0].transcript
        this.dispatchEvent(new CustomEvent('sttRecieved', { bubbles: true, composed: true, detail: text }))
      })

      // Start the recognition
      this.#myEars.start()
    }
  })
