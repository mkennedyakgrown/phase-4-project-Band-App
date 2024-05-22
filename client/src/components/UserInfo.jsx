import { useOutletContext } from "react-router-dom";
import { Header, SegmentGroup, Segment, Icon } from "semantic-ui-react";
import BandsList from "./BandsList";
import InstrumentsList from "./InstrumentsList";
import SongsList from "./SongsList";
import EditUserName from "./EditUserName";
import EditEmail from "./EditEmail";
import DeleteUser from "./DeleteUser";
import EditPassword from "./EditPassword";

function UserInfo({ currUser, setCurrUser }) {
  const { user, setUser } = useOutletContext();

  return (
    <SegmentGroup fluid="true">
      <Segment>
        <Header as="h2">
          {currUser.first_name} {currUser.last_name}
        </Header>
        {currUser.id === user.id ? (
          <div>
            {/* Edit user's first and last name */}
            <EditUserName
              user={currUser}
              setUser={setUser}
              setCurrUser={setCurrUser}
            />
            {/* Edit user's password */}
            <EditPassword user={currUser} setUser={setUser} />
          </div>
        ) : null}
      </Segment>
      <Segment>
        <a href={`mailto:${currUser.email}`}>
          <Icon name="mail" />
          {currUser.email}
        </a>
        {currUser.id === user.id ? (
          // Edit user's email
          <EditEmail user={user} setUser={setUser} currUser={currUser} />
        ) : null}
      </Segment>
      <Segment>
        <Header as="h3">Member of Bands:</Header>
        {/* Display list of bands user is a member of */}
        <BandsList bands={currUser.id ? currUser.member_bands : []} />
      </Segment>
      <Segment>
        <Header as="h3">Instruments</Header>
        {/* Display list of instruments */}
        <InstrumentsList user={user} setUser={setUser} currUser={currUser} />
      </Segment>
      <Segment>
        <Header as="h3">Songs Played</Header>
        {/* Display list of songs user has played */}
        <SongsList songs={currUser.songs} currUser={currUser} />
      </Segment>
      {currUser.id === user.id ? (
        <Segment>
          {/* Delete user */}
          <DeleteUser user={currUser} setUser={setUser} />
        </Segment>
      ) : null}
    </SegmentGroup>
  );
}

export default UserInfo;
