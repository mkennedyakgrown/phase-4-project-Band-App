import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Accordion,
  AccordionTitle,
  AccordionContent,
  Label,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function EditPassword({ user, setUser }) {
  const [isActive, setIsActive] = useState(false);

  const formSchema = yup.object().shape({
    previous_password: yup.string().required("Required"),
    new_password: yup.string().required("Required"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      previous_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: values.new_password,
          previous_password: values.previous_password,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
          formik.resetForm();
          setIsActive(false);
          alert("Password changed");
        } else if (r.status === 401) {
          alert("Incorrect password");
        }
      });
    },
  });

  return (
    <Accordion>
      <AccordionTitle active={isActive}>
        <Button
          onClick={() => {
            isActive ? formik.resetForm() : null;
            setIsActive(!isActive);
          }}
        >
          {isActive ? "Cancel" : "Change Password"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        <Form
          onSubmit={
            formik.errors[0]
              ? () =>
                  alert(
                    Object.keys(formik.errors).map(
                      (key) => `${key}: ${formik.errors[key]}`
                    )
                  )
              : formik.handleSubmit
          }
        >
          <FormField>
            <Label>Previous Password</Label>
            <Input
              id="previous_password"
              type="password"
              value={formik.values.previous_password}
              onChange={formik.handleChange}
              autoComplete="password"
            />
          </FormField>
          <FormField>
            <Label>New Password</Label>
            <Input
              id="new_password"
              type="password"
              value={formik.values.new_password}
              onChange={formik.handleChange}
              autoComplete="password"
            />
          </FormField>
          <FormField>
            <Label>Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              autoComplete="password"
              error
            />
          </FormField>
          <Button color="green" type="submit">
            Submit
          </Button>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditPassword;
