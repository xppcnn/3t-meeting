import { v4 as uuid } from "uuid";
import prisma from "@/lib/prisma";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      email,
    },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });
  return verificationToken;
};
