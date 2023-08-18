import {
  TextField as BaseTextField,
  type TextFieldProps as BaseTextFieldProps,
} from "@mui/material";
import { BaseComponentFieldProps } from "../form/FieldControl";

export type TextInputProps = Omit<BaseTextFieldProps, "onChange"> &
  BaseComponentFieldProps;

const TextInput = ({ onChange, ...props }: TextInputProps) => (
  <BaseTextField
    variant="outlined"
    {...props}
    onChange={(event) => onChange?.(event.target.value)}
    InputLabelProps={{
      ...props.InputLabelProps,
      shrink: Boolean(props.value) || props.focused,
    }}
    InputProps={{
      ...props.InputProps,
      inputProps: {
        ...props.InputProps?.inputProps,
        style: {
          boxShadow: "none",
        },
      },
      sx: {
        ...props.InputProps?.sx,
        "& input:-internal-autofill-selected, input:-webkit-autofill": {
          WebkitTextFillColor: "currentcolor",
        },
      },
    }}
  />
);

export default TextInput;
