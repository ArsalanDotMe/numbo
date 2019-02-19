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

      const famous = await db('famous_people').select().where({ pin })
      const firstPart = pin.substring(0, 2)
      const secondPart = pin.substring(2)

      console.log('parts', `${firstPart}:${secondPart}`)

      const firstOptions = await db('common_nouns').select(['noun']).where({ pin_half: firstPart })
      const secondOptions = await db('common_nouns').select(['noun']).where({ pin_half: secondPart })
      let commonNoun = null
      if (firstOptions.length > 0 && secondOptions.length > 0) {
        commonNoun = `${_.sample(firstOptions).noun} ${_.sample(secondOptions).noun}`
      }

      return h.view('home', {
        pin,
        famous,
        commonNoun
      })
    }
  })
}
