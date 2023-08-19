"use strict"

// Read the .env file.
import * as dotenv from "dotenv"
dotenv.config()

// Require the framework
import Fastify from "fastify"

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

export default async (req, res) => {
  await app.ready()
  app.server.emit("request", req, res)
}
