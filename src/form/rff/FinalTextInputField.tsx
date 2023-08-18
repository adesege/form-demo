import TextInput, { TextInputProps } from "../../components/TextInput";
import { FieldValue } from "../../helpers/transformValidation";
import FinalFieldControl, { FinalFieldControlProps } from "./FinalFieldControl";

type FinalTextInputFieldProps<T extends FieldValue> = TextInputProps &
  FinalFieldControlProps<T>;

const FinalTextInputField = <T extends FieldValue = string>(
  props: FinalTextInputFieldProps<T>
) => <FinalFieldControl<T> component={TextInput} {...props} />;

export default FinalTextInputField;
