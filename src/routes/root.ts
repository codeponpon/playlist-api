import { FastifyPluginAsync } from "fastify";
import {
  loginHandler,
  registerUserHandler,
} from "../controllers/users.controller";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.addHook("preHandler", (req, reply, next) => {
    req.jwt = fastify.jwt;
    return next();
  });

  fastify.get("/", async function (request, reply) {
    return { status: "Healthy" };
  });

  fastify.post("/api/register", registerUserHandler);
  fastify.post("/api/login", loginHandler);
};

export default root;
