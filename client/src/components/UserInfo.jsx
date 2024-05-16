import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Header, SegmentGroup, Segment, Icon } from "semantic-ui-react";
import BandsList from "./BandsList";
import InstrumentsList from "./InstrumentsList";
import SongsList from "./SongsList";
import EditUserName from "./EditUserName";
import EditEmail from "./EditEmail";
import DeleteUser from "./DeleteUser";

function UserInfo({ currUser }) {
  const { user, setUser } = useOutletContext();
  return (
    <SegmentGroup fluid="true">
      <Segment>
        <Header as="h2">{currUser.username}</Header>
        {currUser.id === user.id ? (
          <EditUserName user={currUser} setUser={setUser} />
        ) : null}
      </Segment>
      <Segment>
        <a href={`mailto:${currUser.email}`}>
          <Icon name="mail" />
          {currUser.email}
        </a>
        {currUser.id === user.id ? (
          <EditEmail user={user} setUser={setUser} currUser={currUser} />
        ) : null}
      </Segment>
      <Segment>
        <Header as="h3">Member of Bands:</Header>
        <BandsList bands={currUser.id ? currUser.member_bands : []} />
      </Segment>
      <Segment>
        <Header as="h3">Instruments</Header>
        <InstrumentsList user={user} setUser={setUser} currUser={currUser} />
      </Segment>
      <Segment>
        <Header as="h3">Songs Played</Header>
        <SongsList songs={currUser.songs} currUser={currUser} />
      </Segment>
      {currUser.id === user.id ? (
        <Segment>
          <DeleteUser user={currUser} setUser={setUser} />
        </Segment>
      ) : null}
    </SegmentGroup>
  );
}

export default UserInfo;
