import './components/jk224jv-input'
/**
 * Class and module for jk224jv-memory.
 * A wrapper that handles new game size selection and gameresults.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/styles.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
<div id="container">
  <div id="results" class="flexbox hidden">
    <div>
      <h3 id="hNoPreview"></h3>
      <ol id="olNoPreview"></ol>
    </div>
    <div>
      <h3 id="hWithPreview"></h3>
      <ol id="olWithPreview"></ol>
    </div>
  </div>
  <div id="inputbox" class="flexbox">
  </div>
</div>
`

customElements.define('jk224jv-highscore',
/**
 * Represents the highscore.
 */
  class extends HTMLElement {
    /**
     * Result object.
     *
     * @typedef result
     * @param {number} moves - how many moves were used?
     * @param {number} columns - how many columns were there?
     * @param {number} rows - how many rows were there?
     * @param {boolean} preview - was preview on?
     * @param {string} username
     */
    #result
    /**
     * Create an instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // set the shortcuts
      this.#result = {}
      // set listeners
      this.addEventListener('inputReceived', (event) => this.#gotNickname(event))
    }

    /**
     * Handles input being recieved form the user.
     *
     * @param {Event} event - inputReceived event from the jk224jv-input module.
     */
    async #gotNickname (event) {
      this.#result.username = event.detail
      const box = this.shadowRoot.querySelector('#inputbox')
      while (box.firstChild) {
        box.removeChild(box.firstChild)
      }
      const previousResults = window.localStorage.getItem('jk224jv-memory-hs') ?? false
      if (previousResults) {
        const unscrabled = this.#unscramble(previousResults)
        const resultObject = await JSON.parse(unscrabled)
        const resultArray = resultObject[`${this.#result.columns}x${this.#result.rows}false`] ?? []
        const resultArrayPreview = resultObject[`${this.#result.columns}x${this.#result.rows}true`] ?? []
      }
    }

    /**
     * Add the result to the highscore, if its better.
     *
     * @param {number} Moves - how many moves were used?
     * @param {number} Cols - how many columns were there?
     * @param {number} Rows - how many rows where there?
     * @param {boolean} Preview - was preview on? true||false.
     */
    addResult (Moves, Cols, Rows, Preview) {
      console.log('running addResult')
      // insert input element to get username.
      const container = this.shadowRoot.querySelector('#inputbox')
      const inputToAdd = document.createElement('jk224jv-input')
      inputToAdd.setAttribute('message', 'Your name for the highscore?')
      inputToAdd.setAttribute('minlength', '1')
      container.appendChild(inputToAdd)
      this.#result = { moves: Moves, columns: Cols, rows: Rows, preview: Preview, username: null }
    }

    /**
     * Scrambles a string using a key.
     *
     * @param {string} string - The string to scramble.
     * @param {string} key - The key to use for scrambling.
     * @returns {string} The scrambled string.
     */
    #scramble (string, key) {
      if (!typeof string === 'string' || string.length === 0 || !typeof key === 'string' || key.length === 0) {
        return ''
      }
      console.log('scrambling')
      let scrambledString = ''
      for (let pointer = 0; pointer < string.length; pointer++) {
        const stringChar = string.charCodeAt(pointer)
        const keyChar = key.charCodeAt(pointer % (key.length - 1))
        scrambledString += String.fromCharCode(stringChar + keyChar)
      }
      return scrambledString
    }

    /**
     * Unscrambles a string using a key.
     *
     * @param {string} string - The string to unscramble.
     * @param {string} key - The key to use for scrambling.
     * @returns {string} The unscrambled string.
     */
    #unscramble (string, key) {
      if (!typeof string === 'string' || string.length === 0 || !typeof key === 'string' || key.length === 0) {
        return ''
      }
      console.log('unscrambling')
      let unscrambledString = ''
      for (let pointer = 0; pointer < string.length; pointer++) {
        const stringChar = string.charCodeAt(pointer)
        const keyChar = key.charCodeAt(pointer % (key.length - 1))
        unscrambledString += String.fromCharCode(stringChar - keyChar)
      }
      return unscrambledString
    }
  })
