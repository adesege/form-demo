import { Formik } from "formik";
import transformValidation, {
  FormValues,
} from "../../helpers/transformValidation";
import { FormConfig, FormProps } from "../../types";

type FormikFormProps<T extends FormValues> = FormProps<T>;

const FormikForm = <T extends FormValues>({
  children,
  initialValues,
  onSubmit,
  validate,
}: FormikFormProps<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm, setErrors, setStatus }) =>
        onSubmit(values, { resetForm, setErrors, setErrorMessage: setStatus })
      }
      validate={validate ? transformValidation(validate) : undefined}
    >
      {(config) =>
        children({
          errors: config.errors as FormConfig<T>["errors"],
          handleSubmit: config.handleSubmit,
          isDirty: config.dirty,
          isInValid: !config.isValid,
          isSubmitting: config.isSubmitting,
          values: config.values,
          errorMessage: config.status as string,
        })
      }
    </Formik>
  );
};

export default FormikForm;
