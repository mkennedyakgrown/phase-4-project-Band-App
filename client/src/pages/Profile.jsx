import { useOutletContext, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header, SegmentGroup, Segment } from "semantic-ui-react";
import UserInfo from "../components/UserInfo";

function Profile() {
  const [currUser, setCurrUser] = useState({});
  const { user } = useOutletContext();
  const { username } = useParams();

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        setCurrUser(data);
      });
  }, [username]);

  return (
    <>
      <Header as="h1">Profile</Header>
      <UserInfo currUser={currUser} />
    </>
  );
}

export default Profile;
