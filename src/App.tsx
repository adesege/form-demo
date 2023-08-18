import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import FormikTextInputField from "./form/formik/FormikTextInputField";
import FinalTextInputField from "./form/rff/FinalTextInputField";
import { isRequired } from "./helpers/validators";
import useFinalForms, { FormField } from "./hooks/useFinalForms";
import useFormikForms from "./hooks/useFormikForms";
import { SubmitHandler } from "./types";

type FormData = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
};

const getFields = (isFinalForm = true): FormField[] => [
  {
    component: isFinalForm ? FinalTextInputField : FormikTextInputField,
    props: {
      label: "First name",
      name: "firstName",
    },
  },
  {
    component: isFinalForm ? FinalTextInputField : FormikTextInputField,
    props: {
      label: "Last name",
      name: "lastName",
    },
  },
  {
    component: isFinalForm ? FinalTextInputField : FormikTextInputField,
    props: {
      label: "Company",
      name: "company",
    },
  },
  {
    component: isFinalForm ? FinalTextInputField : FormikTextInputField,
    props: {
      label: "Job title",
      name: "jobTitle",
    },
  },
  {
    component: LoadingButton,
    type: "button",
    props: {
      children: "Submit",
      variant: "contained",
      type: "submit",
    },
  },
];

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
};

const validate = {
  firstName: [isRequired],
  lastName: [isRequired],
  company: [isRequired],
  jobTitle: [isRequired],
};

const wait = (ts: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ts));

const App: FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async (values, form) => {
      await wait(3000);
      if (isChecked) {
        if (form.setErrors) {
          form.setErrors({
            company: "Example error from server side validation",
          });

          return;
        }

        return Promise.reject({
          message: "This is an error",
          status: 422,
          errors: {
            company: ["Example error from server side validation"],
          },
        });
      }

      form.resetForm();
      console.log(values);
    },
    [isChecked]
  );

  const renderFinalForm = useFinalForms({
    fields: getFields(),
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  const renderFormikForm = useFormikForms({
    fields: getFields(false),
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  const finalForms = [
    {
      title: "Default",
      form: renderFinalForm(),
    },
    {
      title: "Hide error on mount (With disabled button)",
      form: renderFinalForm(true),
    },
    {
      title: "Hide error on mount (With enabled button)",
      form: renderFinalForm(true, false),
    },
  ];

  const formikForms = [
    {
      title: "Default",
      form: renderFormikForm(),
    },
    {
      title: "Hide error on mount (With disabled button)",
      form: renderFormikForm(true),
    },
    {
      title: "Hide error on mount (With enabled button)",
      form: renderFormikForm(true, false),
    },
  ];

  return (
    <Container>
      <FormControlLabel
        control={
          <Switch
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
        }
        label="Simulate error on submit"
      />

      <Box marginBottom={5}>
        <Typography variant="h3" marginBottom={3}>
          RFF Demo
        </Typography>

        <Grid container columnSpacing={5}>
          {finalForms.map((finalForm) => (
            <Grid key={finalForm.title} item md={4}>
              <Typography variant="h4" marginBottom={3}>
                {finalForm.title}
              </Typography>

              {finalForm.form}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box marginBottom={5}>
        <Typography variant="h3" marginBottom={3}>
          Formik Demo
        </Typography>
        <Typography>With Formik, errors are not shown by default. </Typography>

        <Grid container columnSpacing={5}>
          {formikForms.map((finalForm) => (
            <Grid key={finalForm.title} item md={4}>
              <Typography variant="h4" marginBottom={3}>
                {finalForm.title}
              </Typography>

              {finalForm.form}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
