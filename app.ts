import Fastify from "fastify"

async function routes(fastify: ReturnType<typeof Fastify>, options: any) {
  // <{
  //   Querystring: IQuerystring,
  //   Headers: IHeaders,
  //   Reply: IReply
  // }>
  fastify.get<{
    Querystring: { name: string }
  }>("/", (req, reply) => {
    reply.view("/templates/index.ejs", { name: req.query.name })
  })

  fastify.get("/ping", async (request, reply) => {
    return "pong!"
  })

  fastify.get("/counter", async (request, reply) => {
    return reply.view("/templates/counter.ejs", { value: 0 })
  })

  fastify.post("/counter/reset", async (request, reply) => {
    return reply.view("/templates/counter.ejs", { value: 0 })
  })

  fastify.post<{ Body: { value: string } }>(
    "/counter/increment",
    async (request, reply) => {
      return reply.view("/templates/counter.ejs", {
        value: 1 + Number(request.body.value),
      })
    }
  )

  fastify.post<{ Body: { value: string } }>(
    "/counter/decrement",
    async (request, reply) => {
      return reply.view("/templates/counter.ejs", {
        value: Number(request.body.value) - 1,
      })
    }
  )
}

export default routes
