import { useState } from "react";
import {
  FormField,
  Button,
  Form,
  Dropdown,
  Label,
  Input,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function NewBandForm({ genres }) {
  // Navigation hook for redirecting after form submission
  const navigate = useNavigate();

  // Form validation schema
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    genre_id: yup.number().required("Required"),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      name: "",
      genre_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // API call to create a new band
      fetch("/api/bands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => navigate(`/bands/${data.id}`));
    },
  });

  // Generate genre options for the dropdown
  let genreOptions = [];
  if (genres[0] != undefined) {
    genreOptions = genres.map((genre) => {
      return {
        key: genre.id,
        text: genre.name,
        value: genre.id,
      };
    });
  }

  // Handle dropdown selection change
  function handleDropdownChange(e, { name, value }) {
    formik.setFieldValue(name, value);
  }

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormField onChange={formik.handleChange}>
        <Label basic pointing="below">
          Band Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </FormField>
      <FormField>
        <Label basic pointing="below">
          Genre
        </Label>
        <Dropdown
          placeholder="Select Genre"
          selection
          name="genre_id"
          options={genreOptions}
          value={formik.values.genre}
          onChange={handleDropdownChange}
        />
      </FormField>
      <Button type="submit">Submit</Button>
      <p>
        {formik.errors.name} {formik.errors.genre}
      </p>
    </Form>
  );
}

export default NewBandForm;
