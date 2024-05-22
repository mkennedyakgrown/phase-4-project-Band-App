// components/AddInstrumentForm.jsx
import { useState, useEffect } from "react";
import {
  Form,
  FormField,
  Label,
  List,
  Checkbox,
  FormGroup,
} from "semantic-ui-react";

// Define the AddInstrumentForm component
function AddInstrumentForm({ user, formik }) {
  // State for instruments and user instrument IDs
  const [instruments, setInstruments] = useState([]);
  const userInstrumentIds = user.instruments.map((instrument) => instrument.id);

  // Fetch instruments data on component mount
  useEffect(() => {
    fetch("/api/instruments")
      .then((r) => r.json())
      .then((data) => {
        setInstruments(data);
      });
  }, []);

  // Filter and map instrument choices
  const instrumentChoices = instruments
    .filter((instrument) => !userInstrumentIds.includes(instrument.id))
    .map((instrument) => (
      <FormField key={instrument.id}>
        <Checkbox
          label={instrument.name}
          name="instruments"
          value={instrument.id}
          onChange={() => {
            !formik.values.selections.includes(instrument)
              ? formik.setFieldValue("selections", [
                  ...formik.values.selections,
                  instrument,
                ])
              : formik.setFieldValue(
                  "selections",
                  formik.values.selections.filter((e) => e.id !== instrument.id)
                );
          }}
        />
      </FormField>
    ));

  // Return the form with instrument choices
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
