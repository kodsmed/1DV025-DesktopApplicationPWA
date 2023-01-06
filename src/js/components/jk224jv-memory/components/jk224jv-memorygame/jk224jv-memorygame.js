/**
 * The main script file of the application.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-flipcard/index.js'

const CSS_URL = (new URL('./css/styles.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
<div class="container">

</div>`

customElements.define('jk224jv-memorygame',
/**
 * Represents the memorygame.
 */
  class extends HTMLElement {
  /**
   * Shortcut to the jk224jv-flipcard elements.
   */
    #cards

    /**
     * Shortcut to the grid.
     */
    #grid

    /**
     * Settings
     *
     * @type {object} #settings
     * @property {number} collumns - number of collumns.
     * @property {number} rows - number of rows
     * @property {URL[]} imgSrcs - src to the card pictures.
     */
    #settings

    #flippedOne
    #flippedTwo
    #foundPairs
    #turnsUsed
    #focused

    /**
     * Create an instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      // assign values.
      const Settings = {
        columns: 2,
        rows: 2,
        imgSrcs: []
      }
      this.#settings = Settings
      for (let image = 0; image < 20; image++) {
        this.#settings.imgSrcs.push(new URL(`./img/${image}.png`, import.meta.url))
      }
      this.#grid = this.shadowRoot.querySelector('.container')
      this.#foundPairs = 0
      this.#turnsUsed = 0
      this.#focused = 0

      // add eventlisteners
      this.addEventListener('keydown', (event) => this.#keydownHandler(event))
    }

    /**
     * Listen to attributes assigned to element.
     *
     * @returns {string[]} - Array of attributes.
     */
    static get observedAttributes () {
      return ['columns', 'rows', 'preview']
    }

    /**
     * React to changed in attributes assigned to element.
     *
     * @param {string} name - attribute.
     * @param {*} oldValue -  {any}: any
     * @param {*} newValue - {any}: any
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'rows') {
        this.#settings.rows = parseInt(newValue)
        if (this.#settings.rows > 4) {
          this.#settings.rows = 4
          console.log('Attribute row is too high. 1-4.')
        }
        if (this.#settings.rows < 1) {
          this.#settings.rows = 1
          console.log('Attribute row is too low. 1-4.')
        }
      }

      if (name === 'columns') {
        this.#settings.columns = parseInt(newValue)
        if (this.#settings.columns > 10) {
          this.#settings.columns = 10
          console.log('Attribute columns is too high. 1-10.')
        }
        if (this.#settings.columns < 1) {
          this.#settings.columns = 1
          console.log('Attribute columns is too low. 1-10.')
        }
      }
      this.#render()

      if (this.#cards) {
        this.#cards.forEach(element => {
          element.removeEventListener('cardflipped', (event) => this.#cardflippedHandler(event))
        })
      }

      this.#cards = this.shadowRoot.querySelectorAll('jk224jv-flipcard')
      this.#cards.forEach(element => {
        element.addEventListener('cardflipped', (event) => this.#cardflippedHandler(event))
      })

      if (name === 'preview') {
        this.preview()
      }
    }

    /**
     * Handles keypress, adds arrowkey support.
     *
     * @param {event} event - keydown
     */
    #keydownHandler (event) {
      if (event.key === 'ArrowUp') {
        this.#focused -= this.#settings.columns
        if (this.#focused < 0) {
          const temp = this.#focused
          this.#focused = this.#cards.length + temp
        }
        this.#cards[this.#focused].focus()
      }
      if (event.key === 'ArrowDown') {
        this.#focused += this.#settings.columns
        if (this.#focused >= this.#cards.length) {
          const temp = this.#focused
          this.#focused = temp - this.#cards.length
        }
        this.#cards[this.#focused].focus()
      }
      if (event.key === 'ArrowLeft') {
        this.#focused--
        if (this.#focused === -1) {
          this.#focused = this.#cards.length - 1
        }
        this.#cards[this.#focused].focus()
      }
      if (event.key === 'ArrowRight') {
        this.#focused++
        if (this.#focused === this.#cards.length) {
          this.#focused = 0
        }
        this.#cards[this.#focused].focus()
      }
    }

    /**
     * Add grid of cards.
     */
    #render () {
      while (this.#grid.firstChild) {
        this.#grid.removeChild(this.#grid.firstChild)
      }

      this.#grid.style.gridTemplateColumns =
          `repeat(${this.#settings.columns}, auto)`
      this.#grid.style.gridTemplateRows =
          `repeat(${this.#settings.rows}, auto)`
      for (let row = 0; row < this.#settings.rows; row++) {
        for (let collumn = 0; collumn < this.#settings.columns; collumn++) {
          const addCard = document.createElement('jk224jv-flipcard')
          this.#grid.appendChild(addCard)
        }
      }

      this.#cards = this.shadowRoot.querySelectorAll('jk224jv-flipcard')
      this.#shuffle()
      for (let card = 0; card < this.#cards.length; card++) {
        const el = document.createElement('img')
        el.setAttribute('alt', Math.floor(card / 2))
        el.setAttribute('src', this.#settings.imgSrcs[Math.floor(card / 2)])
        el.setAttribute('slot', 'front-img')
        this.#cards[card].appendChild(el)
        this.#cards[card].setAttribute('tabindex', card)
      }
      this.#grid.firstChild.focus()
      this.#focused = 0
    }

    /**
     * Shuffle. "Randomly" re-arrange the cards in this instance.
     */
    #shuffle () {
      const clone = [...this.#cards]
      this.#cards = []
      do {
        const el = Math.floor(Math.random() * (clone.length))
        this.#cards.push(clone[el])
        clone.splice(el, 1)
      } while (clone.length > 0)
    }

    /**
     * Handle cardflipped events.
     *
     * @param {*} event - event from flipcards.
     */
    #cardflippedHandler (event) {
      if (event.detail.faceUp === 'back') {
        // out of sync due to overeager user. reject
        return
      }
      // no card is flipped before.
      if (!this.#flippedOne) {
        event.target.setAttribute('disabled', true)
        this.#flippedOne = event.target
        return
      }

      // one card is flipped before.
      if (this.#flippedOne) {
        if (!this.#flippedTwo && this.#flippedOne !== event.target) {
          this.#flippedTwo = event.target
        }
        // freeze the board while dealing with picked cards
        this.#cards.forEach(element => {
          element.setAttribute('disabled', true)
        })

        this.#turnsUsed++

        if (this.#flippedOne.innerHTML === this.#flippedTwo.innerHTML) {
          window.setTimeout(this.#cardsMatch.bind(this), 1500)
        } else {
          window.setTimeout(this.#cardsDontMatch.bind(this), 1500)
        }
      }
    }

    /**
     * Deal with matching cards after delay.
     */
    #cardsMatch () {
      this.#flippedOne.setAttribute('noshow', true)
      this.#flippedTwo.setAttribute('noshow', true)
      this.#cards.forEach(element => {
        element.removeAttribute('disabled')
      })
      this.#flippedOne = undefined
      this.#flippedTwo = undefined
      this.#foundPairs++
      if (this.#foundPairs === ((this.#settings.columns * this.#settings.rows) / 2)) {
        this.dispatchEvent(new CustomEvent('memoryWon', {
          bubbles: true,
          composed: true,
          detail: { moves: this.#turnsUsed }
        }))
      }
    }

    /**
     * Deal with none-matching cards after delay.
     */
    #cardsDontMatch () {
      this.#cards.forEach(element => {
        element.removeAttribute('disabled')
      })
      this.#flippedOne.removeAttribute('flipped')
      this.#flippedTwo.removeAttribute('flipped')
      this.#flippedOne = undefined
      this.#flippedTwo = undefined
    }

    /**
     * Run as elemement is connected to the DOM.
     */
    connectedCallback () {
      // columns="4" rows="4"
      if (!this.hasAttribute('columns')) {
        this.setAttribute('columns', 4)
      }

      if (!this.hasAttribute('rows')) {
        this.setAttribute('rows', 4)
      }
    }

    /**
     * Run as element is dis-connected from the DOM.
     */
    disconnectedCallback () {
      this.#cards.forEach(element => {
        element.removeEventListener('cardflipped', (event) => this.#cardflippedHandler(event))
      })
    }

    /**
     * Preview... tickle through the grid displaying cards as it goes.
     */
    preview () {
      for (let i = 0; i < this.#cards.length; i++) {
        setTimeout(() => {
          this.#cards[i].setAttribute('flipped', true)
        }, i * 200)
        setTimeout(() => {
          this.#cards[i].removeAttribute('flipped')
        }, i * 200 + 1000)
      }
    }
  })
