import {
  Button,
  Divider,
  Item,
  ItemHeader,
  List,
  Form,
  FormInput,
} from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteSongButton from "./DeleteSongButton";
import AddMemberInstrumentForm from "./AddMemberInstrumentForm";

function BandSongListItem({ song, band, setBand }) {
  const { user } = useOutletContext();
  const [isActive, setIsActive] = useState(false);
  const [nameIsActive, setNameIsActive] = useState(false);

  // Form validation schema
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: song.name,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      // Update song information
      fetch(`/api/songs/${song.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          // Update band state
          setBand({
            ...band,
            songs: band.songs.map((s) => {
              if (s.id === song.id) {
                return data;
              } else {
                return s;
              }
            }),
          });
          // Reset state variables
          setIsActive(false);
          setNameIsActive(false);
        });
    },
  });

  // Remove song user instrument
  function removeSongUserInstrument(member, instrument) {
    const song_user_instrument = song.songs_users_instruments.find((e) => {
      return (
        e.user_id === member.id && e.instrument_id === instrument.instrument.id
      );
    });
    // Delete song user instrument
    fetch(`/api/songs_users_instruments/${song_user_instrument.id}`, {
      method: "DELETE",
    });
    // Update band state
    setBand({
      ...band,
      songs: band.songs.map((s) => {
        if (s.id === song.id) {
          return {
            ...s,
            members: s.members.filter((m) => m.id !== member.id),
          };
        } else {
          return s;
        }
      }),
    });
  }

  // List of members with instruments
  const membersList = song.members
    ? song.members.map((member) => {
        const instrument = song.songs_users_instruments.filter(
          (inst) => inst.user_id === member.id
        )[0];
        return (
          <List.Item key={member.id}>
            {member.first_name} {member.last_name}: {instrument.instrument.name}
            <br />*{instrument.notes}*
            {isActive ? (
              <Button
                onClick={() => removeSongUserInstrument(member, instrument)}
              >
                Remove
              </Button>
            ) : null}
          </List.Item>
        );
      })
    : null;

  return (
    <Item fluid="horizontal">
      <ItemHeader as="h3">
        {band.owner_id === user.id ? (
          <>
            {/* Edit button */}
            <Button onClick={() => setIsActive(!isActive)}>
              {isActive ? "Done" : "Edit"}
            </Button>
            <br />
          </>
        ) : null}
        {/* Song name */}
        {song.name}{" "}
        {isActive === true && !nameIsActive ? (
          // Edit name button
          <Button onClick={() => setNameIsActive(!nameIsActive)}>
            Edit Name
          </Button>
        ) : null}
        {nameIsActive && isActive ? (
          // Name edit form
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
            />
            <Button type="submit">Submit</Button>
          </Form>
        ) : null}
      </ItemHeader>
      <List>{membersList}</List>
      {isActive ? (
        <AddMemberInstrumentForm song={song} band={band} setBand={setBand} />
      ) : null}
      {isActive ? (
        <DeleteSongButton song={song} band={band} setBand={setBand} />
      ) : null}
      <Divider />
    </Item>
  );
}

export default BandSongListItem;
