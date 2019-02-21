const _ = require('lodash')
const db = require('../db')

module.exports = async function HomeRoute (server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
      const { pin } = request.query

      if (!pin) {
        return h.view('home')
      }

      if (pin && pin.length !== 4) {
        const pinError = 'You must specify a 4-digit pin!'
        return h.view('home', { pin, pinError })
      }

      const famous = await db('famous_people').select().where({ pin })
      const firstPart = pin.substring(0, 2)
      const secondPart = pin.substring(2)

      const firstOptions = await db('common_nouns').select(['noun']).where({ pin_half: firstPart })
      const secondOptions = await db('common_nouns').select(['noun']).where({ pin_half: secondPart })
      let commonNoun = null
      let commonNounHint = null
      if (firstOptions.length > 0 && secondOptions.length > 0) {
        const firstNoun = _.sample(firstOptions).noun
        const secondNoun = _.sample(secondOptions).noun
        commonNoun = `${firstNoun} ${secondNoun}`
        commonNounHint = `${pin[0]}${_.repeat('-', firstNoun.length - 2)}${pin[1]} ` +
          `${pin[2]}${_.repeat('-', secondNoun.length - 2)}${pin[3]}`
      }

      return h.view('home', {
        pin,
        famous,
        commonNoun,
        commonNounHint
      })
    }
  })
}
