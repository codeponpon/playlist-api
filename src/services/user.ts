import { CreateUserInput } from "../interfaces/user";
import { hashPassword } from "../utils/hash";
import prisma from "../utils/prisma";

export const createUser = async (input: CreateUserInput) => {
  const { name, email, password } = input;
  const { hash, salt } = hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, salt, password: hash },
  });

  return user;
};

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUsers = () => {
  return prisma.user.findMany({
    select: {
      email: true,
      name: true,
      id: true,
    },
  });
};
