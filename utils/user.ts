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

/**
 * 根据id查找用户
 * @param id
 * @returns
 */
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
