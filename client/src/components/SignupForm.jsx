import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Button,
  Input,
  FormField,
  Form,
  Label,
  Header,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function SignupForm({ onLogin }) {
  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Context
  const { setUser } = useOutletContext();

  // Form validation schema
  const formSchema = yup.object().shape({
    username: yup.string().required("Required"),
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    password: yup.string().required("Required"),
    password_confirmation: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup.string().email("Invalid email").required("Required"),
  });

  // Formik form initialization
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      // API call
      fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user); // Set user context
            onLogin(user); // Perform login
          });
        } else {
          r.json().then((err) => setErrors(err.errors)); // Set errors
        }
        setIsLoading(false);
      });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Header as="h1">Signup</Header>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          autoComplete="username"
        />
      </FormField>
      {/* First Name Field */}
      <FormField>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          type="text"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          autoComplete="first-name"
        />
      </FormField>
      {/* Last Name Field */}
      <FormField>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          type="text"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          autoComplete="last-name"
        />
      </FormField>
      {/* Password Field */}
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
      </FormField>
      {/* Password Confirmation Field */}
      <FormField>
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          autoComplete="current-password"
        />
        <p>{formik.errors.password_confirmation}</p>
      </FormField>
      {/* Email Field */}
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </FormField>
      {/* Submit Button */}
      <FormField>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      {/* Display Errors */}
      {errors.map((err) => (
        <li key={err}>{err}</li>
      ))}
    </Form>
  );
}

export default SignupForm;
