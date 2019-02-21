const Path = require('path')
const Hapi = require('hapi')
const Vision = require('vision')
const Inert = require('inert')
const Nunjucks = require('nunjucks')
const HomeRoute = require('./routes/home')

const server = Hapi.Server({
  port: process.env.PORT,
  host: process.env.HOST || '0.0.0.0'
})

const provisionServer = async (server) => {
  await server.register(Vision)
  await server.register(Inert)

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

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'public')
      }
    }
  })

  await HomeRoute(server)
}

module.exports = {
  server,
  provisionServer
}
