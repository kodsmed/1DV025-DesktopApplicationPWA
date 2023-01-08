/**
 * This is the start of the app.
 * The Omnissiah's Tarot.
 *
 * @author Jimmy Karlsson <jk224jv@strudent.lnu.se>
 */
import { tarotDeck } from './lib/tarotdeck.js'
const CSS_URL = (new URL('./css/common.css', import.meta.url))
const IMG_URL = (new URL('./images/', import.meta.url))
const template = document.createElement('template')
template.innerHTML = `
<link href="${CSS_URL}" rel="stylesheet" type="text/css">
<div class="main">
    <p class="hidden" id="unSupportedInfo">
      Im sorry to inform you, the browser you are currently using is to old to support this application. Please update your browser.<br>
      If not for the sake of this application, do it to secure your device.
    </p>

    <canvas id="surface" class=""></canvas>
    <div class="buttons">
      <button class="command" id="cardOfTheDay">Card of the day</button>
      <button class="command" id="threeCardSpread">Three Card Spread</button>
      <button class="command" id="exit">Credits</button>
    </div>
</div>

  <div class="cardImages hidden">
    <img src="${IMG_URL}/cog.png" id="cog" alt="cog">
    <img src="${IMG_URL}/rod.png" id="rod" alt="rod">
    <img src="${IMG_URL}/sharp.png" id="sharp" alt="sharp">
    <img src="${IMG_URL}/swords.png" id="sword" alt="sword">
    <img src="${IMG_URL}/machinecult.png" id="center" alt="">
  </div>
`

customElements.define('jk224jv-tarot',
/**
 * Represents a jk224jv-window element.
 */
  class extends HTMLElement {
    /**
     * Shortcut to elements
     */
    #canvas //  canvas element
    #ctx //     2d context of canvas
    #pInfo //   p element used to inform of compatability issues

    /**
     * Keeps track of randomly selected cards so they can be rendered.
     */
    #pulledCards

    /**
     * Create and instance of the element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // get elements in the shadowroot
      this.#canvas = this.shadowRoot.querySelector('canvas')
      this.#ctx = this.#canvas.getContext('2d')
      this.#pInfo = this.shadowRoot.querySelector('#unSupportedInfo')

      // make sure the user is not on an obsolete browser.
      if (!this.#canvas.getContext) {
        // canvas-unsupported code here
        this.#pInfo.classList.toggle('hidden')
        throw new Error('Unsupported browser')
      }
      this.#pulledCards = []

      // setup button listening events
      const btnCardOftheDay = this.shadowRoot.querySelector('#cardOfTheDay')
      const btnThreeCardsSpread = this.shadowRoot.getElementById('threeCardSpread')
      const btnExit = this.shadowRoot.getElementById('exit')

      btnCardOftheDay.addEventListener('click', (event) => this.#cardOftheDay())
      btnThreeCardsSpread.addEventListener('click', (event) => this.#threeCardsSpread())
      btnExit.addEventListener('click', (event) => this.#exit())
    }

    /**
     * Run once when the component is connected to the DOM.
     */
    connectedCallback () {
      this.#applySettings()
      this.dispatchEvent(new CustomEvent('noResize', { bubbles: true, composed: true }))
    }

    /**
     * Set the console output to the stored settings: backgroundColor, textColor, textBrightness.
     */
    #applySettings () {
      const dpr = 1
      console.log(`dpr:${dpr}`)
      const canvas = this.shadowRoot.querySelector('canvas')
      const ctx = canvas.getContext('2d')
      const container = this.shadowRoot.querySelector('.main')
      container.style.width = '1024px'
      container.style.color = 'lime'
      container.style.backgroundColor = 'rgba(9, 9, 9, 1)'
      container.width = 1024
      container.style.height = '640px'
      container.height = 640

      // Set the "actual" size of the canvas
      console.log(container.width)
      console.log(container.height)
      canvas.width = Math.floor((container.width - 30) * dpr)
      canvas.height = Math.floor((container.height - 70) * dpr)
      console.log(`canvas: ${canvas.width}:${canvas.height}`)
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr)

      // Set the "drawn" size of the canvas
      canvas.style.width = (container.width - 30) + 'px'
      console.log(canvas.width)
      canvas.style.height = (container.height - 70) + 'px'

      // store for calculations
      tarotDeck.settings.canvasHeight = canvas.height
      tarotDeck.settings.canvasWidth = canvas.width
      tarotDeck.settings.cardsHeight = canvas.height * 0.7
      tarotDeck.settings.cardsWidth = Math.max(Math.floor((canvas.width) / 5), (60 * 4 + 5))
      console.log(tarotDeck.settings.cardsWidth)
    }

    /**
     * Card of the day. Draw and display one card representing your day.
     */
    #cardOftheDay () {
      this.#displayCardOfTheDay()
    }

    /**
     * Draw and display three card representing something.
     */
    #threeCardsSpread () {
      this.#displayThreeCardSpread()
    }

    /**
     * Displays the credits... The Omnissiah have to be blessed somewhere.
     */
    #exit () {
      this.#clear()
      const canvas = this.#canvas
      const ctx = this.#ctx
      ctx.strokeStyle = 'limegreen'
      ctx.fillStyle = 'limegreen'
      ctx.shadowColor = 'green'
      ctx.shadowBlur = 15
      const xOrigin = Math.floor(tarotDeck.settings.canvasWidth / 2)
      const yOringin = Math.floor(tarotDeck.settings.canvasHeight / 5)
      ctx.font = '18px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('++ May the machinespirit correctly preform your computations and your functions be pure. ++', xOrigin, yOringin)
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(Math.floor(canvas.width * 0.2), yOringin + 35)
      ctx.lineTo(Math.floor(canvas.width * 0.8), yOringin + 35)
      ctx.stroke()

      ctx.font = '36px monospace'
      ctx.lineWidth = 1
      ctx.strokeText('The Omnissiah´s tarot', xOrigin, yOringin + 85)
      ctx.font = '18px monospace'
      ctx.fillText('by', xOrigin, yOringin + 110)
      ctx.font = 'italic 24px monospace'
      ctx.fillText('Jimmy Karlsson', xOrigin, yOringin + 140)
      ctx.font = ' 18px monospace'
      ctx.strokeText('codesmith - apprentice grade', xOrigin, yOringin + 165)
      ctx.fillText('Schoolarium : Linnéuniversitetet', xOrigin, yOringin + 190)
      ctx.fillText('Holy Terra', xOrigin, yOringin + 210)
      ctx.fillText('++ Praise the Omnissiah! ++', xOrigin, yOringin + 290)
      ctx.lineWidth = 5
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(Math.floor(canvas.width * 0.2), yOringin + 240)
      ctx.lineTo(Math.floor(canvas.width * 0.8), yOringin + 240)
      ctx.stroke()
    }

    /**
     * Creates an array with X number of unique elements.
     *
     * @param {number} cardsToPull - how many cards should be returned?
     * @returns {Array} pulledCards - cardsToPull ammount of unique identifiers 1 to 78
     */
    #pullCards (cardsToPull) {
      this.#pulledCards = []
      let randomCard = 0
      while (this.#pulledCards.length < cardsToPull) {
        randomCard = Math.floor(Math.random() * 78) + 1
        if (this.#pulledCards.includes(randomCard) === false) {
          this.#pulledCards.push(randomCard)
        }
      }
      return this.#pulledCards
    }

    /**
     * Write a tarot card outer frame at cordinates.
     *
     * @param {number} x - x TopLeft corner of card.
     * @param {number} y - y TopLeft corner of card.
     */
    #writeCardFrame (x, y) {
      const canvas = this.#canvas
      const ctx = canvas.getContext('2d')
      ctx.shadowColor = 'green'
      ctx.shadowBlur = 15
      ctx.lineWidth = 0.1
      ctx.globalAlpha = 1
      ctx.fillStyle = tarotDeck.settings.textColor
      ctx.fillRect(x, y, tarotDeck.settings.cardsWidth, tarotDeck.settings.cardsHeight)
      ctx.clearRect(x + 1, y + 1, tarotDeck.settings.cardsWidth - 2, tarotDeck.settings.cardsHeight - 2)
    }

    /**
     * Write a tarot card content at cordinates.
     *
     * @param {number} x - TopLeft corner of card.
     * @param {number} y - TopLeft corner of card.
     * @param {number} pulledCard - selects what card to write out.
     * @param {string} significance - what does the card reprecent?
     */
    #writeCardContent (x, y, pulledCard, significance) {
      this.#ctx.shadowColor = ''
      this.#ctx.shadowBlur = 0
      let cardSuit = ''
      let cardSuitIcon = ''
      let card = 0
      let turned = ''
      const iconSize = tarotDeck.settings.cardsWidth / 5

      // get position of card significance and write
      this.#ctx.font = '24px monospace'
      this.#ctx.textAlign = 'center'
      this.#ctx.fillText(significance, x + tarotDeck.settings.cardsWidth / 2, y - 50)

      if (pulledCard >= 1 && pulledCard <= 14) { // is the random card from rods?
        cardSuit = 'rods'
        cardSuitIcon = this.shadowRoot.getElementById('rod')
        card = pulledCard
      }

      if (pulledCard >= 15 && pulledCard <= 28) { // is the random card from cogs?
        cardSuit = 'cogs'
        cardSuitIcon = this.shadowRoot.getElementById('cog')
        card = pulledCard % 14
      }

      if (pulledCard >= 29 && pulledCard <= 42) { // is the random card from sharp?
        cardSuit = 'sharp'
        cardSuitIcon = this.shadowRoot.getElementById('sharp')
        card = pulledCard % 14
      }

      if (pulledCard >= 43 && pulledCard <= 56) { // is the random card from blades?
        cardSuit = 'blades'
        cardSuitIcon = this.shadowRoot.getElementById('sword')
        card = pulledCard % 14
      }
      if (card === 0) {
        card = 14
      }

      // get full cardname, minor or major arcana?
      let cardName = ''
      if (pulledCard <= 56) { // minor
        cardName = tarotDeck.minorNames[card] + ' of ' + tarotDeck.minorNames[cardSuit]
      } else { // major
        cardSuit = 'majorArcana'
        card = pulledCard - 56
        cardName = tarotDeck.majorArcana[card].name
      }
      if (Math.random() <= 0.49999999) {
        turned = 'upright'
      } else {
        turned = 'reversed'
      }
      cardName += ' - ' + turned

      // get to location for cardname and write
      this.#ctx.font = '18px monospace'
      this.#ctx.fillText(cardName, x + tarotDeck.settings.cardsWidth / 2, y - 25)

      // get to location for Top Icons and write
      if (pulledCard < 56) {
        for (let i = 0; i < tarotDeck.cardsTemplate[card].top; i++) {
          this.#ctx.drawImage(cardSuitIcon,
            (x + iconSize / 4 + iconSize * i),
            y + iconSize / 4)
        }
      }

      // get to location for Center Icons and write
      if (pulledCard > 56) {
        const cultLogo = this.shadowRoot.getElementById('center')
        this.#ctx.drawImage(
          cultLogo,
          x + Math.floor(tarotDeck.settings.cardsWidth / 2) - iconSize,
          y + Math.floor(tarotDeck.settings.cardsHeight / 2) - 60,
          120, 120)
      } else if (card > 10) {
        this.#ctx.fillText(
        `${tarotDeck.cardsTemplate[card].center}`,
        x + Math.floor(tarotDeck.settings.cardsWidth / 2),
        y + Math.floor(tarotDeck.settings.cardsHeight / 2)
        )
      } else {
        const icons = tarotDeck.cardsTemplate[card].center
        for (let i = 0; i < icons; i++) {
          this.#ctx.drawImage(
            cardSuitIcon,
            (x + Math.floor(tarotDeck.settings.cardsWidth / 2) - (icons * (iconSize / 2)) + (iconSize * i)),
            y + Math.floor(tarotDeck.settings.cardsHeight / 2) - iconSize / 2)
        }
      }

      // get to location for Bottom Icons and write
      if (pulledCard < 56) {
        const icons = tarotDeck.cardsTemplate[card].bottom
        for (let i = 0; i < tarotDeck.cardsTemplate[card].bottom; i++) {
          this.#ctx.drawImage(
            cardSuitIcon,
            (x + tarotDeck.settings.cardsWidth - (iconSize / 3) - (icons * iconSize) + (iconSize * i)),
            (y + tarotDeck.settings.cardsHeight - (iconSize * 1.5)))
        }
      }

      // get to location of description and write
      console.log(`${cardSuit} ${card} ${turned}`)
      try {
        this.#ctx.font = '16px monospace'
        const words = (tarotDeck[cardSuit][card][turned]).split(',')
        for (let word = 0; word < words.length; word++) {
          this.#ctx.fillText(words[word],
            x + tarotDeck.settings.cardsWidth / 2,
            y + tarotDeck.settings.cardsHeight + 20 + (word * 16),
            tarotDeck.settings.cardsWidth * 1.5)
        }
      } catch (error) {
        console.error(`Error : trying to located ${card}, ${cardSuit}, ${turned}`)
      }
    }

    /**
     * Write a tarot card at cordinates.
     *
     * @param {number} x - x TopLeft corner of card
     * @param {number} y - y TopLeft corner of card
     * @param {number} pulledCard - selects what card to write out.
     * @param {string} significance - what does the card reprecent?
     */
    #writeCard (x, y, pulledCard, significance = 'Card of the day') {
      this.#writeCardFrame(x, y)
      this.#writeCardContent(x, y, pulledCard, significance)
    }

    /**
     * Writes one random card centerscreen.
     *
     */
    #displayCardOfTheDay () {
      this.#pullCards(1)
      this.#clear()
      this.#writeCard(
        Math.floor((tarotDeck.settings.canvasWidth - tarotDeck.settings.cardsWidth) / 2),
        tarotDeck.settings.canvasHeight * 0.15,
        this.#pulledCards[0])
    }

    /**
     * Writes three random card centerscreen.
     *
     */
    #displayThreeCardSpread () {
      this.#pullCards(3)
      this.#clear()
      const significance = ['The Past', 'The Present', 'The Future']
      const xDistance = Math.floor(tarotDeck.settings.canvasWidth / 5)
      for (let i = 0; i < this.#pulledCards.length; i++) {
        this.#writeCard(
          Math.floor((0.5 * xDistance) + (1.5 * xDistance * i)),
          tarotDeck.settings.canvasHeight * 0.15,
          this.#pulledCards[i], significance[i])
      }
    }

    /**
     * Empties the canvas.
     */
    #clear () {
      this.#ctx.clearRect(0, 0, tarotDeck.settings.canvasWidth, tarotDeck.settings.canvasHeight)
    }
  })
