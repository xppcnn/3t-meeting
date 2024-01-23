import { useCallback, useState } from "react";
import { ActionState, FieldErrors } from "@/lib/createSafeAction";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput | null, message?: string | null) => void;
  onError?: (error: string | null) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options?: UseActionOptions<TOutput>
) => {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput> | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<TOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input);
        if (!result) {
          return;
        }
        if (result.code === 400) {
          setFieldErrors(result.fieldErrors || null);
        } else {
          setFieldErrors(null);
        }
        if (result.code === 200) {
          setData(result.data);
          setMessage(result.message);
          options?.onSuccess?.(result.data, result.message);
        }
        if (result.code === 201) {
          setMessage(result.message);
          options?.onError?.(result.message);
        }
      } finally {
        setIsLoading(false);
        options?.onComplete?.();
      }
    },
    [action, options]
  );
  const reset = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setMessage(null);
    setFieldErrors(null);
  }, []);
  return {
    execute,
    message,
    data,
    fieldErrors,
    isLoading,
    reset,
  };
};
