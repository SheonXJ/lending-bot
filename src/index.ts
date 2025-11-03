import Fastify from "fastify";
import dotenv from "dotenv";
import loanRoutes from "./routes/loan/index";
import prismaPlugin from "./plugins/prisma";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

dotenv.config()

const app = Fastify({ logger: true });

// load mysql prisma
app.register(prismaPlugin);
// load routes
app.register(loanRoutes, { prefix: "/api/loan" });
// load Swagger 設定
app.register(swagger, {
  openapi: {
    info: {
      title: 'My API',
      description: 'API 說明文件',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        token: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header'
        }
      }
    }
  }
})
app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list'
  }
})

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
