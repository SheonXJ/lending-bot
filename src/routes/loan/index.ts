import { FastifyInstance } from "fastify";
import { Partial } from '@sinclair/typebox';

export default async function loanRoutes(fastify: FastifyInstance) {
  fastify.get("/test", async () => {
    return "success";
  })

fastify.post<{
  Body: {
    platform: string;
    rate: number;
    amount: number;
  };
}>("/", async (request, reply) => {
  const { platform, rate, amount } = request.body;

  const loanList = await fastify.prisma.loanHistory.create({
    data: {
      platform,
      rate,
      amount,
    },
  });

  return reply.send(loanList);
});

  fastify.get<{
    Querystring: Partial<{
      email: string;
      startAt: string;
      endAt: string;
    }>;
  }>("/list", async (request, reply) => {
    const loanList = await fastify.prisma.loanHistory.findMany({})
    
    return await reply.send(loanList)
  });
}