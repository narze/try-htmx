"use strict"

// Require the framework
const Fastify = require("fastify")
const view = require("@fastify/view")

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
})

app.register(view, {
  engine: {
    ejs: require("ejs"),
  },
})
app.register(require("@fastify/formbody"))

// Register your application as a normal plugin.
app.register(require("../app.js"))

module.exports = async (req, res) => {
  await app.ready()
  app.server.emit("request", req, res)
}
