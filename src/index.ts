import Fastify from "fastify";
import dotenv from "dotenv";
import loanRoutes from "./routes/loan/index";
import prismaPlugin from "./plugins/prisma";

dotenv.config()

const app = Fastify({ logger: true });

app.register(prismaPlugin);
app.register(loanRoutes, { prefix: "/api/loan" });

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("🚀 Server running on http://localhost:3000");
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
