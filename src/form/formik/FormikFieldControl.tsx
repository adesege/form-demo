import { useField } from "formik";
import { ElementType, useMemo } from "react";
import { FieldValue } from "../../helpers/transformValidation";
import FieldControl, { FieldControlProps } from "../FieldControl";

export type FormikFieldControlProps<T extends FieldValue> =
  FieldControlProps & {
    defaultValue?: T;
    hideErrorOnMount: boolean;
  };

const FormikFieldControl = <T extends FieldValue>({
  defaultValue,
  helperText,
  hideErrorOnMount,
  ...props
}: FormikFieldControlProps<T> & {
  component: ElementType;
}) => {
  const [input, meta] = useField<T>({
    name: props.name,
    defaultValue: defaultValue,
  });

  const error = useMemo(() => meta.error as string, [meta.error]);

  return (
    <FieldControl
      {...props}
      {...input}
      error={!!meta.touched && Boolean(error)}
      helperText={(meta.touched && error) || helperText}
      onChange={(value) => input.onChange(props.name)(value as string)}
    />
  );
};

export default FormikFieldControl;
