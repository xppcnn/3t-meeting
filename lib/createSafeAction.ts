import { z } from "zod";
import {
  responseErrorCode,
  responseOkCode,
  responseBadCode,
  ResponseBad,
} from "@/lib/actionResponse";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> =
  | {
      message: string | null;
      code: responseOkCode;
      data: TOutput | null;
    }
  | {
      message: string | null;
      code: responseErrorCode;
    }
  | {
      fieldErrors?: FieldErrors<TInput> | null;
      code: responseBadCode;
    };

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema,
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validatedData = schema.safeParse(data);
    if (!validatedData.success) {
      return ResponseBad<TInput>(validatedData.error.flatten().fieldErrors);
    }
    return handler(validatedData.data);
  };
};
