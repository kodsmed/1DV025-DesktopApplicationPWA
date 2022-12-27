/**
 * The main script file of the application.
 *
 * @author Jimmy Karlsson <jk224jv@strudent.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const FRONT_IMG_URL = (new URL('./img/defaultfront.png', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
<div class="cardbox">
  <div class="card" tabindex="1">
    <div class="cardface cardface--back" part="backside" id="backside">
    </div>
    <div class="cardface cardface--front" part="frontside" id="frontside">
      <slot name="front-img"></slot>
    </div>
  </div>
</div>`

customElements.define('jk224jv-flipcard',
/**
 *
 */
  class extends HTMLElement {
    /**
     * Shortcut to the main card div.
     */
    #card

    /**
     * What side of the card is showing?
     *
     * @type {string} 'front' || 'back'
     */
    #sideUp

    /**
     * Enabled, true || false. Allows of prevents flipping.
     */
    #enabled

    /**
     * Hidden, true || false. Hides or Shows cardfaces.
     */
    #hidden

    /**
     * Create an instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.shadowRoot.querySelector('#backside').style.backgroundImage = `url(${FRONT_IMG_URL})`
      this.#card = this.shadowRoot.querySelector('.card')
      this.addEventListener('click', (event) => this.#flip(event))
      this.addEventListener('keydown', (event) => {
        if (event.code === 'Enter' || event.code === 'Space') {
          this.#flip()
        }
      })
      this.addEventListener('focus', (event) => {
        this.#card.classList.add('focused')
      })
      this.addEventListener('blur', (event) => {
        this.#card.classList.remove('focused')
      })
      this.#enabled = true
      this.#sideUp = 'back'
    }

    /**
     * Listen to attributets set in html.
     *
     * @returns {string[]} A string array of attrivutes monitored.
     */
    static get observedAttributes () {
      return ['disabled', 'noshow', 'flipped']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - The attribute's name.
     * @param {*} oldValue - The old value.
     * @param {*} newValue - The new value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'noshow') {
        const faces = this.shadowRoot.querySelectorAll('.cardface')
        faces.forEach(face => {
          face.classList.add('hidden')
        })
      } else if (!this.hasAttribute('noshow')) {
        const faces = this.shadowRoot.querySelectorAll('.cardface')
        faces.forEach(face => {
          face.classList.remove('hidden')
        })
      }

      if (name === 'flipped') {
        this.#sideUp = 'front'
        this.#card.classList.toggle('is-flipped')
      } else if (!this.hasAttribute('flipped')) {
        this.#sideUp = 'back'
      }

      if (name === 'disabled') {
        this.#enabled = false
      } else if (!this.hasAttribute('disabled')) {
        this.#enabled = true
      }
    }

    /**
     * Run when component is connected to Dom.
     */
    connectedCallback () {
    }

    /**
     * Run when component is removed from Dom.
     */
    disconnectedCallback () {}

    /**
     * Deals with events triggering a cardflip.
     *
     */
    #flip () {
      if (!this.hasAttribute('disabled') && !this.hasAttribute('noshow')) {
        if (this.#sideUp === 'back') {
          this.#sideUp = 'front'
          this.setAttribute('flipped', true)
        } else {
          this.#sideUp = 'back'
          this.removeAttribute('flipped')
        }
        this.dispatchEvent(new CustomEvent('cardflipped', { bubbles: true, composed: true, detail: { faceUp: this.#sideUp } }))
      }
    }
  })
