/**
 * The jk224jv-wm component.
 * Creates a window manager.
 *
 * @author Jimmy Karlsson <jk224jv@student.lnu.se>
 * @version 1.0.0
 */
import './components/jk224jv-window'
import './components/jk224jv-dock'
const CSS_URL = (new URL('./css/style.css', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
  <div id='desktop'>
    <div id='header'> </div>
    <div id='surface'>
    </div>
    <div id="dockcontainer">
    </div>
  </div>
`

customElements.define('jk224jv-wm',
/**
 * Represents a jk224jv-wm element.
 */
  class extends HTMLElement {
    #header
    #surface
    #dock
    #dataConcent

    #openWindows
    #openTitles
    #minimizedWindows
    #windowElementType
    #dockElementType

    #moduleLoadRetries

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
      this.#openWindows = [] // { title: {string}  data-id: {number}  xPos: {string}  yPos: {string}  zPos: {number}  reference: {HTMLElement}}
      this.#minimizedWindows = []
      this.#openTitles = {}
      this.#moduleLoadRetries = 0

      // change if you want to use another window component.
      this.#windowElementType = 'jk224jv-window'
      // change if you want to use anther dock component.
      this.#dockElementType = 'jk224jv-dock'
      // Don´t forget imports.

      // set listeners
      this.#surface.addEventListener('minimizeMe', this.#minimizeHandler.bind(this))
      window.addEventListener('restoreClicked', this.#restoreHandler.bind(this))
      this.#surface.addEventListener('closeMe', this.#closeWindow.bind(this))
      window.addEventListener('startNew', (event) => this.#startNewHandler(event))
      this.#surface.addEventListener('clickedIn', this.#focusHandler.bind(this))
      window.addEventListener('beforeunload', () => {
        console.log('beforeunload fires')
        return 'Life Universe and Everything.'
        // save the state here.
      })

      if (!document.cookie.length > 0) {
        this.#dataConcent = confirm('Everyone loves to deal with these, but dataprotection laws mandates your approval for the WindowManager to store your data.\n\n Whithout this permission the application will still work, it will just be dumber.\n\n Stored data concists of windowstates, username and cache.  Is this acceptable? (ok to accept)')
      } else { // if there is any cookie, permission was given.
        this.#dataConcent = true
      }

      if (this.#dataConcent) {
        const date = new Date()
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000))
        document.cookie = `storageAccepted = true; expires=${date.toGMTString()}`
      }
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      const dc = this.shadowRoot.querySelector('#dockcontainer')
      const dockElement = document.createElement(this.#dockElementType)
      dockElement.setAttribute('id', 'dock')
      dc.appendChild(dockElement)
      this.#dock = this.shadowRoot.querySelector('#dock')
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
      let index
      for (let entry = 0; entry < this.#openWindows.length; entry++) {
        if (this.#openWindows[entry].dataId === event.target.getAttribute('data-id')) {
          index = entry
        }
      }
      // if not original window component.
      if (!event.target.hasAttribute('minimized')) {
        event.target.setAttribute('minimized', true)
      }
      const minimizedWindowData = {
        title: this.#openWindows[index].title,
        dataId: this.#openWindows[index].dataId
      }
      this.#minimizedWindows.push(minimizedWindowData)
      this.#dock.update(this.#minimizedWindows)
    }

    /**
     * Restores previously minimized windows.
     *
     * @param {event} event - restoreClicked event from dock.
     */
    #restoreHandler (event) {
      const affectedWindow = this.#surface.querySelector(`[data-id = "${event.detail}"]`)
      affectedWindow.removeAttribute('minimized')

      let index
      for (let entry = 0; entry < this.#minimizedWindows.length; entry++) {
        if (this.#minimizedWindows[entry].dataId === event.detail) {
          index = entry
        }
      }
      this.#minimizedWindows.splice(index, 1)
      this.#dock.update(this.#minimizedWindows)
    }

    /**
     * Removes the jk224jv-window component that dispatched the event.
     *
     * @param {*} event - closeMe event from window component.
     */
    #closeWindow (event) {
      let index
      for (let entry = 0; entry < this.#openWindows.length; entry++) {
        if (this.#openWindows[entry].dataId === event.target.getAttribute('data-id')) {
          index = entry
        }
      }

      if (index) { // this should never be needed
        this.#openWindows.splice(index, 1)
      }

      this.#surface.removeChild(event.target)
    }

    /**
     * Starts a new sub-application window.
     *
     * @param {event} event - startNew event from dock component.
     */
    async #startNewHandler (event) {
      // Load its module if not loaded. It will only be loaded once so... we try every time.
      try {
        await import(`../${event.detail}`)
      } catch (error) {
        // if that failed... retry
        this.#moduleLoadRetries++
        console.log(`reload tries: ${this.#moduleLoadRetries}`)
        if (this.#moduleLoadRetries < 3) {
          this.#startNewHandler(event)
        } else {
          this.#moduleLoadRetries = 0
          return
        }
        return
      }

      const windowToAdd = document.createElement(this.#windowElementType)
      if (this.#openTitles[event.detail]) {
        this.#openTitles[event.detail]++
      } else {
        this.#openTitles[event.detail] = 1
      }

      let title = event.detail
      if (this.#openTitles[event.detail] > 1) {
        title += ` (${this.#openTitles[event.detail]})`
      }
      windowToAdd.setAttribute('title', title)
      windowToAdd.setAttribute('height', 'fit-content')
      windowToAdd.setAttribute('width', 'fit-content')
      windowToAdd.setAttribute('xpos', `${20 * (this.#openWindows.length + 1)}px`)
      windowToAdd.setAttribute('ypos', `${30 * ((this.#openWindows.length) % 10 + 1)}px`)
      windowToAdd.setAttribute('zindex', this.#openWindows.length)
      windowToAdd.setAttribute('data-zdefault', this.#openWindows.length)
      windowToAdd.setAttribute('data-id', this.#openWindows.length)
      const contentToAdd = document.createElement(`${event.detail}`)
      contentToAdd.setAttribute('slot', 'window-content')

      const windowData = {
        title: windowToAdd.getAttribute('title'),
        dataId: windowToAdd.getAttribute('data-id'),
        xPos: windowToAdd.getAttribute('xPos'),
        yPos: windowToAdd.getAttribute('yPos'),
        zPos: windowToAdd.getAttribute('zindex')
      }

      this.#openWindows.push(windowData)

      windowToAdd.appendChild(contentToAdd)
      this.#surface.appendChild(windowToAdd)
    }

    /**
     * Handles the window component loosing focus.
     *
     * @param {event} event - clickedIn event.
     */
    #focusHandler (event) {
      // is the clicked item a window element?`
      if (!event.target.matches(this.#windowElementType)) {
        return
      }
      // restore all
      const allWindowElements = this.shadowRoot.querySelectorAll(this.#windowElementType)
      allWindowElements.forEach(element => {
        const defaultValue = element.getAttribute('data-zdefault')
        element.style.zIndex = defaultValue
        element.setAttribute('zindex', defaultValue)
      })

      // the clicked div should be on the top.
      event.target.style.zIndex = 999
      event.target.setAttribute('zindex', 999)
    }
  })
