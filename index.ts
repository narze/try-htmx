import fastify from "fastify"
import view from "@fastify/view"

const server = fastify()

server.register(view, {
  engine: {
    ejs: require("ejs"),
  },
})
server.register(require("@fastify/formbody"))

server.register(require("./app"))

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
