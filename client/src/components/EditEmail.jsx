import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Accordion,
  AccordionTitle,
  AccordionContent,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";

function EditEmail({ user, setUser, currUser }) {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState(user.email);

  // Form validation schema
  const formSchema = yup.object().shape({
    email: yup.string().email().required("Required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      email: user.email,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // API call to update user email
      fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      }).then((r) => {
        if (r.ok) {
          // Update user and close edit mode
          r.json().then((updatedUser) => setUser(updatedUser));
          currUser.email = values.email;
          setIsActive(false);
        }
      });
    },
  });

  return (
    <Accordion>
      {/* Edit Email section */}
      <AccordionTitle active={isActive}>
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Edit Email"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        {/* Email edit form */}
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Input
              id="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="email"
            />
            <Button type="submit">Submit</Button>
          </FormField>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditEmail;
