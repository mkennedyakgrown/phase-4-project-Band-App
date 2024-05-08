import { useEffect, useState } from "react";
import { useOutletContext, useParams, NavLink } from "react-router-dom";
import { Header, Divider, Segment, List, ListIcon } from "semantic-ui-react";

function ViewBand() {
  const { sessionUser, userBands } = useOutletContext();
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
    console.log(band);
    membersList = band.members.map((member) => {
      console.log(member.instruments);
      return (
        <List.Item key={member.id}>
          <ListIcon name="users" />
          {member.username}
          <List.Description>
            Instruments:{" "}
            {member.instruments !== undefined
              ? member.instruments
                  .map((instrument) => instrument.name)
                  .join(", ")
              : ""}
          </List.Description>
        </List.Item>
      );
    });
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
        <List>{membersList}</List>
      </Segment>
    </>
  );
}

export default ViewBand;
