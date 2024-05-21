import { useState, useEffect } from "react";
import { List, ListItem, Button } from "semantic-ui-react";
import AddInstrumentForm from "./AddInstrumentForm";
import { useFormik } from "formik";
import * as yup from "yup";

function InstrumentsList({ user, setUser, currUser }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    formik.setValues({ instruments: currUser.instruments, selections: [] });
  }, [currUser]);

  const formSchema = yup.object().shape({
    instruments: yup
      .array()
      .of(yup.object().shape({ id: yup.number().required() })),
    selections: yup.array().of(yup.object().shape({ id: yup.number() })),
  });

  const formik = useFormik({
    initialValues: {
      instruments: currUser.instruments,
      selections: [],
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
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

  const displayInstruments = formik.values.instruments
    ? formik.values.instruments.map((instrument) => (
        <ListItem key={instrument.id}>
          {instrument.name}
          {isActive ? (
            <Button
              onClick={() =>
                formik.setValues({
                  instruments: formik.values.instruments.filter((i) => {
                    return i.id !== instrument.id;
                  }),
                  selections: formik.values.selections,
                })
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
      {displayInstruments}
      {isActive ? <AddInstrumentForm user={user} formik={formik} /> : null}{" "}
    </List>
  );
}

export default InstrumentsList;
