import get from "lodash.get";
import isEmpty from "lodash.isempty";
import omitBy from "lodash.omitby";

export type FormValues = Record<string, any>;
export type FieldValue = string | number;

type ValidationReturnType = true | string;
type ValidationFunctions = ValidationFunction[];

export type ValidationFunction = (value: string) => ValidationReturnType;
export type ValidationRulesType<T> = {
  [P in keyof T]: ValidationFunctions;
};

const transformValidation =
  <T extends FormValues>(rules: ValidationRulesType<T>) =>
  (values: T): Record<string, string> =>
    omitBy(
      Object.entries(rules).reduce((memo, [name, validators]) => {
        const errorMessage = validators
          .map<string | undefined>((validator) => {
            const result = validator(get(values, name) as never);
            return result === true ? undefined : result;
          })
          .filter((item) => Boolean(item))
          .shift();

        return { ...memo, [name]: errorMessage };
      }, {}),
      isEmpty
    );

export default transformValidation;
