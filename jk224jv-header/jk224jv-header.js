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
  <div id='container'>

  </div>
`

customElements.define('jk224jv-header',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    /**
     * Shortcuts to elements.
     */
    #buttons // div containing the launch buttons
    #minis // div containing representations of minimized windows.

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
        if (event.target.dataId) {
          this.dispatchEvent(new CustomEvent('startNew', { bubbles: true, composed: true, detail: event.target.dataId }))
        }
      })
      this.#minis.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.dataId) {
          this.dispatchEvent(new CustomEvent('restoreClicked', { bubbles: true, composed: true, detail: event.target.dataId }))
        }
      })
    }

    /**
     * Listen to these attrbutes set in html.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['data-offline']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - the attributes name
     * @param {*} oldValue - the previous value
     * @param {*} newValue - the new value
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'data-offline') {
        this.#showOffline(this.getAttribute('data-offline'))
      }
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
        newMWRep.setAttribute('data-id', mWins[mWin].dataId)
        newMWRep.dataId = mWins[mWin].dataId
        newMWRep.textContent = mWins[mWin].title
        this.#minis.appendChild(newMWRep)
      }
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      // inserts the 'start a new app' buttons.
      const files = ['jk224jv-ws-chat', 'jk224jv-memory', 'jk224jv-tarot']
      files.forEach(file => {
        const IMG_URL = (new URL(`./img/${file}.ico`, import.meta.url))
        const newButton = document.createElement('button')
        const newImage = document.createElement('img')
        newImage.setAttribute('src', IMG_URL)
        newImage.setAttribute('height', '25px')
        newImage.dataId = file
        newButton.appendChild(newImage)
        newButton.dataId = file
        this.#buttons.appendChild(newButton)
      })
    }

    /**
     * Shows a connection or lack of connecting icon if given true or false.
     *
     * @param {string} data - getAttribute('data-offline')
     */
    #showOffline (data) {
      const div = this.shadowRoot.querySelector('#antenna')
      while (div.firstChild) {
        div.removeChild(div.firstChild)
      }
      let IMG_URL
      const isTrueSet = (data.toLowerCase() === 'true')
      if (isTrueSet) { // offline is set
        IMG_URL = (new URL('./img/offline.ico', import.meta.url))
      } else {
        IMG_URL = (new URL('./img/online.ico', import.meta.url))
      }
      const newImage = document.createElement('img')
      newImage.setAttribute('src', IMG_URL)
      newImage.setAttribute('height', '25px')
      div.appendChild(newImage)
    }
  })
