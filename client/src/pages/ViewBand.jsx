import { useEffect, useState } from "react";
import { useOutletContext, useParams, NavLink } from "react-router-dom";
import {
  Header,
  Divider,
  Segment,
  List,
  Card,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import BandMembersList from "../components/BandMembersList";
import BandSongsList from "../components/BandSongsList";

function ViewBand() {
  const { user } = useOutletContext();
  const [band, setBand] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/bands/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBand(data);
      });
  }, []);

  return (
    <>
      <Header as="h1">{band.name ? band.name : "Loading Band"}</Header>
      <Header as="h3">
        Genre: {band.genre ? band.genre.name : "Loading Genre"}
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
        <Divider />
        <BandSongsList band={band} setBand={setBand} />
      </Segment>
    </>
  );
}

export default ViewBand;
