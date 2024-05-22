import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Label,
  Accordion,
  AccordionTitle,
  AccordionContent,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditUserName({ user, setUser, setCurrUser }) {
  // State for toggling edit mode
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  // Form validation schema
  const formSchema = yup.object().shape({
    first_name: yup.string().required("Required"),
    last_name: yup.string().required("Required"),
    username: yup.string().required("Required"),
  });

  // Formik form handler
  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Update user data on server
      fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
        }),
      }).then((r) => {
        // Handle response
        if (r.ok) {
          r.json().then((data) => {
            setUser(data);
            setIsActive(false);
            setCurrUser(data);
            // Redirect if username changed
            if (user.username !== values.username) {
              navigate(`/users/${values.username}`);
            }
          });
        }
      });
    },
  });

  return (
    <Accordion>
      <AccordionTitle active={isActive}>
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Edit Name"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        {/* User name edit form */}
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Label>First Name</Label>
            <Input
              id="first_name"
              type="text"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              autoComplete="firstName"
            />
            <Label>Last Name</Label>
            <Input
              id="last_name"
              type="text"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              autoComplete="lastName"
            />
            <Label>Username</Label>
            <Input
              id="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              autoComplete="username"
            />
            <Button type="submit">Submit</Button>
          </FormField>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditUserName;
