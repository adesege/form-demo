import { ElementType, useMemo } from "react";
import { useField } from "react-final-form";
import { FieldValue } from "../../helpers/transformValidation";
import FieldControl, { FieldControlProps } from "../FieldControl";

export type FinalFieldControlProps<T extends FieldValue> = FieldControlProps & {
  defaultValue?: T;
  hideErrorOnMount: boolean;
};

const FinalFieldControl = <T extends FieldValue>({
  defaultValue,
  helperText,
  hideErrorOnMount,
  ...props
}: FinalFieldControlProps<T> & {
  component: ElementType;
}) => {
  const field = useField<T>(props.name, { defaultValue: defaultValue });

  const error = useMemo(
    () => (field.meta.error as string | undefined) || field.meta.submitError,
    [field.meta.error, field.meta.submitError]
  );

  return (
    <FieldControl
      {...props}
      {...field.input}
      error={
        hideErrorOnMount ? !!field.meta.touched && Boolean(error) : !!error
      }
      helperText={
        hideErrorOnMount && !field.meta.touched
          ? helperText
          : error || helperText
      }
      onChange={(value) => field.input.onChange({ target: { value } })}
    />
  );
};

export default FinalFieldControl;
