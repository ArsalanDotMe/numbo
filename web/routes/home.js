const db = require('../db')

module.exports = async function HomeRoute (server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
      const { pin } = request.query

      const famous = await db('famous_people').select().where({ pin })

      console.log('famous results', famous)

      return h.view('home', {
        pin,
        famous
      })
    }
  })
}
