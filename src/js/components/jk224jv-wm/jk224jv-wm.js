/**
 * The jk224jv-wm component.
 * Creates a window manager.
 * Movable: @since 7d0c96ae
 * Closable: @todo required - not yet implemented
 * Minimizable: @todo extra - not yet implemented
 * Resizeable: @since 7d0c96ae
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */

const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='desktop'>
    <div id='header'>a</div>
    <div id='surface'>
    </div>
    <jk224jv-dock id="dock"></jk224jv-dock>
  </div>
`

customElements.define('jk224jv-wm',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    #header
    #surface
    #dock

    #openWindows

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      // get elements in the shadowroot
      this.#header = this.shadowRoot.querySelector('#header')
      this.#surface = this.shadowRoot.querySelector('#surface')
      this.#dock = this.shadowRoot.querySelector('#dock')
      this.#openWindows = { titles: [], dataids: [], xPos: [], yPos: [], zPos: [] }

      // set listeners
      this.#surface.addEventListener('minimizeMe', this.#minimizeHandler.bind(this))
      this.#surface.addEventListener('closeMe', this.#closeWindow.bind(this))
      window.addEventListener('startNew', (event) => this.#startNewHandler(event))
      //
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
    }

    /**
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      //
    }

    /**
     * Minimize the window.
     *
     * @param {event} event - minimizeMe from window component.
     */
    #minimizeHandler (event) {
      console.log(`${event.target} minimized`)
    }

    /**
     * Removes the jk224jv-window component that dispatched the event.
     *
     * @param {event} event - closeMe event from window component.
     */
    #closeWindow (event) {
      this.#surface.removeChild(event.target)
    }

    /**
     * Starts a new sub-application window.
     *
     * @param {event} event - startNew event from dock component.
     */
    #startNewHandler (event) {
      console.log(event.detail)
      const windowToAdd = document.createElement('jk224jv-window')
      windowToAdd.setAttribute('title', event.detail)
      windowToAdd.setAttribute('height', 'fit-content')
      windowToAdd.setAttribute('xpos', `${25 * (this.#openWindows.xPos.length + 1)}px`)
      windowToAdd.setAttribute('ypos', `${25 * (this.#openWindows.yPos.length + 1)}px`)
      windowToAdd.setAttribute('zindex', this.#openWindows.zPos.length)
      windowToAdd.setAttribute('dataid', this.#openWindows.dataids.length)

      const contentToAdd = document.createElement(`jk224jv-${event.detail}`)
      contentToAdd.setAttribute('slot', 'window-content')

      this.#openWindows.titles.push(event.detail)
      this.#openWindows.dataids.push(windowToAdd.getAttribute('dataid'))
      this.#openWindows.xPos.push(windowToAdd.getAttribute('xPos'))
      this.#openWindows.yPos.push(windowToAdd.getAttribute('yPos'))
      this.#openWindows.zPos.push(windowToAdd.getAttribute('zindex'))

      windowToAdd.appendChild(contentToAdd)
      this.#surface.appendChild(windowToAdd)
    }
  })
