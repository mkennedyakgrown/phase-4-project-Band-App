import { useState } from "react";
import {
  Header,
  SegmentGroup,
  Segment,
  Icon,
  List,
  Accordion,
  AccordionTitle,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function UserInfo({ currUser }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let displayBands = [];
  if (currUser.id) {
    console.log(currUser);
    displayBands = currUser.member_bands.map((band) => {
      return (
        <li key={band.id}>
          <Accordion>
            <AccordionTitle
              active={activeIndex === band.id}
              index={band.id}
              onClick={() => setActiveIndex(band.id)}
            >
              {band.name}
            </AccordionTitle>
            <Accordion.Content active={activeIndex === band.id}>
              <Link to={`/bands/${band.name}`}>Go to {band.name}'s page</Link>
            </Accordion.Content>
          </Accordion>
        </li>
      );
    });
  }
  return (
    <SegmentGroup fluid="true">
      <Segment>
        <Header as="h2">{currUser.username}</Header>
      </Segment>
      <Segment>
        <a href={`mailto:${currUser.email}`}>
          <Icon name="mail" />
          {currUser.email}
        </a>
      </Segment>
      <Segment>
        <Header as="h3">Member of Bands:</Header>
        <List>{displayBands}</List>
      </Segment>
    </SegmentGroup>
  );
}

export default UserInfo;
