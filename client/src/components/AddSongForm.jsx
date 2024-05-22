import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, FormInput, Header } from "semantic-ui-react";
import { useState } from "react";

function AddSongForm({ band, setBand }) {
  // State for toggling form visibility
  const [isActive, setIsActive] = useState(false);

  // Form validation schema
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    band_id: yup.number().required("Required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      band_id: band.id,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Submit form data to backend
      fetch("/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          // Update band state with new song
          setBand({ ...band, songs: [...band.songs, data] });
          formik.resetForm();
          setIsActive(false);
        });
    },
  });

  return (
    <>
      {/* Toggle form visibility */}
      <Button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Cancel" : "Add New Song"}
      </Button>
      {isActive ? (
        <>
          <Header as="h3">Add New Song</Header>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              name="name"
              placeholder="Song Name"
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

export default AddSongForm;
