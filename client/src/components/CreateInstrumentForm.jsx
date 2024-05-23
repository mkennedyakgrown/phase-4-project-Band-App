import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, FormInput, Header, Label } from "semantic-ui-react";

function CreateInstrumentForm() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      // API call to create a new genre
      fetch("/api/instruments", {
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
          if (data.error) {
            alert(data.error);
          }
          console.log(data);
          formik.resetForm();
          alert(`${data.name} Instrument created!`);
        });
    },
  });

  return (
    <>
      <Header as="h2">Create Instrument</Header>
      <Form onSubmit={formik.handleSubmit}>
        <Label>Instrument Name</Label>
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

export default CreateInstrumentForm;
