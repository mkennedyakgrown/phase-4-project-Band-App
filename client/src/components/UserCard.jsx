import { useState } from "react";
import { Card, Accordion, Button } from "semantic-ui-react";

function UserCard({ user, sessionUser }) {
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
          <Button onClick={() => console.log(user)}>Remove Band Member</Button>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default UserCard;
