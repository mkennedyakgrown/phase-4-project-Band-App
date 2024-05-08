import { useOutletContext, useParams } from "react-router-dom";
import { Header, Divider, Segment, List, ListIcon } from "semantic-ui-react";

function ViewBand() {
  const { bands, users, sessionUser, userBands } = useOutletContext();
  const bandId = useParams().id;
  const band = bands[bandId - 1];
  let membersList = [];
  if (bands) {
    membersList = band.members.map((member) => {
      return (
        <List.Item>
          <ListIcon name="users" />
          {member.username}
        </List.Item>
      );
    });
  }

  return (
    <>
      <Header as="h1">{band.name}</Header>
      <Divider />
      <Segment>
        <Header as="h3">Managed By: {band.owner.username}</Header>
        <List></List>
      </Segment>
    </>
  );
}

export default ViewBand;
