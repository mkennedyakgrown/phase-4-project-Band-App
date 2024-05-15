import { useState } from "react";
import {
  Header,
  SegmentGroup,
  Segment,
  Icon,
  List,
  ListItem,
  Accordion,
  AccordionTitle,
} from "semantic-ui-react";
import BandsList from "./BandsList";
import InstrumentsList from "./InstrumentsList";

function UserInfo({ currUser }) {
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
        <BandsList bands={currUser.id ? currUser.member_bands : []} />
      </Segment>
      <Segment>
        <Header as="h3">Instruments</Header>
        <InstrumentsList instruments={currUser.instruments} />
      </Segment>
    </SegmentGroup>
  );
}

export default UserInfo;
