import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, FormInput, Header } from "semantic-ui-react";
import { useState } from "react";

function AddMemberForm({ band, setBand }) {
  const [isActive, setIsActive] = useState(false);

  const formSchema = yup.object().shape({
    username: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "band.members",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Make a PATCH request to update band information
      fetch(`/api/bands/${band.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          // Update the band data, and reset the form
          setBand(data);
          formik.resetForm();
          setIsActive(false);
        });
    },
  });

  return (
    <>
      {/* Toggle button for the form */}
      <Button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Cancel" : "Add Band Member"}
      </Button>
      {isActive ? (
        <>
          <Header as="h3">Add Band Member</Header>
          <Form onSubmit={formik.handleSubmit}>
            {/* Input field for entering username */}
            <FormInput
              name="username"
              placeholder="Enter Username"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </>
      ) : null}
    </>
  );
}

export default AddMemberForm;
