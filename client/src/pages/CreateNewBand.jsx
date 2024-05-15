import { useState, useEffect } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import NewBandForm from "../components/NewBandForm";

function CreateNewBand() {
  const [genres, setGenres] = useState([]);

  const { user } = useOutletContext();

  useEffect(() => {
    fetch("/api/genres")
      .then((r) => r.json())
      .then((data) => setGenres(data));
  }, []);

  return (
    <>
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">Create A New Band</Header>
      <NewBandForm genres={genres} />
    </>
  );
}

export default CreateNewBand;
