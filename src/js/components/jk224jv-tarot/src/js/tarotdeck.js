/**
 * This is the tarotdeck part of:
 * The Omnissiah's Tarot.
 *
 * @author Jimmy Karlsson <jk224jv@strudent.lnu.se>
 */

export const tarotDeck = {
  settings: {
    backgroundColor: 'black',
    textColor: 'limegreen',
    cardsWidth: 65,
    cardsHeight: 125,
    canvasWidth: 0,
    canvasHeight: 0,
    default: {
      backgroundColor: 'black', // DO NOT MODIFY!
      textColor: 'limegreen' // DO NOT MODIFY!
    }
  },

  cardsTemplate: {
    major: {
      top: 0,
      center: 1,
      bottom: 0
    },
    1: {
      top: 0,
      center: 1,
      bottom: 0
    },
    2: {
      top: 1,
      center: 0,
      bottom: 1
    },
    3: {
      top: 1,
      center: 1,
      bottom: 1
    },
    4: {
      top: 2,
      center: 0,
      bottom: 2
    },
    5: {
      top: 2,
      center: 1,
      bottom: 2
    },
    6: {
      top: 2,
      center: 2,
      bottom: 2
    },
    7: {
      top: 3,
      center: 1,
      bottom: 3
    },
    8: {
      top: 3,
      center: 2,
      bottom: 3
    },
    9: {
      top: 3,
      center: 3,
      bottom: 3
    },
    10: {
      top: 4,
      center: 2,
      bottom: 4
    },
    11: {
      top: 1,
      center: 'Page',
      bottom: 1
    },
    12: {
      top: 1,
      center: 'Knight',
      bottom: 1
    },
    13: {
      top: 1,
      center: 'Queen',
      bottom: 1
    },
    14: {
      top: 1,
      center: 'King',
      bottom: 1
    }
  },

  rods: { // minor arcana = Staffs. Cards 1 - 14
    1: {
      upright: 'Creation, willpower, inspiration, desire',
      reversed: 'Lack of energy, lack of passion, boredom'
    },

    2: {
      upright: 'Planning, making decisions, leaving home',
      reversed: 'Fear of change, playing safe, bad planning'
    },

    3: {
      upright: 'Looking ahead, expansion, rapid growth',
      reversed: 'Obstacles, delays, frustration'
    },

    4: {
      upright: 'Community, home, celebration',
      reversed: 'Lack of support, transience, home conflicts'
    },

    5: {
      upright: 'Competition, rivalry, conflict',
      reversed: 'Avoiding conflict, respecting differences'
    },

    6: {
      upright: 'Victory, success, public reward',
      reversed: 'Excess pride, lack of recognition, punishment'
    },

    7: {
      upright: 'Perseverance, defensive, maintaining control',
      reversed: 'Give up, destroyed confidence, overwhelmed'
    },

    8: {
      upright: 'Rapid action, movement, quick decisions',
      reversed: 'Panic, waiting, slowdown'
    },

    9: {
      upright: 'Resilience, grit, last stand',
      reversed: 'Exhaustion, fatigue, questioning motivations'
    },

    10: {
      upright: 'Accomplishment, responsibility, burden',
      reversed: 'Inability to delegate, overstressed, burnt out'
    },

    11: {
      upright: 'Exploration, excitement, freedom',
      reversed: 'Lack of direction, procrastination, creating conflict'
    },

    12: {
      upright: 'Courage, determination, joy',
      reversed: 'Selfishness, jealousy, insecurities'
    },

    13: {
      upright: 'Action, adventure, fearlessness',
      reversed: 'Anger, impulsiveness, recklessness'
    },

    14: {
      upright: 'Big picture, leader, overcoming challenges',
      reversed: 'Impulsive, overbearing, unachievable'
    }
  },

  cogs: { // minor arcana = Conins. Cards 15 - 28
    1: {
      upright: 'Opportunity, prosperity, new venture',
      reversed: 'Lost opportunity, missed chance, bad investment '
    },

    2: {
      upright: 'Balancing decisions, priorities, adapting to change',
      reversed: 'Loss of balance, disorganized, overwhelmed'
    },

    3: {
      upright: 'Teamwork, collaboration, building',
      reversed: 'Lack of teamwork, disorganized, group conflict'
    },

    4: {
      upright: 'Conservation, frugality, security',
      reversed: 'Greediness, stinginess, possessiveness'
    },

    5: {
      upright: 'Need, poverty, insecurity',
      reversed: 'Recovery, charity, improvement'
    },

    6: {
      upright: 'Charity, generosity, sharing',
      reversed: 'Strings attached, stinginess, power and domination'
    },

    7: {
      upright: 'Hard work, perseverance, diligence',
      reversed: 'Work without results, distractions, lack of rewards'
    },

    8: {
      upright: 'Apprenticeship, passion, high standards',
      reversed: 'Lack of passion, uninspired, no motivation'
    },

    9: {
      upright: 'Fruits of labor, rewards, luxury',
      reversed: 'Reckless spending, living beyond means, false success'
    },

    10: {
      upright: 'Legacy, culmination, inheritance',
      reversed: 'Fleeting success, lack of stability, lack of resources'
    },

    11: {
      upright: 'Ambition, desire, diligence',
      reversed: 'Lack of commitment, greediness, laziness'
    },

    12: {
      upright: 'Efficiency, hard work, responsibility',
      reversed: 'Laziness, obsessiveness, work without reward'
    },

    13: {
      upright: 'Practicality, creature comforts, financial security',
      reversed: 'Self-centeredness, jealousy, smothering'
    },

    14: {
      upright: 'Abundance, prosperity, security',
      reversed: 'Greed, indulgence, sensuality'
    }

  },

  sharp: { // minor arcana = Cups or Containers. Cards 29 - 42
    1: {
      upright: 'New feelings, spirituality, intuition',
      reversed: 'Emotional loss, blocked creativity, emptiness'
    },

    2: {
      upright: 'Unity, partnership, connection',
      reversed: 'Imbalance, broken communication, tension'
    },

    3: {
      upright: 'Friendship, community, happiness',
      reversed: 'Overindulgence, gossip, isolation'
    },

    4: {
      upright: 'Apathy, contemplation, disconnectedness',
      reversed: 'Sudden awareness, choosing happiness, acceptance'
    },

    5: {
      upright: 'Loss, grief, self-pity',
      reversed: 'Acceptance, moving on, finding peace'
    },

    6: {
      upright: 'Familiarity, happy memories, healing',
      reversed: 'Moving forward, leaving home, independence'
    },

    7: {
      upright: 'Searching for purpose, choices, daydreaming',
      reversed: 'Lack of purpose, diversion, confusion'
    },

    8: {
      upright: 'Walking away, disillusionment, leaving behind',
      reversed: 'Avoidance, fear of change, fear of loss'
    },

    9: {
      upright: 'Satisfaction, emotional stability, luxury',
      reversed: 'Lack of inner joy, smugness, dissatisfaction'
    },

    10: {
      upright: 'Inner happiness, fulfillment, dreams coming true',
      reversed: 'Shattered dreams, broken family, domestic'
    },

    11: {
      upright: 'Happy surprise, dreamer, sensitivity',
      reversed: 'Emotional immaturity, insecurity, disappointment'
    },

    12: {
      upright: 'Following the heart, idealist, romantic',
      reversed: 'Moodiness, disappointment'
    },

    13: {
      upright: 'Compassion, calm, comfort',
      reversed: 'Martyrdom, insecurity, dependence'
    },

    14: {
      upright: 'Compassion, control, balance',
      reversed: 'Coldness, moodiness, bad advice'
    }

  },

  blades: { // minor arcana = Swords. Cards 43 - 56
    1: {
      upright: 'Breakthrough, clarity, sharp mind',
      reversed: 'Confusion, brutality, chaos'
    },

    2: {
      upright: 'Difficult choices, indecision, stalemate',
      reversed: 'Lesser of two evils, no right choice, confusion'
    },

    3: {
      upright: 'Heartbreak, suffering, grief',
      reversed: 'Recovery, forgiveness, moving on'
    },

    4: {
      upright: 'Rest, restoration, contemplation',
      reversed: 'Restlessness, burnout, stress'
    },

    5: {
      upright: 'Unbridled ambition, win at all costs, sneakiness',
      reversed: 'Lingering resentment, desire to reconcile, forgiveness'
    },

    6: {
      upright: 'Transition, leaving behind, moving on',
      reversed: 'Emotional baggage, unresolved issues, resisting transition'
    },

    7: {
      upright: 'Deception, trickery, tactics and strategy',
      reversed: 'Coming clean, rethinking approach, deception'
    },

    8: {
      upright: 'Imprisonment, entrapment, self-victimization',
      reversed: 'Self acceptance, new perspective, freedom'
    },

    9: {
      upright: 'Anxiety, hopelessness, trauma',
      reversed: 'Hope, reaching out, despair'
    },

    10: {
      upright: 'Failure, collapse, defeat',
      reversed: 'Can\'t get worse, only upwards, inevitable end'
    },

    11: {
      upright: 'Curiosity, restlessness, mental energy',
      reversed: 'Deception, manipulation, all tall'
    },

    12: {
      upright: 'Complexity, perceptiveness, clear',
      reversed: 'Cold hearted, cruel, bitterness'
    },

    13: {
      upright: 'Action, impulsiveness, defending beliefs',
      reversed: 'No direction, disregard for consequences, unpredictability'
    },

    14: {
      upright: 'Head over heart, discipline, truth',
      reversed: 'Manipulative, cruel, weakness'
    }

  },

  majorArcana: { // major arcana. Cards 57 - 78
    1: {
      name: 'The Fool',
      upright: 'Innocence, new beginnings, free spirit',
      reversed: 'Recklessness, taken advantage of, inconsideration'
    },

    2: {
      name: 'The Magician',
      upright: 'Willpower, desire, creation, manifestation',
      reversed: 'Trickery, illusions, out of touch'
    },

    3: {
      name: 'The Hight Priestess',
      upright: 'Intuitive, unconscious, inner voice',
      reversed: 'Lack of center, lost inner voice, repressed feelings'
    },

    4: {
      name: 'The Empress',
      upright: 'Motherhood, fertility, nature',
      reversed: 'Dependence, smothering, emptiness, nosiness'
    },

    5: {
      name: 'The Emperor',
      upright: 'Authority, structure, control, fatherhood',
      reversed: 'Tyranny, rigidity, coldness'
    },

    6: {
      name: 'The High Priest',
      upright: 'Tradition, conformity, morality, ethics',
      reversed: 'Rebellion, subversiveness, new approache'
    },

    7: {
      name: 'The Lovers',
      upright: 'Partnerships, duality, union',
      reversed: 'Loss of balance, one-sidedness, disharmony'
    },

    8: {
      name: 'The Chariot',
      upright: 'Direction, control, willpower',
      reversed: 'Lack of control, lack of direction, aggression'
    },

    9: {
      name: 'Strength',
      upright: 'Inner strength, bravery, compassion, focus',
      reversed: 'Self doubt, weakness, insecurity'
    },

    10: {
      name: 'The Hermit',
      upright: 'Contemplation, search for truth, inner guidance',
      reversed: 'Loneliness, isolation, lost your way'
    },

    11: {
      name: 'The Wheel of fortune',
      upright: 'Change, cycles, inevitable fate',
      reversed: 'No control, clinging to control, bad luck'
    },

    12: {
      name: 'Justice',
      upright: 'Cause and effect, clarity, truth',
      reversed: 'Dishonesty, unaccountability, unfairness'
    },

    13: {
      name: 'The Hanged Man',
      upright: 'Waiting, sacrifice, release, martyrdom',
      reversed: 'Stalling, needless sacrifice, fear of sacrifice'
    },

    14: {
      name: 'Death',
      upright: 'End of cycle, beginnings, change, metamorphosis',
      reversed: 'Fear of change, holding on, stagnation'
    },

    15: {
      name: 'Temperance',
      upright: 'Middle path, patience, finding meaning',
      reversed: 'Extremes, excess, lack of balance'
    },

    16: {
      name: 'The Devil',
      upright: 'The Unacknowledged, addiction, materialism, playfulness',
      reversed: 'Realisation, freedom, release, restoring control'
    },

    17: {
      name: 'The Tower',
      upright: 'Sudden upheaval, broken pride, disaster',
      reversed: 'Disaster avoided, delayed disaster, fear of suffering'
    },

    18: {
      name: 'The Star',
      upright: 'Hope, guidance, faith, rejuvenation',
      reversed: 'Faithlessness, being lost, discouragement, insecurity'
    },

    19: {
      name: 'The Moon',
      upright: 'Unconsciousness, illusions, intuition',
      reversed: 'Confusion, fear, misinterpretation'
    },

    20: {
      name: 'The Sun',
      upright: 'Joy, success, celebration, positivity',
      reversed: 'Negativity, depression, sadness'
    },

    21: {
      name: 'The Judgement',
      upright: 'Reflection, reckoning, awakening',
      reversed: 'Lack of self awareness, doubt, self loathing'
    },

    22: {
      name: 'The World',
      upright: 'Fulfillment, creation, harmony, completion',
      reversed: 'Incompletion, stagnation, disharmony, no closure'
    }

  },

  minorNames: { //
    1: 'Ace',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Page',
    12: 'Knight',
    13: 'Queen',
    14: 'King',
    rods: 'Rods',
    cogs: 'Cogs',
    sharp: 'Sharp',
    blades: 'Blades'
  },

  majorNames: {
    1: 'The Fool',
    2: 'The Magician',
    3: 'The High Priestess',
    4: 'The Empress',
    5: 'The Emperor',
    6: 'The High Priest',
    7: 'The Lovers',
    8: 'The Chariot',
    9: 'Strength',
    10: 'The Hermit',
    11: 'The Wheel of Fortune',
    12: 'Justice',
    13: 'The Hanged Man',
    14: 'Death',
    15: 'Temperance',
    16: 'The Devil',
    17: 'The Tower',
    18: 'The Star',
    19: 'The Moon',
    20: 'The Sun',
    21: 'Judgement',
    22: 'The Great Work'
  },
  pulledCards: [],

  /**
   * Creates an array with X number of unique elements.
   *
   * @param {number} cardsToPull - how many cards should be returned?
   * @returns {Array} pulledCards - cardsToPull ammount of unique identifiers 1 to 78
   */
  pullCards (cardsToPull) {
    this.pulledCards = []
    let randomCard = 0
    while (this.pulledCards.length < cardsToPull) {
      randomCard = Math.floor(Math.random() * 78) + 1
      if (this.pulledCards.includes(randomCard) === false) {
        this.pulledCards.push(randomCard)
      }
    }
    return this.pulledCards
  },

  /**
   * Write a tarot card outer frame at cordinates.
   *
   * @param {number} x - x TopLeft corner of card.
   * @param {number} y - y TopLeft corner of card.
   */
  writeCardFrame (x, y) {
    const canvas = document.getElementById('surface')
    const ctx = canvas.getContext('2d')
    ctx.shadowColor = 'green'
    ctx.shadowBlur = 15
    ctx.lineWidth = 0.1
    ctx.globalAlpha = 1
    ctx.fillStyle = this.settings.textColor
    ctx.fillRect(x, y, this.settings.cardsWidth, this.settings.cardsHeight)
    ctx.clearRect(x + 1, y + 1, this.settings.cardsWidth - 2, this.settings.cardsHeight - 2)
  },
  /**
   * Write a tarot card content at cordinates.
   *
   * @param {number} x - TopLeft corner of card.
   * @param {number} y - TopLeft corner of card.
   * @param {number} pulledCard - selects what card to write out.
   * @param {string} significance - what does the card reprecent?
   */
  writeCardContent (x, y, pulledCard, significance) {
    const ctx = document.getElementById('surface').getContext('2d')
    ctx.shadowColor = ''
    ctx.shadowBlur = 0
    let cardSuit = ''
    let cardSuitIcon = ''
    let card = 0
    let turned = ''
    const iconSize = this.settings.cardsWidth / 5

    // get position of card significance and write
    ctx.font = '24px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(significance, x + this.settings.cardsWidth / 2, y - 50)

    if (pulledCard >= 1 && pulledCard <= 14) { // is the random card from rods?
      cardSuit = 'rods'
      cardSuitIcon = document.getElementById('rod')
      card = pulledCard
    }

    if (pulledCard >= 15 && pulledCard <= 28) { // is the random card from cogs?
      cardSuit = 'cogs'
      cardSuitIcon = document.getElementById('cog')
      card = pulledCard % 14
    }

    if (pulledCard >= 29 && pulledCard <= 42) { // is the random card from sharp?
      cardSuit = 'sharp'
      cardSuitIcon = document.getElementById('sharp')
      card = pulledCard % 14
    }

    if (pulledCard >= 43 && pulledCard <= 56) { // is the random card from blades?
      cardSuit = 'blades'
      cardSuitIcon = document.getElementById('sword')
      card = pulledCard % 14
    }
    if (card === 0) {
      card = 14
    }

    // get full cardname, minor or major arcana?
    let cardName = ''
    if (pulledCard <= 56) { // minor
      cardName = this.minorNames[card] + ' of ' + this.minorNames[cardSuit]
    } else { // major
      cardSuit = 'majorArcana'
      card = pulledCard - 56
      cardName = this.majorArcana[card].name
    }
    if (Math.random() <= 0.49999999) {
      turned = 'upright'
    } else {
      turned = 'reversed'
    }
    cardName += ' - ' + turned

    // get to location for cardname and write
    ctx.font = '18px monospace'
    ctx.fillText(cardName, x + this.settings.cardsWidth / 2, y - 25)

    // get to location for Top Icons and write
    if (pulledCard < 56) {
      for (let i = 0; i < this.cardsTemplate[card].top; i++) {
        ctx.drawImage(cardSuitIcon,
          (x + iconSize / 4 + iconSize * i),
          y + iconSize / 4)
      }
    }

    // get to location for Center Icons and write
    if (pulledCard > 56) {
      const cultLogo = document.getElementById('center')
      ctx.drawImage(
        cultLogo,
        x + Math.floor(this.settings.cardsWidth / 2) - iconSize,
        y + Math.floor(this.settings.cardsHeight / 2) - 60,
        120, 120)
    } else if (card > 10) {
      ctx.fillText(
        `${this.cardsTemplate[card].center}`,
        x + Math.floor(this.settings.cardsWidth / 2),
        y + Math.floor(this.settings.cardsHeight / 2)
      )
    } else {
      const icons = this.cardsTemplate[card].center
      for (let i = 0; i < icons; i++) {
        ctx.drawImage(
          cardSuitIcon,
          (x + Math.floor(this.settings.cardsWidth / 2) - (icons * (iconSize / 2)) + (iconSize * i)),
          y + Math.floor(this.settings.cardsHeight / 2) - iconSize / 2)
      }
    }

    // get to location for Bottom Icons and write
    if (pulledCard < 56) {
      const icons = this.cardsTemplate[card].bottom
      for (let i = 0; i < this.cardsTemplate[card].bottom; i++) {
        ctx.drawImage(
          cardSuitIcon,
          (x + this.settings.cardsWidth - (iconSize / 3) - (icons * iconSize) + (iconSize * i)),
          (y + this.settings.cardsHeight - (iconSize * 1.5)))
      }
    }

    // get to location of description and write
    console.log(`${cardSuit} ${card} ${turned}`)
    try {
      ctx.fillText(this[cardSuit][card][turned],
        x + this.settings.cardsWidth / 2,
        y + this.settings.cardsHeight + 35,
        this.settings.cardsWidth * 1.5)
    } catch (error) {
      console.error(`Error : trying to located ${card}, ${cardSuit}, ${turned}`)
    }
  },

  /**
   * Write a tarot card at cordinates.
   *
   * @param {number} x - x TopLeft corner of card
   * @param {number} y - y TopLeft corner of card
   * @param {number} pulledCard - selects what card to write out.
   * @param {string} significance - what does the card reprecent?
   */
  writeCard (x, y, pulledCard, significance = 'Card of the day') {
    this.writeCardFrame(x, y)
    this.writeCardContent(x, y, pulledCard, significance)
  },

  /**
   * Writes one random card centerscreen.
   *
   */
  displayCardOfTheDay () {
    this.pullCards(1)
    this.clear()
    this.writeCard(
      Math.floor((this.settings.canvasWidth - this.settings.cardsWidth) / 2),
      this.settings.canvasHeight * 0.15,
      this.pulledCards[0])
  },

  /**
   * Writes three random card centerscreen.
   *
   */
  displayThreeCardSpread () {
    this.pullCards(3)
    this.clear()
    const significance = ['The Past', 'The Present', 'The Future']
    const xDistance = Math.floor(this.settings.canvasWidth / 5)
    for (let i = 0; i < this.pulledCards.length; i++) {
      this.writeCard(
        Math.floor((0.5 * xDistance) + (1.5 * xDistance * i)),
        this.settings.canvasHeight * 0.15 + ((i % 2) * 20),
        this.pulledCards[i], significance[i])
    }
  },

  /**
   * Writes all cards for debugging centerscreen.
   *
   */
  debuggTestAll () {
    this.pulledCards = []
    for (let i = 1; i < 79; i++) {
      this.writeCard(Math.floor((this.settings.terminalWidth - this.settings.cardsWidth) / 2), 10, i)
      // this.getCommand()
    }
  },
  /**
   * Empties the canvas.
   */
  clear () {
    const canvas = document.getElementById('surface')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, this.settings.canvasWidth, this.settings.canvasHeight)
  }
}
