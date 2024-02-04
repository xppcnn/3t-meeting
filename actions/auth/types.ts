import { z } from "zod";
import {
  editNameFormSchema,
  loginFormSchema,
  newVerificationFormSchema,
  registerFormSchema,
} from "./schema";
import { ActionState } from "@/lib/createSafeAction";
import { User } from "@prisma/client";

export type loginFormType = z.infer<typeof loginFormSchema>;
export type loginFormReturnType = ActionState<loginFormType, User>;

export type registerFormType = z.infer<typeof registerFormSchema>;
export type registerFormReturnType = ActionState<registerFormType, User>;

export type newVerificationFormType = z.infer<typeof newVerificationFormSchema>;
export type newVerificationFormReturnType = ActionState<
  newVerificationFormType,
  null
>;
export type editNameFormType = z.infer<typeof editNameFormSchema>;
export type editNameFormReturnType = ActionState<editNameFormType, User>;
