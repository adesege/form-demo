import { FORM_ERROR } from "final-form";
import { SubmitHandler } from "../types";
import { FormValues } from "./transformValidation";

export type ErrorType<Values = FormValues> = {
  status: number;
  message: string;
  errors: {
    [K in keyof Values]: string[];
  };
};

export const transformErrorMessages = <T extends FormValues>(
  errors: Record<string, string[]>
) =>
  Object.entries(errors).reduce(
    (memo, [key, [message]]) => ({
      ...memo,
      [key]: message,
    }),
    {}
  ) as { [V in keyof T]: T[V] };

export const getErrorMessage = <Values>(exception: ErrorType<Values>) => {
  if (typeof exception === "string") {
    return exception;
  }

  return (
    exception?.message || "An unexpected error occurred. Please try again."
  );
};

const handleSubmitAction =
  <Values extends FormValues>(
    onSubmit: SubmitHandler<Values>
  ): SubmitHandler<Values> =>
  async (values, form) => {
    try {
      const result = await onSubmit(values, form);

      return result;
    } catch (error) {
      const exception = error as ErrorType<Values>;
      if (exception.status === 422) {
        if (typeof form.setErrors === "undefined") {
          return {
            ...transformErrorMessages<Values>(exception.errors),
            [FORM_ERROR]: getErrorMessage(exception),
          };
        }
      }

      form.setErrorMessage?.(getErrorMessage(exception));
      form.setErrors?.(transformErrorMessages<Values>(exception.errors));

      return {
        [FORM_ERROR]: getErrorMessage(exception),
      };
    }
  };

export default handleSubmitAction;
