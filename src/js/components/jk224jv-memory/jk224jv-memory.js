import './components/jk224jv-memorygame/'
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
  <div id="gamebox"></div>
  <div id="results">
    <p id="lastResult"></p>
    <ol id="highscore"></ol>
  </div>
  <div id="startup">
    <label>Columns : <select id="columns"></select></label>
    <label>Rows : <select id="rows"></select></label>
    <label>Enable preview : <input type="checkbox" id="preview">
    <button id="start">Start</button>
  </div>
</div>`

customElements.define('jk224jv-memory',
/**
 * Represents the memory.
 */
  class extends HTMLElement {
    /**
     * Shortcut to the selector elements.
     */
    #columns
    #rows
    /**
     * Shortcut to the checkbox.
     */
    #preview
    /**
     * Shortcut to the new game button.
     */
    #start
    /**
     * Shortcut to divisions
     */
    #gamebox
    #results
    #startup

    /**
     * Is datastorage accepted?
     */
    #datastorage

    /**
     * Create an instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // set the shortcuts
      this.#columns = this.shadowRoot.querySelector('#columns')
      this.#rows = this.shadowRoot.querySelector('#rows')
      this.#preview = this.shadowRoot.querySelector('#preview')
      this.#start = this.shadowRoot.querySelector('#start')
      this.#gamebox = this.shadowRoot.querySelector('#gamebox')
      this.#results = this.shadowRoot.querySelector('#results')
      this.#startup = this.shadowRoot.querySelector('#startup')

      // if there is cookies, storage have been accepted.
      this.#datastorage = this.#getCookie('storageAccepted')

      // set listeners
      this.#start.addEventListener('click', () => this.#insertGame())
      this.addEventListener('memoryWon', (event) => this.#gameWon(event))
    }

    /**
     * Run as elemement is connected to the DOM.
     */
    connectedCallback () {
      // populate the selectors
      for (let col = 2; col < 11; col++) {
        const optionToAdd = document.createElement('option')
        optionToAdd.setAttribute('value', (col))
        optionToAdd.textContent = `${col}`
        this.#columns.appendChild(optionToAdd)
      }
      for (let row = 2; row < 5; row++) {
        const optionToAdd = document.createElement('option')
        optionToAdd.setAttribute('value', (row))
        optionToAdd.textContent = `${row}`
        this.#rows.appendChild(optionToAdd)
      }
    }

    /**
     * Inserts the memory-game component.
     */
    #insertGame () {
      this.#startup.classList.toggle('hidden')
      const gameToAdd = document.createElement('jk224jv-memorygame')
      gameToAdd.setAttribute('columns', this.#columns.value)
      gameToAdd.setAttribute('rows', this.#rows.value)
      if (this.#preview.checked) {
        gameToAdd.setAttribute('preview', 'true')
      }
      this.#gamebox.appendChild(gameToAdd)
    }

    /**
     * Deal with player having finished the game.
     *
     * @param {event} event - moemoryWon event.
     */
    #gameWon (event) {
      this.#gamebox.removeChild(this.#gamebox.firstChild)
      this.#startup.querySelector('#startup').classList.toggle('hidden')
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
