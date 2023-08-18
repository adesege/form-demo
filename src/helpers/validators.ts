import baseIsEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { type ValidationFunction } from "./transformValidation";

export const isRequired = (
  value: string | boolean | never[] | Record<string, unknown>
) => {
  if (typeof value === "number" && Boolean(value)) {
    return true;
  }

  if (typeof value === "string" && !isEmpty(value)) {
    return true;
  }

  if (typeof value === "boolean" && Boolean(value)) {
    return true;
  }

  if (
    !Array.isArray(value) &&
    typeof value === "object" &&
    Boolean(value?.value)
  ) {
    return true;
  }

  return "This field is requried";
};

export const isEmail: ValidationFunction = (value: string) =>
  !value ||
  baseIsEmail(value) ||
  "Please provide a valid email address. Example test@test.com";
