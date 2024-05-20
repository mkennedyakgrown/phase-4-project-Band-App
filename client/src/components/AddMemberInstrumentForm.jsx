import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Card,
  Dropdown,
  Form,
  FormField,
  FormInput,
  Label,
} from "semantic-ui-react";

function AddMemberInstrumentForm({ song, band, setBand }) {
  const [memberOptions, setMemberOptions] = useState([]);
  const [instrumentOptions, setInstrumentOptions] = useState([]);
  const [currSong, setCurrSong] = useState({ ...song });

  const formSchema = yup.object().shape({
    user_id: yup.number().required("Required"),
    instrument_id: yup.number().required("Required"),
    song_id: yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      user_id: "",
      instrument_id: "",
      song_id: song.id,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/api/songs_users_instruments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          fetch(`/api/songs/${song.id}`)
            .then((r) => r.json())
            .then((data) => setCurrSong(data));
        });
    },
  });

  useEffect(() => {
    const songMembersIds = song.members.map((m) => m.id);
    setMemberOptions(
      band.members
        .filter((m) => !songMembersIds.includes(m.id))
        .map((member) => {
          return {
            key: member.id,
            text: `${member.first_name} ${member.last_name}`,
            value: member.id,
          };
        })
    );
    fetch(`/api/instruments`)
      .then((r) => r.json())
      .then((instruments) => {
        setInstrumentOptions(
          instruments.map((instrument) => {
            return {
              key: instrument.id,
              text: instrument.name,
              value: instrument.id,
            };
          })
        );
      });
  }, [band]);

  function handleDropdownChange(e, { name, value }) {
    formik.setFieldValue(name, value);
  }

  return (
    <Card fluid>
      <Card.Header as="h3">Add Member-Instrument</Card.Header>
      <Form onSubmit={formik.handleSubmit}>
        <FormField>
          <Label>Member</Label>
          <FormInput>
            <Dropdown
              search
              fluid
              selection
              name="user_id"
              onChange={handleDropdownChange}
              value={formik.values.user_id}
              placeholder="Select Member"
              options={memberOptions}
            />
          </FormInput>
        </FormField>
        <FormField>
          <Label>Instrument</Label>
          <FormInput>
            <Dropdown
              search
              fluid
              selection
              name="instrument_id"
              onChange={handleDropdownChange}
              value={formik.values.instrument_id}
              placeholder="Select Instrument"
              options={instrumentOptions}
            />
          </FormInput>
        </FormField>
        <Button type="submit" onClick={formik.handleSubmit}>
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default AddMemberInstrumentForm;
