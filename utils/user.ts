import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

/**
 * 根据email查找用户
 * @param email
 * @returns
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
