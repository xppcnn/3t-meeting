import { FieldErrors } from "@/lib/createSafeAction";

export type responseOkCode = 200;
export type responseErrorCode = 201;
export type responseBadCode = 400;

export type responseCode = responseOkCode | responseBadCode | responseErrorCode;

/**
 * 成功返回体
 * @param data
 * @param message
 * @param code
 * @returns
 */
export const ResponseOk = <TOutput>(
  data: TOutput,
  message = "success",
  code: responseOkCode = 200
) => {
  return {
    message,
    code,
    data,
  };
};

/**
 * 字段校验错误
 * @param fieldErrors
 * @param code
 * @returns
 */
export const ResponseBad = <TInput>(
  fieldErrors: FieldErrors<TInput> | null,
  code: responseBadCode = 400
) => {
  return {
    fieldErrors,
    code,
  };
};

/**
 * 错误返回体
 * @param message
 * @param code
 * @returns
 */
export const ResponseError = (
  message = "fail",
  code: responseErrorCode = 201
) => {
  return {
    message,
    code,
  };
};

/**
 * 统一返回体
 * @param message
 * @param data
 * @param code
 * @returns
 */
export const ResponseData = <TInput, TOutput>({
  message,
  data,
  fieldErrors,
  code = 200,
}: {
  message?: string;
  data?: TOutput;
  fieldErrors?: FieldErrors<TInput> | null;
  code?: responseCode;
}) => {
  if (code === 400) {
    return {
      fieldErrors,
      code,
    };
  }
  return {
    message,
    code,
    data,
  };
};
