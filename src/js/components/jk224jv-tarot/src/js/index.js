/**
 * This is the start of the app.
 * The Omnissiah's Tarot.
 *
 * @author Jimmy Karlsson <jk224jv@strudent.lnu.se>
 */
import { tarotDeck } from './tarotdeck.js'

try {
  document.onload = main()
} catch (e) {
  console.error(e.message)
}

/**
 * Main function  and starting point of the application.
 */
function main () {
  const canvas = document.getElementById('surface')
  const pInfo = document.getElementById('unSupportedInfo')

  // make sure the user is not on an obsolete browser.
  if (!canvas.getContext) {
    // canvas-unsupported code here
    pInfo.classList.toggle('hidden')
    throw new Error('Unsupported browser')
  }
  applySettings()

  // setup button listening events
  const btnCardOftheDay = document.querySelector('#cardOfTheDay')
  const btnThreeCardsSpread = document.getElementById('threeCardSpread')
  const btnExit = document.getElementById('exit')

  btnCardOftheDay.addEventListener('click', cardOftheDay)
  btnThreeCardsSpread.addEventListener('click', threeCardsSpread)
  btnExit.addEventListener('click', exit)

  const hrLines = document.getElementsByClassName('line')

  for (let index = 0; index < hrLines.length; index++) {
    const line = hrLines[index]
    const filler = document.createTextNode(''.padEnd(Math.floor(screen.availWidth / 8), '*'))
    line.appendChild(filler)
  }
}

/**
 * Set the console output to the stored settings: backgroundColor, textColor, textBrightness.
 */
function applySettings () {
  const root = document.documentElement
  root.style.setProperty('--background-color', tarotDeck.settings.backgroundColor)
  root.style.setProperty('--color', tarotDeck.settings.textColor)
  const canvas = document.getElementById('surface')

  // Get the DPR and size of the canvas
  const dpr = window.devicePixelRatio
  const rect = canvas.getBoundingClientRect()

  // Set the "actual" size of the canvas
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  // Scale the context to ensure correct drawing operations
  const ctx = document.getElementById('surface').getContext('2d')
  ctx.scale(dpr, dpr)

  // Set the "drawn" size of the canvas
  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  tarotDeck.settings.canvasHeight = canvas.height
  tarotDeck.settings.canvasWidth = canvas.width
  tarotDeck.settings.cardsHeight = canvas.height * 0.7
  tarotDeck.settings.cardsWidth = Math.max(Math.floor((canvas.width) / 5), (60 * 4 + 5))
  console.log(tarotDeck.settings.cardsWidth)
}

/**
 * Card of the day. Draw and display one card representing your day.
 */
function cardOftheDay () {
  tarotDeck.displayCardOfTheDay()
}

/**
 * Draw and display three card representing something.
 */
function threeCardsSpread () {
  tarotDeck.displayThreeCardSpread()
}

/**
 * Displays the credits... The Omnissiah have to be blessed somewhere.
 */
function exit () {
  tarotDeck.clear()
  const canvas = document.getElementById('surface')
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = 'limegreen'
  ctx.fillStyle = 'limegreen'
  ctx.shadowColor = 'green'
  ctx.shadowBlur = 15
  const xOrigin = Math.floor(canvas.width / 2)
  const yOringin = Math.floor(canvas.height / 5)
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
  ctx.strokeText('codesmith - junior apprentice grade', xOrigin, yOringin + 165)
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
