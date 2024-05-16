import { useState } from "react";
import { Card, Accordion } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import RemoveMemeberButton from "./RemoveMemberButton";

function BandMemberCard({ member, band, setBand }) {
  const { user } = useOutletContext();
  const [isActive, setIsActive] = useState(false);
  const bands = member.member_bands.map((band) => band.name).join(", ");

  return (
    <Card>
      <Card.Content>
        <Card.Header>{member.username}</Card.Header>
        <Card.Meta>{member.email}</Card.Meta>
        <Card.Description>
          Instruments:{" "}
          {member.instruments.map((instrument) => instrument.name).join(", ")}
          <Accordion onClick={() => setIsActive(!isActive)}>
            <Accordion.Title active={isActive} index={0}></Accordion.Title>
            <Accordion.Content active={isActive}>
              Member of: {bands}
            </Accordion.Content>
          </Accordion>
          {user.id === band.owner.id && (
            <RemoveMemeberButton
              member={member}
              band={band}
              setBand={setBand}
            />
          )}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default BandMemberCard;
