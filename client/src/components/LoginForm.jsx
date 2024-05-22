import { useState } from "react";
import { Button, Input, FormField, Label, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  // State for errors and loading status
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Form validation schema
  const formSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    // Form submission handling
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
          // Set errors if present, otherwise trigger login
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
      {/* Username input field */}
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
      {/* Password input field */}
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
      {/* Submit button */}
      <FormField>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </FormField>
      {/* Display form errors */}
      <FormField>
        {formik.errors ? (
          <p>
            {Object.keys(formik.errors).map(
              (key) => `${key}: ${formik.errors[key]}`
            )}
          </p>
        ) : null}
        {/* Display server errors */}
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </FormField>
    </Form>
  );
}

export default LoginForm;
