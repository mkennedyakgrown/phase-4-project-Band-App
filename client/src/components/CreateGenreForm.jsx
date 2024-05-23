import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, FormInput, Header, Label } from "semantic-ui-react";

function CreateGenreForm() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      // API call to create a new genre
      fetch("/api/genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          if (!r.ok) {
            console.log(r);
            alert("Error: " + r.statusText);
          }
          return r.json();
        })
        .then((data) => {
          console.log(data);
          formik.resetForm();
          alert(`${data.name} Genre created!`);
        });
    },
  });

  return (
    <>
      <Header as="h2">Create Genre</Header>
      <Form onSubmit={formik.handleSubmit}>
        <Label>Genre Name</Label>
        <FormInput
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

export default CreateGenreForm;
