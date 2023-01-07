/**
 * The jk224jv-window component.
 * Creates a windows-like box (div) with the following capabilities:
 * Movable: @since 7d0c96ae
 * Closable: @since 2c77b5b9
 * Minimizable: @since badf993b - extra
 * Resizeable: @since 7d0c96ae - extra
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='window'>
    <div id='header'>
      <div id='title'><p></p></div>
      <div id='icons'>
        <button class='button-6' id='minimize'>_</button>
        <button class='button-6' id='maximize'>□</button>
        <button class='button-6' id='close'>X</button>
      </div>
    </div>
    <div id="slotwrapper">
      <slot name="window-content"></slot>
    </div>
  </div>
`

customElements.define('jk224jv-window',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    #header
    #minimize
    #maximize
    #close
    #window

    #mouseUpHandler
    #mouseOutHandler
    #dragHandler
    #startX
    #startY

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // get elements in the shadowroot
      this.#header = this.shadowRoot.querySelector('#title')
      this.#window = this.shadowRoot.querySelector('#window')
      this.#minimize = this.shadowRoot.querySelector('#minimize')
      this.#maximize = this.shadowRoot.querySelector('#maximize')
      this.#close = this.shadowRoot.querySelector('#close')

      // set listeners
      this.#header.addEventListener('mousedown', this.#startDrag.bind(this))
      this.#maximize.addEventListener('click', (event) => this.#toggleMaximized())
      this.#minimize.addEventListener('click', (event) => this.#toggleMinimized())
      this.#close.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.dispatchEvent(new CustomEvent('closeMe', { bubbles: true, composed: true }))
      })
      this.addEventListener('click', (event) => this.#gotClicked(event))
      this.addEventListener('noResize', (event) => {
        event.stopPropagation(false)
        this.#maximize.setAttribute('disabled', true)
      })
    }

    /**
     * Listen to these attrbutes set in html.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['width', 'height', 'title', 'zindex', 'xpos', 'ypos', 'minimized']
    }

    /**
     * Called when observed attribute(s) changes.
     *
     * @param {string} name - the attributes name
     * @param {*} oldValue - the previous value
     * @param {*} newValue - the new value
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (oldValue !== newValue) {
        switch (name) {
          case 'width':
            this.#window.style.width = this.getAttribute('width')
            break
          case 'height':
            this.#window.style.height = this.getAttribute('height')
            break
          case 'title':
            this.#header.querySelector('p').textContent = newValue
            break
          case 'zindex':
            this.#window.style.zIndex = parseInt(newValue)
            this.#window.setAttribute('tabIndex', `${parseInt(this.getAttribute('zindex'))}`)
            break
          case 'xpos':
            this.#window.style.left = this.getAttribute('xpos')
            break
          case 'ypos':
            this.#window.style.top = this.getAttribute('ypos')
            break
        }
        if (name === 'minimized') {
          this.#window.classList.toggle('minimized')
        } else if (!this.hasAttribute('minimized')) {
          if (this.#window.classList.contains('minimized')) {
            this.#window.classList.remove('minimized')
          }
        }
      }
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      if (!this.hasAttribute('width')) {
        this.setAttribute('width', '500px')
      }
      if (!this.hasAttribute('height')) {
        this.setAttribute('height', '300px')
      }
      if (!this.hasAttribute('title')) {
        this.setAttribute('title', 'Window')
      }
      if (!this.hasAttribute('zindex')) {
        this.setAttribute('zindex', 1)
      }
    }

    /**
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      //
    }

    /**
     * Make the component moveable.
     *
     * @param {event} event - mousedown event.
     */
    #startDrag (event) {
      event.preventDefault()
      this.#dragHandler = this.#drag.bind(this)
      this.#mouseUpHandler = this.#stopDrag.bind(this)
      this.#mouseOutHandler = this.#stopDrag.bind(this)
      // where does the click start?
      this.#startX = event.clientX
      this.#startY = event.clientY
      document.addEventListener('mousemove', this.#dragHandler)
      document.addEventListener('mouseup', this.#mouseUpHandler)
    }

    /**
     * Remove the eventlisteners responsible for moving the component.
     */
    #stopDrag () {
      document.removeEventListener('mousemove', this.#dragHandler)
      document.removeEventListener('mouseup', this.#mouseUpHandler)
    }

    /**
     * Relocate the component by mousemovement.
     *
     * @param {event} event - mousemove event.
     */
    #drag (event) {
      event.preventDefault()
      // how far have we moved?
      const dX = (this.#startX - event.clientX)
      const dY = (this.#startY - event.clientY)

      // save the new startpoint
      this.#startX = event.clientX
      this.#startY = event.clientY

      // check for top and bottom
      if (this.#window.offsetTop - dY < 25) {
        this.#window.style.top = 25 + 'px'
      } else if (this.#window.offsetTop - dY + this.#window.offsetHeight > window.innerHeight - 50) {
        this.#window.style.top = (window.innerHeight - 50 - this.#window.offsetHeight) + 'px'
      } else {
        this.#window.style.top = `${this.#window.offsetTop - dY}px`
      }

      // check for left and right
      if (this.#window.offsetLeft - dX < 0) {
        this.#window.style.left = 0 + 'px'
      } else if (this.#window.offsetLeft + this.#window.offsetWidth - dX > window.innerWidth) {
        this.#window.style.left = (window.innerWidth - this.#window.offsetWidth) + 'px'
      } else {
        this.#window.style.left = `${this.#window.offsetLeft - dX}px`
      }
    }

    /**
     * Maximize or restore the window.
     */
    #toggleMaximized () {
      this.#window.classList.toggle('maximized')
    }

    /**
     * Minimize the window.
     */
    #toggleMinimized () {
      this.setAttribute('minimized', true)
      this.dispatchEvent(new CustomEvent('minimizeMe', { bubbles: true, composed: true }))
    }

    /**
     * Handles the window component being anywhere inside.
     * Sent to WM to get new Z-index.
     *
     * @param {event} event - click.
     */
    #gotClicked (event) {
      event.stopPropagation()
      event.preventDefault()
      this.dispatchEvent(new CustomEvent('clickedIn', { bubbles: true, composed: true, detail: this.getAttribute('dataid') }))
    }
  })
