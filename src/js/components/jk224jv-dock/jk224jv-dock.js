/**
 * The jk224jv-dock component.
 * Creates a windows-like application dock / taskbar.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='dock'>
    <div id='buttons'>
    </div>
    <div id='minis'></div>
  </div>
`

customElements.define('jk224jv-dock',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    #dock
    #buttons
    #minis

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // get elements in the shadowroot
      this.#buttons = this.shadowRoot.querySelector('#buttons')
      this.#minis = this.shadowRoot.querySelector('#minis')

      // set listeners
      this.#buttons.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.dataid) {
          this.dispatchEvent(new CustomEvent('startNew', { bubbles: true, composed: true, detail: event.target.dataid }))
        }
      })
      this.#minis.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.dataid) {
          this.dispatchEvent(new CustomEvent('restoreClicked', { bubbles: true, composed: true, detail: event.target.dataid }))
        }
      })
    }

    /**
     * Update the component by passing an object.
     *
     * @param {object[]} mWins - minimizedWindows - information from parent app.
     */
    update (mWins) {
      while (this.#minis.firstChild) {
        this.#minis.removeChild(this.#minis.firstChild)
      }

      for (let mWin = 0; mWin < mWins.length; mWin++) {
        const newMWRep = document.createElement('button')
        newMWRep.setAttribute('dataid', mWins[mWin].dataid)
        newMWRep.dataid = mWins[mWin].dataid
        newMWRep.textContent = mWins[mWin].title
        this.#minis.appendChild(newMWRep)
      }
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      // inserts the 'start a new app' buttons.
      const files = ['ws-chat', 'memory', 'tarot']
      files.forEach(file => {
        const IMG_URL = (new URL(`./img/${file}.ico`, import.meta.url))
        const newButton = document.createElement('button')
        const newImage = document.createElement('img')
        newImage.setAttribute('src', IMG_URL)
        newImage.setAttribute('height', '25px')
        newImage.dataid = file
        newButton.appendChild(newImage)
        newButton.dataid = file
        this.#buttons.appendChild(newButton)
      })
    }
  })
