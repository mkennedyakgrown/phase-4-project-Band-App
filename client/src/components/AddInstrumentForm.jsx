import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  Label,
  List,
  Checkbox,
  FormGroup,
} from "semantic-ui-react";

function AddInstrumentForm({ user, formik }) {
  const [instruments, setInstruments] = useState([]);
  const userInstrumentIds = user.instruments.map((instrument) => instrument.id);

  useEffect(() => {
    fetch("/api/instruments")
      .then((r) => r.json())
      .then((data) => {
        setInstruments(data);
      });
  }, []);

  const instrumentChoices = instruments
    .filter((instrument) => !userInstrumentIds.includes(instrument.id))
    .map((instrument) => (
      <FormField key={instrument.id}>
        <Checkbox
          label={instrument.name}
          name="instruments"
          value={instrument.id}
          onChange={() => {
            formik.values.selections == []
              ? formik.setValues({
                  instruments: formik.values.instruments,
                  selections: [...formik.values.selections, instrument],
                })
              : !formik.values.selections.includes(instrument)
              ? formik.setValues({
                  instruments: formik.values.instruments,
                  selections: [...formik.values.selections, instrument],
                })
              : formik.setValues({
                  instruments: formik.values.instruments,
                  selections: formik.values.selections.filter(
                    (e) => e.id !== instrument.id
                  ),
                });
          }}
        />
      </FormField>
    ));

  return (
    <Form>
      <FormGroup>
        <Label as="h3" content="Add Instruments" />
        <List>{instrumentChoices}</List>
      </FormGroup>
    </Form>
  );
}

export default AddInstrumentForm;
