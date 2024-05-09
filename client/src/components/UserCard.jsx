import { useState } from "react";
import { Card, Accordion, Button } from "semantic-ui-react";
import RemoveMemeberButton from "./RemoveMemberButton";

function UserCard({ user, sessionUser, band }) {
  const [isActive, setIsActive] = useState(false);
  const bands = user.member_bands.map((band) => band.name).join(", ");
  console.log(bands);
  return (
    <Card>
      <Card.Content>
        <Card.Header>{user.username}</Card.Header>
        <Card.Meta>{user.email}</Card.Meta>
        <Card.Description>
          Instruments:{" "}
          {user.instruments.map((instrument) => instrument.name).join(", ")}
          <Accordion onClick={() => setIsActive(!isActive)}>
            <Accordion.Title active={isActive} index={0}></Accordion.Title>
            <Accordion.Content active={isActive}>
              Member of: {bands}
            </Accordion.Content>
          </Accordion>
          {sessionUser.id === band.owner.id && (
            <RemoveMemeberButton user={user} band={band} />
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default UserCard;
