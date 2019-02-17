module.exports = async function HomeRoute (server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return h.view('home')
    }
  })
}
