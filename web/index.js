const { server, provisionServer } = require('./server')

const init = async () => {
  await provisionServer(server)
  await server.start()
  console.log(`Server running at: ${server.info.uri}`)
}

init()
