import { FORM_ERROR } from "final-form";
import { Form } from "react-final-form";
import transformValidation, {
  FormValues,
} from "../../helpers/transformValidation";
import { FormConfig, FormProps } from "../../types";

type FinalFormProps<T extends FormValues> = FormProps<T>;

const FinalForm = <T extends FormValues>({
  children,
  initialValues,
  onSubmit,
  validate,
}: FinalFormProps<T>) => {
  return (
    <Form<T>
      initialValues={initialValues}
      onSubmit={(values, { reset }) => onSubmit(values, { resetForm: reset })}
      validate={validate ? transformValidation(validate) : undefined}
    >
      {(config) => {
        return (
          // @ts-ignore
          console.log(config.errors, "________", config.submitErrors) ||
          children({
            errors: config.errors as FormConfig<T>["errors"],
            handleSubmit: config.handleSubmit,
            isDirty: config.dirty,
            isInValid: config.invalid,
            isSubmitting: config.submitting,
            values: config.values,
            errorMessage: config.submitErrors?.[FORM_ERROR],
          })
        );
      }}
    </Form>
  );
};

export default FinalForm;
