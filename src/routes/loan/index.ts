import { FastifyInstance } from "fastify";

export default async function loanRoutes(fastify: FastifyInstance) {
  fastify.get("/test", async () => {
    return "success";
  })
}