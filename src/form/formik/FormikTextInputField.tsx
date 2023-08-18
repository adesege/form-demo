import TextInput, { TextInputProps } from "../../components/TextInput";
import { FieldValue } from "../../helpers/transformValidation";
import FormikFieldControl, {
  FormikFieldControlProps,
} from "./FormikFieldControl";

type FormikTextInputFieldProps<T extends FieldValue> = TextInputProps &
  FormikFieldControlProps<T>;

const FormikTextInputField = <T extends FieldValue = string>(
  props: FormikTextInputFieldProps<T>
) => <FormikFieldControl<T> component={TextInput} {...props} />;

export default FormikTextInputField;
