import { Alert } from "@mui/material";
import { ComponentType, useCallback } from "react";
import FormikForm from "../form/formik/FormikForm";
import handleSubmitAction from "../helpers/handleSubmitAction";
import {
  FormValues,
  ValidationRulesType,
} from "../helpers/transformValidation";
import { SubmitHandler } from "../types";

export type FormField = {
  component: ComponentType<any>;
  type?: string;
  props: Record<string, string | any>;
};

type UseFormikFormsProps<T extends FormValues> = {
  initialValues: T;
  onSubmit: SubmitHandler<T>;
  validate: ValidationRulesType<T>;
  fields: FormField[];
};

const useFormikForms = <T extends FormValues>({
  initialValues,
  onSubmit,
  validate,
  fields,
}: UseFormikFormsProps<T>) => {
  const renderForm = useCallback(
    (hideErrorOnMount: boolean = false, disableButtonByDefault = true) => (
      <FormikForm<T>
        initialValues={initialValues}
        onSubmit={handleSubmitAction(onSubmit)}
        validate={validate}
      >
        {(config) => (
          <form onSubmit={config.handleSubmit}>
            {config.errorMessage && (
              <Alert severity="error">{config.errorMessage}</Alert>
            )}
            {fields.map(({ component: Component, ...field }) => (
              <Component
                fullWidth
                key={field.props.label || field.props.children}
                hideErrorOnMount={
                  field.type !== "button" && hideErrorOnMount ? true : undefined
                }
                disabled={
                  disableButtonByDefault && field.type === "button"
                    ? config.isInValid
                    : undefined
                }
                loading={
                  field.type === "button" ? config.isSubmitting : undefined
                }
                type={field.type === "button" ? "button" : undefined}
                {...field.props}
              />
            ))}
          </form>
        )}
      </FormikForm>
    ),
    [fields, initialValues, onSubmit, validate]
  );

  return renderForm;
};

export default useFormikForms;
