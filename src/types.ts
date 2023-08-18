import { FORM_ERROR } from "final-form";
import { ReactNode } from "react";
import { FormValues, ValidationRulesType } from "./helpers/transformValidation";

export type SubmissionErrors<T> =
  | {
      [V in keyof T]: string;
    }
  | { [FORM_ERROR]?: string };

export type SubmitHandler<T extends FormValues> = (
  values: T,
  form: {
    resetForm: () => void;
    setErrors?: (errors: {
      [V in keyof T]?: T[V];
    }) => void;
    setErrorMessage?: (status: string) => void;
  }
) => Promise<SubmissionErrors<T> | void>;

export type FormConfig<T extends FormValues> = {
  handleSubmit: () => void;
  values: T;
  errors: SubmissionErrors<T> | undefined;
  isSubmitting: boolean;
  isDirty: boolean;
  isInValid: boolean;
  errorMessage?: string;
};

export type FormProps<T extends FormValues> = {
  onSubmit: SubmitHandler<T>;
  initialValues: T;
  validate?: ValidationRulesType<T>;
  children: (config: FormConfig<T>) => ReactNode;
};
