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
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const loginHandler = async (
  data: loginFormType
): Promise<loginFormReturnType> => {
  const { email, password } = data;
  console.log("🚀 ~ file: index.ts:21 ~ data:", data);
  const user = await getUserByEmail(email);
  console.log("🚀 ~ file: index.ts:23 ~ user:", user);
  if (!user) {
    return {
      error: "用户不存在",
    };
  }
  const passwordPass = await bcrypt.compare(password, user.password!);
  if (passwordPass) {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      return {
        data: user,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "账号密码错误" };
          default:
            return { error: "服务器错误!" };
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
