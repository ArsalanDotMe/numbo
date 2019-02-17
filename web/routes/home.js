module.exports = async function HomeRoute (server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      const { pin } = request.query
      return h.view('home', {
        pin
      })
    }
  })
}
