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
  }
}
