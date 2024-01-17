import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "请输入正确的邮箱格式",
  }),
  password: z.string().min(1, {
    message: "请输入密码",
  }),
});

export const registerFormSchema = z
  .object({
    email: z.string().email({
      message: "请输入正确的邮箱格式",
    }),
    password: z.string().min(1, {
      message: "请输入密码",
    }),
    confirmPassword: z.string().min(1, {
      message: "请输入密码",
    }),
  })
  
