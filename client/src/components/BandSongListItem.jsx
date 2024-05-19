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

function BandSongListItem({ song, band, setBand }) {
  const { user } = useOutletContext();
  const [isActive, setIsActive] = useState(false);
  const [nameIsActive, setNameIsActive] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    songs_users_instruments: yup.array(),
  });

  const formik = useFormik({
    initialValues: {
      name: song.name,
      songs_users_instruments: song.songs_users_instruments,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      fetch(`/api/songs/${song.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
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
          setIsActive(false);
          setNameIsActive(false);
        });
    },
  });

  const membersList = song.members
    ? song.members.map((member) => {
        const instrument = song.songs_users_instruments.filter(
          (inst) => inst.user_id === member.id
        );
        return (
          <List.Item key={member.id}>
            {member.first_name} {member.last_name}:{" "}
            {instrument[0].instrument.name}
          </List.Item>
        );
      })
    : null;

  return (
    <Item fluid="horizontal">
      <ItemHeader as="h3">
        {band.owner_id === user.id ? (
          <>
            <Button onClick={() => setIsActive(!isActive)}>
              {isActive ? "Cancel" : "Edit"}
            </Button>
            <br />
          </>
        ) : null}
        {song.name}{" "}
        {isActive === true && !nameIsActive ? (
          <Button onClick={() => setNameIsActive(!nameIsActive)}>
            Edit Name
          </Button>
        ) : null}
        {nameIsActive && isActive ? (
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
        <DeleteSongButton song={song} band={band} setBand={setBand} />
      ) : null}
      <Divider />
    </Item>
  );
}

export default BandSongListItem;
