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
  <div id="results" class="flexbox">
    <div>
      <h3 id="hNoPreview"></h3>
      <ol id="olNoPreview"></ol>
    </div>
    <div>
      <h3 id="hWithPreview"></h3>
      <ol id="olWithPreview"></ol>
    </div>
  </div>
  <div id="inputContainer" class="flexbox">
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
     * Used to scramble / unscramble
     *
     * @param {string}
     */
    #key

    /**
     * HTML Element shortcuts.
     */
    #listPreview
    #hPreview
    #listNoPreview
    #hNoPreview
    #inputContainer

    /**
     * Create an instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // set the shortcuts
      this.#listPreview = this.shadowRoot.querySelector('#olWithPreview')
      this.#inputContainer = this.shadowRoot.querySelector('#inputContainer')
      this.#listNoPreview = this.shadowRoot.querySelector('#olNoPreview')
      this.#hNoPreview = this.shadowRoot.querySelector('#hNoPreview')
      this.#hPreview = this.shadowRoot.querySelector('#hWithPreview')

      // set variables
      this.#result = {}
      this.#key = 'Life Univerce and Everything: 42'
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
      let resultObject = {}
      while (this.#inputContainer.firstChild) {
        this.#inputContainer.removeChild(this.#inputContainer.firstChild)
      }
      const previousResults = window.localStorage.getItem('jk224jv-memory-hs') ?? false
      if (previousResults) {
        const unscrabled = this.#unscramble(previousResults, this.#key)
        resultObject = await JSON.parse(unscrabled)
      }
      const fallback = []
      for (let i = 0; i < 5; i++) {
        fallback.push({ username: '-', moves: 9999 })
      }

      // get any previous results... or a default if noone played with those settings before.
      const resultArray = resultObject[`${this.#result.columns}x${this.#result.rows}false`] ?? Array.from(fallback)
      const resultArrayPreview = resultObject[`${this.#result.columns}x${this.#result.rows}true`] ?? Array.from(fallback)

      // add this result to the propper array and resort it.
      const pushObject = { username: this.#result.username, moves: this.#result.moves }
      if (this.#result.preview === true) {
        resultArrayPreview.push(pushObject)
      } else {
        resultArray.push(pushObject)
      }
      const sortedArrayPreview = this.#sortEntries(resultArrayPreview)
      const sortedArray = this.#sortEntries(resultArray)

      this.#hNoPreview.textContent = `${this.#result.columns} x ${this.#result.rows}`
      for (let i = 0; i < sortedArray.length; i++) {
        const liToAdd = document.createElement('li')
        liToAdd.textContent = `${sortedArray[i].username} : ${sortedArray[i].moves} moves`
        this.#listNoPreview.appendChild(liToAdd)
      }

      this.#hPreview.textContent = `${this.#result.columns} x ${this.#result.rows} with preview`
      for (let i = 0; i < sortedArrayPreview.length; i++) {
        const liToAdd = document.createElement('li')
        liToAdd.textContent = `${sortedArrayPreview[i].username} : ${sortedArrayPreview[i].moves} moves`
        this.#listPreview.appendChild(liToAdd)
      }

      resultObject[`${this.#result.columns}x${this.#result.rows}false`] = sortedArray
      resultObject[`${this.#result.columns}x${this.#result.rows}true`] = sortedArrayPreview
      const jsonString = await JSON.stringify(resultObject)
      const scrambledString = this.#scramble(jsonString, this.#key)
      window.localStorage.setItem('jk224jv-memory-hs', scrambledString)
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
      this.#clearResult()

      // insert input element to get username.
      const inputToAdd = document.createElement('jk224jv-input')
      inputToAdd.setAttribute('message', 'Your name for the highscore?')
      inputToAdd.setAttribute('minlength', '1')
      this.#inputContainer.appendChild(inputToAdd)
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

    /**
     * Sort entries by moves and returns the lowest 5.
     *
     * @param {object[]} obj - { username: {string}, moves: {number} }
     * @returns {object[]} sorted array length 5
     */
    #sortEntries (obj) {
      obj.sort((a, b) => (a.moves > b.moves) ? 1 : ((b.moves > a.moves) ? -1 : 0))
      while (obj.length > 5) {
        obj.pop()
      }
      return JSON.parse(JSON.stringify(obj))
    }

    /**
     * Resets the result area.
     */
    #clearResult () {
      console.log('running clearResult')
      while (this.#listPreview.firstChild) {
        this.#listPreview.removeChild(this.#listPreview.firstChild)
      }
      this.#hPreview.textContent = ''
      while (this.#listNoPreview.firstChild) {
        this.#listNoPreview.removeChild(this.#listNoPreview.firstChild)
      }
      this.#hNoPreview.textContent = ''
    }
  })
