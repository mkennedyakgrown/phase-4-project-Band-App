import { useState, useEffect } from "react";
import { List, ListItem, Button } from "semantic-ui-react";
import AddInstrumentForm from "./AddInstrumentForm";
import { useFormik } from "formik";
import * as yup from "yup";

function InstrumentsList({ user, setUser, currUser }) {
  // State for toggling edit mode
  const [isActive, setIsActive] = useState(false);

  // Effect to set form values based on currUser
  useEffect(() => {
    formik.setValues({ instruments: currUser.instruments, selections: [] });
  }, [currUser]);

  // Form validation schema
  const formSchema = yup.object().shape({
    instruments: yup
      .array()
      .of(yup.object().shape({ id: yup.number().required() })),
    selections: yup.array().of(yup.object().shape({ id: yup.number() })),
  });

  // Formik form initialization
  const formik = useFormik({
    initialValues: {
      instruments: currUser.instruments,
      selections: [],
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Submit form data to API
      fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instruments: [...values.instruments, ...values.selections],
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          setUser(data);
          currUser = data;
          formik.resetForm();
          formik.setValues({ instruments: data.instruments, selections: [] });
          setIsActive(false);
        });
    },
  });

  // Display list of user's instruments
  const displayInstruments = formik.values.instruments
    ? formik.values.instruments.map((instrument) => (
        <ListItem key={instrument.id}>
          {instrument.name}
          {isActive ? (
            <Button
              onClick={() =>
                formik.setFieldValue(
                  "instruments",
                  formik.values.instruments.filter((i) => {
                    return i.id !== instrument.id;
                  })
                )
              }
            >
              Remove
            </Button>
          ) : (
            []
          )}
        </ListItem>
      ))
    : null;

  return (
    <List>
      {/* Conditional rendering of edit button */}
      {isActive ? (
        <Button color="green" type="submit" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      ) : null}
      {currUser.id === user.id ? (
        <Button
          onClick={() => {
            setIsActive(!isActive);
            isActive
              ? formik.setValues({
                  instruments: currUser.instruments,
                  selections: [],
                })
              : null;
          }}
        >
          {isActive ? "Cancel" : "Edit Instruments"}
        </Button>
      ) : null}
      {/* Display list of user's instruments */}
      {displayInstruments}
      {/* Conditional rendering of add instrument form */}
      {isActive ? <AddInstrumentForm user={user} formik={formik} /> : null}{" "}
    </List>
  );
}

export default InstrumentsList;
