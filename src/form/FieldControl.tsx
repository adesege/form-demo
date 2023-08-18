import { Box } from "@mui/material";
import { FocusEvent, type ElementType } from "react";
import { FieldValue } from "../helpers/transformValidation";

export type FieldControlProps = {
  name: string;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  type?: string;
  helperText?: string;
};

export type BaseComponentFieldProps = {
  name: string;
  label?: string;
  id?: string;
  error?: boolean;
  helperText?: string;
  onChange?: (value: string) => void;
};

const FieldControl = <T extends FieldValue>({
  name,
  component: Component,
  type = "text",
  ...props
}: FieldControlProps & {
  component: ElementType;
  checked?: boolean;
  error: boolean;
  value: T;
  onChange: (value: FieldValue) => void;
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Component type={type} {...props} />
    </Box>
  );
};

export default FieldControl;
