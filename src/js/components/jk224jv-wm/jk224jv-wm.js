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
    /**
     * Shortcut to Elements.
     */
    #header //  header infobar.
    #surface // desktop area
    #dock //    launcher dock area

    /**
     * Store variables.
     */
    #dataConcent //               {Boolean} - data storage concent?
    #dockElementType //           {String} HTMLElement
    #windowElementType //         {String} HTMLElement

    /**
     * Used to verify online-ness.
     */
    #connectionCheckTimeout //    A timeout id
    #ws //                        Shortcut to websocket connection.
    #online

    /**
     * Array that stores information about open windows.
     *
     * @typedef openWindow
     * @param {string} title -    name of the component
     * @param {number} data-id -  given at component launch. Incremental. Unique.
     * @param {string} xPos -     initial css style offset Left.  '#px'
     * @param {string} yPos -     initial css style offset Top.   '#px'
     * @param {string} zPos -     initial css style z-index.      '#'
     */
    #openWindows

    /**
     * Keeps track of how many time each element been opened.
     * Dynamicly appended.
     *
     * @example { jk224jv-memory: 2, jk224kv-ws-chat: 1 }
     *
     * @typedef openTitle
     * @param {number} [title]
     */
    #openTitles

    /**
     * Array that track of minimized Windows.
     *
     * @typedef minimizedWindow
     * @param {string} title
     * @param {number} dataId
     */
    #minimizedWindows

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
      this.#openWindows = []
      this.#minimizedWindows = []
      this.#openTitles = {}

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
        this.#storeCurrentState()
        return 'Life Universe and Everything.'
      })
      window.addEventListener('OfflineDetected', () => {
        console.log('Wm: connection observer flagged!')
      })

      // get datastorage concent or not
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

      // look for data windows that were open last session
      this.#restoreState()

      // Start checking connection.
      this.#checkConnection('wss://courselab.lnu.se/message-app/socket')
      // including listeners... tie the small support browsers have for online detection into my own system.
      window.addEventListener('offline', () => this.#checkConnectionTimedOut())
      window.addEventListener('online', () => this.#checkConnectionSuccess())
    }

    /**
     * Run once as the component is inserted into the DOM.
     */
    connectedCallback () {
      const dc = this.shadowRoot.querySelector('#dockcontainer')
      const dockElement = document.createElement(this.#dockElementType)
      dockElement.setAttribute('id', 'dock')
      dockElement.setAttribute('data-offline', 'false')
      dc.appendChild(dockElement)
      this.#dock = this.shadowRoot.querySelector('#dock')
    }

    /**
     * Run once as the component is removed from the DOM.
     */
    disconnectedCallback () {
      window.clearTimeout(this.#connectionCheckTimeout)
    }

    /**
     * Minimize the window.
     *
     * @param {event} event - minimizeMe from window component.
     */
    #minimizeHandler (event) {
      let index
      for (let entry = 0; entry < this.#openWindows.length; entry++) {
        console.log(this.#openWindows[entry]['data-id'])
        if (`${this.#openWindows[entry]['data-id']}` === event.target.getAttribute('data-id')) {
          index = entry
        }
      }
      // if not original window component.
      if (!event.target.hasAttribute('minimized')) {
        event.target.setAttribute('minimized', true)
      }
      const minimizedWindow = {
        title: this.#openWindows[index].title,
        dataId: this.#openWindows[index]['data-id']
      }
      this.#minimizedWindows.push(minimizedWindow)
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
        if (this.#minimizedWindows[entry]['data-id'] === event.detail) {
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
        if (this.#openWindows[entry]['data-id'] === event.target.getAttribute('data-id')) {
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
     * @param {openWindow} openWindow - windowObject stating starting conditions.
     */
    async #startNewHandler (event, openWindow = {
      title: event.detail,
      height: 'fit-content',
      width: 'fit-content',
      xpos: `${20 * (this.#openWindows.length + 1)}px`,
      ypos: `${30 * ((this.#openWindows.length) % 10 + 1)}px`,
      zindex: this.#openWindows.length,
      'data-zdefault': this.#openWindows.length,
      'data-id': this.#openWindows.length
    }) {
      await import(`../${event.detail}/index.js`)

      if (this.#openTitles[event.detail]) {
        this.#openTitles[event.detail]++
        openWindow.title += ` (${this.#openTitles[event.detail]})`
      } else {
        this.#openTitles[event.detail] = 1
      }

      if (this.#dataConcent) {
        openWindow['data-storage'] = 'true'
      }

      const windowToAdd = document.createElement(this.#windowElementType)
      for (const [key, value] of Object.entries(openWindow)) {
        windowToAdd.setAttribute(`${key}`, `${value}`)
      }
      const contentToAdd = document.createElement(`${event.detail}`)
      contentToAdd.setAttribute('slot', 'window-content')

      this.#openWindows.push(openWindow)

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

    /**
     * Looks at all open windows and saves their current states.
     */
    async #storeCurrentState () {
      if (this.#dataConcent) {
        this.#openWindows = []
        const allWindowElements = this.shadowRoot.querySelectorAll(this.#windowElementType)
        allWindowElements.forEach(element => {
          const openWindow = {}
          for (const attr of element.attributes) {
            openWindow[`${attr.name}`] = `${attr.value}`
            console.log(openWindow[`${attr.name}`] = `${attr.value}`)
          }
          openWindow.title = openWindow.title.split(' ')[0]
          this.#openWindows.push(openWindow)
        })
        const jsonString = await JSON.stringify(this.#openWindows)
        window.localStorage.setItem('jk224jv-wm', jsonString)
      }
    }

    /**
     * Looks at data saved in localstorage and reonpen windows matching that state.
     */
    async #restoreState () {
      console.log('Wm: restoreState fires')
      const jsonString = window.localStorage.getItem('jk224jv-wm') ?? false
      if (!jsonString) {
        // we didnt get anything from localstorage, so there is no sessiondata to restore... exit left.
        console.log('Wm: restoreState, no session data.')
        return false
      }

      const sessionData = await JSON.parse(jsonString)
      if (sessionData.length === 0) {
        // no windows were open.
        return true
      }
      console.log(sessionData)
      for (let entry = 0; entry < sessionData.length; entry++) {
        const fakeEvent = {}

        fakeEvent.detail = `${sessionData[entry].title}`
        this.#startNewHandler(fakeEvent, sessionData[entry])
        console.log(`startNew sent: ${fakeEvent}, ${sessionData[entry]}`)
      }
    }

    /**
     * Checks connection against a Websocket server.
     *
     * @param {URL} wsServerURL - URL to webserver.
     */
    #checkConnection (wsServerURL) {
      // set a countdown from 50seconds. We expect to retrieve any message in that time.
      this.#connectionCheckTimeout = window.setTimeout(this.#checkConnectionTimedOut.bind(this), 50000)

      this.#ws = new WebSocket(wsServerURL)

      this.#ws.addEventListener('open', () => {
        // when the event message fires, we don't care what it is... we just reset the countdown.
        // in otherwords we remove it and set it again.
        this.#ws.addEventListener('message', () => this.#checkConnectionSuccess())

        // on an error just try again. The countdown is still running, so we don't really care.
        this.#ws.addEventListener('error', () => {
          window.setTimeout(this.#checkConnection, 10000, 'wss://courselab.lnu.se/message-app/socket')
        })
      })
    }

    /**
     * Handles the event that the checkConnection succeded.
     * Or the navigator 'online' envent fired.
     */
    #checkConnectionSuccess () {
      navigator.serviceWorker.controller.postMessage('OnlineDetected')
      console.log('heartbeat')
      this.#online = true
      window.clearTimeout(this.#connectionCheckTimeout)
      this.#connectionCheckTimeout = window.setTimeout(this.#checkConnectionTimedOut.bind(this), 50000)
    }

    /**
     * Handles the event that the checkConnection function reached timeout.
     * Or the navigator 'offline' event fired.
     */
    #checkConnectionTimedOut () {
      console.log('Wm : Check connection FAILED!')
      this.#online = false
      // try to tell the serviceworker.
      navigator.serviceWorker.controller.postMessage('OfflineDetected')

      window.clearTimeout(this.#connectionCheckTimeout)
      this.#connectionCheckTimeout = window.setTimeout(this.#checkConnection.bind(this), 20000, 'wss://courselab.lnu.se/message-app/socket')
    }
  })
