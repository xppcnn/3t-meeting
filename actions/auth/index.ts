"use server";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/utils/user";
import {
  editNameFormReturnType,
  editNameFormType,
  loginFormReturnType,
  loginFormType,
  newVerificationFormReturnType,
  newVerificationFormType,
  registerFormReturnType,
  registerFormType,
} from "./types";
import prisma from "@/lib/prisma";
import { createSafeAction } from "@/lib/createSafeAction";
import {
  editNameFormSchema,
  loginFormSchema,
  newVerificationFormSchema,
  registerFormSchema,
} from "./schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { ResponseBad, ResponseError, ResponseOk } from "@/lib/actionResponse";
import { sendVerificationEmail } from "@/lib/email";
import { getVerificationTokenByToken } from "@/utils/verificationToken";
import { generateMeetingCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const loginHandler = async (
  data: loginFormType
): Promise<loginFormReturnType> => {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (!user || !user.email || !user.password) {
    return ResponseError("用户不存在");
  }
  const passwordPass = await bcrypt.compare(password, user.password!);
  if (passwordPass) {
    if (!user.emailVerified) {
      const verificationToken = await generateVerificationToken(user.email);
      await sendVerificationEmail(email, verificationToken.token);
      return ResponseOk(null, "以发送确认邮件，请前往邮件确认");
    }
    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
      return ResponseOk(user);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return ResponseError("账号密码错误");
          default:
            return ResponseError("服务器错误!");
        }
      }
      throw error;
    }
  } else {
    return {
      message: "用户密码错误",
      code: 201,
    };
  }
};

const registerHandler = async (
  data: registerFormType
): Promise<registerFormReturnType> => {
  const { email, password, name } = data;
  const user = await getUserByEmail(email);
  if (user) {
    return {
      message: "用户已存在",
      code: 201,
    };
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
      meetingCode: generateMeetingCode(), // todo 没保证唯一性
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);
  return ResponseOk(null, "以发送确认邮件，请前往邮件确认");
};

const newVerificationHandler = async (
  data: newVerificationFormType
): Promise<newVerificationFormReturnType> => {
  const { token } = data;
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return ResponseError("令牌不存在");
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return ResponseError("令牌已失效");
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return ResponseError("邮箱错误");
  }
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
      meetingCode: generateMeetingCode(), // todo 没保证唯一性
    },
  });
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return ResponseOk(null, "邮箱验证成功");
};

const editNameHandler = async (
  data: editNameFormType
): Promise<editNameFormReturnType> => {
  const { userId, name } = data;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return ResponseError("该用户不存在");
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
    },
  });
  revalidatePath("/user-center/person-info")
  return ResponseOk(updated, "更新成功");
};

export const login = createSafeAction(loginFormSchema, loginHandler);
export const register = createSafeAction(registerFormSchema, registerHandler);
export const newVerification = createSafeAction(
  newVerificationFormSchema,
  newVerificationHandler
);
export const editName = createSafeAction(editNameFormSchema, editNameHandler);
