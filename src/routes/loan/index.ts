import { FastifyInstance } from "fastify";
import { Partial } from '@sinclair/typebox';
import S from 'fluent-json-schema';

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
  }>(
    "/",
    {
      schema: {
        security: [{ token: [] }],
        tags: ["loan"],
        body: S.object()
          .prop("platform", S.string())
          .prop("rate", S.number())
          .prop("amount", S.number()),
        summary: "建立借貸紀錄",
        response: {
          default: S.object().additionalProperties(true),
        },
      },
    },
    async (request, reply) => {
      const { platform, rate, amount } = request.body;

      const loanList = await fastify.prisma.loanHistory.create({
        data: {
          platform,
          rate,
          amount,
        },
      });

      return reply.send(loanList);
    }
  );

  fastify.get<{
    Querystring: Partial<{
      email: string;
      startAt: string;
      endAt: string;
    }>;
  }>(
    "/list",
    {
      schema: {
        security: [{ token: [] }],
        tags: ["loan"],
        querystring: S.object()
          .prop("email", S.string())
          .prop("startAt", S.string())
          .prop("endAt", S.string()),
        summary: "搜尋借貸紀錄",
        response: {
          default: S.object().additionalProperties(true),
        },
      },
    },
    async (request, reply) => {
      const loanList = await fastify.prisma.loanHistory.findMany({});

      return await reply.send(loanList);
    }
  );
}