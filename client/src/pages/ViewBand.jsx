import { useEffect, useState } from "react";
import { useOutletContext, useParams, NavLink, Form } from "react-router-dom";
import {
  Header,
  Divider,
  Segment,
  List,
  Card,
  Grid,
  GridColumn,
  GridRow,
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

function ViewBand() {
  const { user } = useOutletContext();
  const [band, setBand] = useState({});
  const [genreIsActive, setGenreIsActive] = useState(false);
  const [nameIsActive, setNameIsActive] = useState(false);
  const [genres, setGenres] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/bands/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBand(data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/genres")
      .then((r) => r.json())
      .then((data) => {
        setGenres(data);
      });
  }, []);

  const formSchema = yup.object().shape({
    name: yup.string().required("Required"),
    genre_id: yup.string().required("Required"),
  });

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
      <Segment>
        <Header as="h3">
          Managed By:{" "}
          {band.owner !== undefined
            ? `${band.owner.first_name} ${band.owner.last_name}`
            : "Loading Owner"}
        </Header>
      </Segment>
      <Segment>
        <Header as="h2">Members</Header>
        <BandMembersList band={band} setBand={setBand} />
      </Segment>
      <Segment>
        <Header as="h2">Songs</Header>
        <AddSongForm band={band} setBand={setBand} />
        <Divider />
        <BandSongsList band={band} setBand={setBand} />
      </Segment>
      {user.id === band.owner_id ? (
        <DeleteBandButton band={band} user={user} />
      ) : null}
    </>
  );
}

export default ViewBand;
