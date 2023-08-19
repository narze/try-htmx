import fastify from "fastify"
import view from "@fastify/view"

const server = fastify()

server.register(view, {
  engine: {
    ejs: require("ejs"),
  },
})

server.get("/", (req, reply) => {
  reply.view("/templates/index.ejs", { name: req.query.name })
})

server.get("/ping", async (request, reply) => {
  return "pong\n"
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
