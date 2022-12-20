/**
 * The jk224jv-nickname web component module.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const JC_IMG_URL = (new URL('./images/jc.png', import.meta.url)).href

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      border-width: 3px;
      border-radius: 15px;
      font-size: 1.2em;
      color:white;
      background-color: #333;
      padding: 15px;
      margin: 15px;
      background-image: url(${JC_IMG_URL});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: right center;
    }

    #errorText {
      color: red;
      font-family: monospace;
      font-weight: bold;
    }
  </style>
  <div class="container" part="dialoguebox">
    <form>
      <p id="input" part="text"></p>
        <input type="text" id="inputUsername" part="dialogueinput">
        <input type="submit" id="submit" part="dialoguebtn" disabled>
      <p id="errorText" part="errortext">&nbsp;</p>
    </form>
  </div>
`

customElements.define('jk224jv-input-dialogue',
  /**
   * Represents a jk224jv-nickname element.
   */
  class extends HTMLElement {
    /**
     * The input question paragraph element.
     *
     * @type {HTMLParagraphElement}
     */
    #inputQuestion

    /**
     * The input element of type text .
     *
     * @type {HTMLInputElement}
     */
    #input

    /**
     * The input element of type submit.
     *
     * @type {HTMLInputElement}
     */
    #submit

    /**
     * The error message paragraph element.
     *
     * @type {HTMLParagraphElement}
     */
    #errorText

    /**
     * Attributes minimim and maximum lenth of nickname.
     */
    #minLength
    #maxLength

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the elements in the shadow root.
      this.#inputQuestion = this.shadowRoot.querySelector('#input')
      this.#input = this.shadowRoot.querySelector('#inputUsername')
      this.#submit = this.shadowRoot.querySelector('#submit')
      this.#errorText = this.shadowRoot.querySelector('#errorText')

      // set listeners
      this.#input.addEventListener('input', (event) => this.#verifyInput())
      this.#submit.addEventListener('click', (event) => this.#submitted(event))

      // testing listener - uncomment to enable.
      // this.addEventListener('inputReceived', (event) => { console.log(event.detail) })
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['message', 'buttontext', 'default', 'minlength', 'maxlenth']
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      if (!this.hasAttribute('message')) {
        this.setAttribute('message', 'Input:')
      }
      if (!this.hasAttribute('buttontext')) {
        this.setAttribute('buttontext', 'Send')
        this.#submit.value = this.getAttribute('buttontext')
      }
      if (!this.hasAttribute('minlength')) {
        this.setAttribute('minlength', '5')
        this.#minLength = this.getAttribute('minlength')
      }
      if (!this.hasAttribute('maxlength')) {
        this.setAttribute('maxlength', '32')
        this.#maxLength = this.getAttribute('maxlength')
      }
      if (this.hasAttribute('prefill')) {
        this.#input.value = this.getAttribute('prefill')
        this.#verifyInput()
      }

      this.#upgradeProperty('message')
      this.#input.focus()
    }

    /**
     * Enable or disable the submit button based on the content in the input field.
     */
    #verifyInput () {
      // step 1... no code to be injected.
      const forbidden = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
      if (forbidden.test(this.#input.value)) {
        this.#submit.disabled = true
        this.#errorText.textContent = '!!! The input contains forbidden characters !!!'
      } else {
        if (this.#input.value.length < this.#minLength) {
          this.#submit.disabled = true
          this.#errorText.textContent = 'The input is to short'
        } else if (this.#input.value.length > this.#maxLength) {
          this.#submit.disabled = true
          this.#errorText.textContent = 'The input is to long'
        } else {
          this.#submit.removeAttribute('disabled')
          this.#errorText.innerHTML = '<br>'
        }
      }
    }

    /**
     * Send an custom-event saying the button is clicked and cancel default.
     *
     * @param {event} event - click event.
     */
    #submitted (event) {
      this.#submit.disabled = true
      event.preventDefault()
      this.dispatchEvent(new window.CustomEvent('inputReceived', { bubbles: true, composed: true, detail: this.#input.value }))
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'message') {
        this.#inputQuestion.textContent = newValue
      }
      if (name === 'buttontext') {
        this.#submit.value = newValue
      }
      if (name === 'minlength') {
        this.#minLength = parseInt(newValue)
      }
      if (name === 'maxlength') {
        this.#maxLength = parseInt(newValue)
      }
    }

    /**
     * Run the specified instance property
     * through the class setter.
     *
     * @param {string} prop - The property's name.
     */
    #upgradeProperty (prop) {
      if (Object.hasOwnProperty.call(this, prop)) {
        const value = this[prop]
        delete this[prop]
        this[prop] = value
      }
    }
  }
)
