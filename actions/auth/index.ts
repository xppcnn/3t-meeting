"use server";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/utils/user";
import {
  loginFormReturnType,
  loginFormType,
  registerFormReturnType,
  registerFormType,
} from "./types";
import prisma from "@/lib/prisma";
import { createSafeAction } from "@/lib/createSafeAction";
import { loginFormSchema, registerFormSchema } from "./schema";
import { signIn } from "@/auth";

const loginHandler = async (
  data: loginFormType
): Promise<loginFormReturnType> => {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (!user) {
    return {
      error: "用户不存在",
    };
  }
  const passwordPass = await bcrypt.compare(password, user.password!);
  console.log("🚀 ~ file: index.ts:27 ~ passwordPass:", passwordPass);
  if (passwordPass) {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/user-center",
      });
      return {
        data: user,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }
      throw error;
    }
  } else {
    return {
      error: "用户密码错误",
    };
  }
};

const registerHandler = async (
  data: registerFormType
): Promise<registerFormReturnType> => {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (user) {
    return {
      error: "用户已存在",
    };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
  return {
    data: newUser,
  };
};

export const login = createSafeAction(loginFormSchema, loginHandler);
export const register = createSafeAction(registerFormSchema, registerHandler);
