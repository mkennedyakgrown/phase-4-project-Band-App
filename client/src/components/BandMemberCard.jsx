import { useState } from "react";
import { Card, Accordion } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import RemoveMemeberButton from "./RemoveMemberButton";

function BandMemberCard({ member, band, setBand }) {
  const { user } = useOutletContext();

  // Extract and format member bands
  const bands = member.member_bands
    ? member.member_bands.map((band) => band.name).join(", ")
    : [];

  return (
    <Card>
      <Card.Content>
        {/* Display member's full name */}
        <Card.Header>
          {member.first_name} {member.last_name}
        </Card.Header>
        {/* Display email link */}
        <Card.Meta>
          <a href={`mailto:${member.email}`}>{member.email}</a>
        </Card.Meta>
        {/* Display link to user's profile */}
        <Card.Meta>
          <NavLink to={`/users/${member.username}`}>
            Go to {member.username}'s profile
          </NavLink>
        </Card.Meta>
        {/* Display member's instruments */}
        <Card.Description>
          Instruments:{" "}
          {member.instruments.map((instrument) => instrument.name).join(", ")}
          {(user.id === band.owner.id) & (member.id !== band.owner.id) ? (
            <RemoveMemeberButton
              member={member}
              band={band}
              setBand={setBand}
            />
          ) : null}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default BandMemberCard;
