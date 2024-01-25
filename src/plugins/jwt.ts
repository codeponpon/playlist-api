import fp from "fastify-plugin";
import jwt, { JWT } from "@fastify/jwt";
import { JSONType } from "ajv";
import { FastifyReply, FastifyRequest } from "fastify";

export default fp(async (fastify: any) => {
  fastify.register(jwt, { secret: process.env.SECRET });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate(): JSONType;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}
