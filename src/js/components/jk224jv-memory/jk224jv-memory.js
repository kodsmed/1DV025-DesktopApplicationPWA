import './components/jk224jv-memorygame/'
import './components/jk224jv-highscore/'
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
  <div id="results" class="hidden">
    <h2 id="lastResult"></h2>
    <p id="bestPossible"></p>
    <jk224jv-highscore></jk224jv-highscore>
  </div>
  <div id="startup" class="flexbox">
    <label>Columns : <select id="columns"></select></label>
    <label>Rows : <select id="rows"></select></label>
    <label>Enable preview : <input type="checkbox" id="preview">
    <button id="start">Start</button>
  </div>
</div>
`

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
      for (let col = 1; col < 6; col++) {
        const optionToAdd = document.createElement('option')
        optionToAdd.setAttribute('value', (col * 2))
        optionToAdd.textContent = `${col * 2}`
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
      if (!this.#results.classList.contains('hidden')) { // if re-run.
        this.#results.classList.toggle('hidden')
      }
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
      console.log('event recieved')
      const rows = this.#gamebox.firstChild.getAttribute('rows')
      const cols = this.#gamebox.firstChild.getAttribute('columns')
      const preview = this.#gamebox.firstChild.hasAttribute('preview')
      while (this.#gamebox.firstChild) {
        this.#gamebox.removeChild(this.#gamebox.firstChild)
      }

      this.#startup.classList.toggle('hidden')
      this.#results.classList.toggle('hidden')

      this.#results.querySelector('#lastResult').textContent =
      `Congratulations! You finnished the game in ${event.detail.moves} moves.`

      this.#results.querySelector('#bestPossible').textContent =
      `Best possible result for your game was ${(cols * rows) / 2} moves.`
      if (this.#datastorage) {
        console.log('calling addResult')
        const hs = this.#results.querySelector('jk224jv-highscore')
        hs.addResult(event.detail.moves, cols, rows, preview)
      }
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
