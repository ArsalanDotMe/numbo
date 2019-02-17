const Hapi = require('hapi')
const Vision = require('vision')
const Nunjucks = require('nunjucks')
const HomeRoute = require('./routes/home')

const server = Hapi.Server({
  port: 3000,
  host: 'localhost'
})

const provisionServer = async (server) => {
  await server.register(Vision)

  server.views({
    engines: {
      html: {
        compile: (src, options) => {
          const template = Nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },

        prepare: (options, next) => {
          options.compileOptions.environment = Nunjucks.configure(options.path, { watch: false })

          return next()
        }
      }
    },
    // relativeTo: __dirname,
    path: `${__dirname}/views`
  })

  await HomeRoute(server)
}

module.exports = {
  server,
  provisionServer
}
