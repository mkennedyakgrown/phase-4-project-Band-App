import { useState } from "react";
import { Button, Input, FormField, Label, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
          } else {
            onLogin(data);
          }
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          autoComplete="username"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      <FormField>
        {formik.errors ? (
          <p>
            {Object.keys(formik.errors).map(
              (key) => `${key}: ${formik.errors[key]}`
            )}
          </p>
        ) : null}
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </FormField>
    </Form>
  );
}

export default LoginForm;
