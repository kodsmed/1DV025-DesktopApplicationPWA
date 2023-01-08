/**
 * The jk224jv-tts component.
 * Creates a module the provides text-to-speech transformation.
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
    <label for="enable">Enable Text->Speech</label>
    <select name="voices" id="voices"></select>
  </div>
  `

customElements.define('jk224jv-tts',
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
     * Stores the selected speechsynthesis voice.
     */
    #myVoice

    /**
     * Initiate the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#enabled = this.shadowRoot.querySelector('#enabled')
      this.#selector = this.shadowRoot.querySelector('#voices')
      this.#selector.addEventListener('change', () => this.#setSelectedVoice())

      window.setTimeout(this.#getVoices.bind(this), 100)
    }

    /**
     * Run once as the component is connected to the DOM.
     */
    connectedCallback () {
      if ('speechSynthesis' in window) {
        // special case for edge
        window.setTimeout(this.#getVoices.bind(this), 100)
        // special case for Chrome-Browsers.
        window.addEventListener('speechSynthesisvoiceschanged', () => this.#getVoices())
      } else {
        this.#enabled.setAttribute('disabled', true)
        const notAnOption = document.createElement('option')
        notAnOption.value = ''
        notAnOption.textContent = 'No browser support.'
        this.#selector.appendChild(notAnOption)
      }
    }

    /**
     * Gets the 'voices' available on the browser and populates the select element.
     */
    #getVoices () {
      const voices = speechSynthesis.getVoices()
      this.#selector = this.shadowRoot.querySelector('#voices')

      while (this.#selector.firstChild) {
        this.#selector.removeChild(this.#selector.firstChild)
      }

      voices.forEach(voice => {
        const optionToAdd = document.createElement('option')
        optionToAdd.value = voice.name
        optionToAdd.textContent = voice.name
        if (voice.default) {
          optionToAdd.textContent += ' (default)'
        }

        this.#selector.appendChild(optionToAdd)
      })

      // this is experimental and strange so sometimes... it just doesnt work. In that case, redo.
      if (!voices.length > 0) {
        window.setTimeout(this.#getVoices.bind(this), 100)
      } else {
        // else, select the first voice.
        this.#setSelectedVoice()
      }
    }

    /**
     * Sets the voice picked in the selector so that the "play" function doesnt have to deal with that.
     */
    #setSelectedVoice () {
      const element = this.shadowRoot.querySelector('#voices')
      this.#myVoice = speechSynthesis.getVoices().filter(function (voice) { return voice.name === element.value })[0]
    }

    /**
     * Run once as the component is dis-connected from the DOM.
     */
    disconnectedCallback () {}

    /**
     * Public method thats used by parent(s) to assign text to be contverted.
     *
     * @param {string} text - string to be converted to speech.
     */
    say (text) {
      if (typeof text === 'string' && text.length > 0 && this.#enabled.checked) {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel()
        }
        const utterance = new SpeechSynthesisUtterance()

        utterance.text = text
        utterance.voice = this.#myVoice

        window.speechSynthesis.speak(utterance)
      }
    }
  })
