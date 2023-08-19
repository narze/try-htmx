import fastify from "fastify"
import view from "@fastify/view"

const server = fastify()

server.register(view, {
  engine: {
    ejs: require("ejs"),
  },
})

// <{
//   Querystring: IQuerystring,
//   Headers: IHeaders,
//   Reply: IReply
// }>
server.get<{
  Querystring: { name: string }
}>("/", (req, reply) => {
  reply.view("/templates/index.ejs", { name: req.query.name })
})

server.get("/ping", async (request, reply) => {
  return "pong!"
})

server.get("/counter", async (request, reply) => {
  return reply.view("/templates/counter.ejs", { value: 0 })
})

server.post("/counter/reset", async (request, reply) => {
  return reply.view("/templates/counter.ejs", { value: 0 })
})

server.post<{ Body: { value: string } }>(
  "/counter/increment",
  async (request, reply) => {
    return reply.view("/templates/counter.ejs", {
      value: 1 + Number(request.body.value),
    })
  }
)

server.post<{ Body: { value: string } }>(
  "/counter/decrement",
  async (request, reply) => {
    return reply.view("/templates/counter.ejs", {
      value: Number(request.body.value) - 1,
    })
  }
)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
