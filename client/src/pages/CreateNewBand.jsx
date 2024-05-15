import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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
      <Header as="h1">Create A New Band</Header>
      <NewBandForm genres={genres} />
    </>
  );
}

export default CreateNewBand;
