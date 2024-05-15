import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Header, Divider, Segment, List } from "semantic-ui-react";
import UserCard from "../components/UserCard";

function ManageBand() {
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
    membersList = band.members.map((member) => {
      return (
        <UserCard
          key={member.id}
          user={member}
          sessionUser={user}
          band={band}
        />
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
      {/* ADD DELETE BAND BUTTON */}
    </>
  );
}

export default ManageBand;
