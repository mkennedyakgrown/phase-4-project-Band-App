import { useEffect, useState } from "react";
import { useOutletContext, useParams, Form } from "react-router-dom";
import {
  Header,
  Divider,
  Segment,
  Button,
  FormInput,
  FormField,
  Dropdown,
} from "semantic-ui-react";
import BandMembersList from "../components/BandMembersList";
import BandSongsList from "../components/BandSongsList";
import { useFormik } from "formik";
import * as yup from "yup";
import DeleteBandButton from "../components/DeleteBandButton";
import AddSongForm from "../components/AddSongForm";
import AddMemberForm from "../components/AddMemberForm";

function ViewBand() {
  // State variables
  const { user } = useOutletContext();
  const [band, setBand] = useState({});
  const [genreIsActive, setGenreIsActive] = useState(false);
  const [nameIsActive, setNameIsActive] = useState(false);
  const [genres, setGenres] = useState([]);

  const { id } = useParams();

  // Fetch band data
  useEffect(() => {
    fetch(`/api/bands/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBand(data);
      });
  }, []);

  // Fetch genre data
  useEffect(() => {
    fetch("/api/genres")
      .then((r) => r.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  // Form validation schema
  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    genre_id: yup.string().required("Required"),
  });

  // Formik form
  const formik = useFormik({
    initialValues: {
      name: band.name,
      genre_id: band.genre_id,
    },
    onSubmit: (values) => {
      fetch(`/api/bands/${band.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => r.json())
        .then((data) => {
          setBand(data);
          setNameIsActive(false);
          setGenreIsActive(false);
        });
    },
  });

  // Genre options for dropdown
  const genreOptions = genres
    ? genres.map((genre) => {
        return {
          key: genre.id,
          text: genre.name,
          value: genre.id,
        };
      })
    : [];

  return (
    <>
      {/* Band Name section */}
      <Header as="h1">
        {band.name ? band.name : "Loading Band"}
        {user.id === band.owner_id ? (
          <Button onClick={() => setNameIsActive(!nameIsActive)}>
            {nameIsActive ? "Cancel" : "Edit Band Name"}
          </Button>
        ) : null}
        {nameIsActive ? (
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <FormInput
                name="name"
                placeholder={band.name}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </FormField>
            <Button type="submit">Submit</Button>
          </Form>
        ) : null}
      </Header>

      {/* Genre section */}
      <Header as="h3">
        Genre: {band.genre ? band.genre.name : "Loading Genre"}
        {user.id === band.owner_id ? (
          <Button onClick={() => setGenreIsActive(!genreIsActive)}>
            {genreIsActive ? "Cancel" : "Edit Genre"}
          </Button>
        ) : null}
        {genreIsActive ? (
          <Form onSubmit={formik.handleSubmit}>
            <FormField>
              <Dropdown
                placeholder="Select Genre"
                fluid
                selection
                options={genreOptions}
                value={formik.values.genre_id}
                onChange={(e, { value }) =>
                  formik.setFieldValue("genre_id", value)
                }
              />
            </FormField>
            <Button type="submit">Submit</Button>
          </Form>
        ) : null}
      </Header>

      <Divider />

      {/* Band owner section */}
      <Segment>
        <Header as="h3">
          Managed By:{" "}
          {band.owner !== undefined
            ? `${band.owner.first_name} ${band.owner.last_name}`
            : "Loading Owner"}
        </Header>
      </Segment>

      {/* Band Members section */}
      <Segment>
        <Header as="h2">Members</Header>
        {user.id === band.owner_id ? (
          <AddMemberForm band={band} setBand={setBand} />
        ) : null}
        <BandMembersList band={band} setBand={setBand} />
      </Segment>

      {/* Band Songs section */}
      <Segment>
        <Header as="h2">Songs</Header>
        {user.id === band.owner_id ? (
          <AddSongForm band={band} setBand={setBand} />
        ) : null}
        <Divider />
        <BandSongsList band={band} setBand={setBand} />
      </Segment>

      {/* Delete band button */}
      {user.id === band.owner_id ? (
        <DeleteBandButton band={band} user={user} />
      ) : null}
    </>
  );
}

export default ViewBand;
