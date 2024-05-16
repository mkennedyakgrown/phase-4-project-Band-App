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
import UserCard from "../components/BandMemberCard";

function ViewBand() {
  const { user, userBands } = useOutletContext();
  const [band, setBand] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/bands/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setBand(data);
        console.log(`Band: ${data}`);
      });
  }, []);

  let membersList = [];
  if (band.name !== undefined) {
    const membersCards = band.members.map((member) => {
      return (
        <GridColumn>
          <UserCard
            key={member.id}
            user={member}
            sessionUser={user}
            band={band}
          />
        </GridColumn>
      );
    });
    while (membersCards.length > 0) {
      membersList.push(<GridRow>{membersCards.splice(0, 3)}</GridRow>);
    }
  }

  return (
    <>
      <Header as="h1">{band.name ? band.name : "Loading Band"}</Header>
      <Divider />
      <Segment>
        <Header as="h3">
          Managed By:{" "}
          {band.owner !== undefined ? band.owner.username : "Loading Owner"}
        </Header>
      </Segment>
      <Segment>
        <Header as="h3">Members</Header>
        <Grid columns={3} divided="vertically">
          {membersList}
        </Grid>
      </Segment>
    </>
  );
}

export default ViewBand;
