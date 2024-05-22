import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "semantic-ui-react";
import UserInfo from "../components/UserInfo";

function Profile() {
  const [currUser, setCurrUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        setCurrUser(data);
      });
  }, []);

  return (
    <>
      {username === "undefined" ? <Navigate to="/login" /> : null}
      <Header as="h1">Profile</Header>
      <UserInfo currUser={currUser} setCurrUser={setCurrUser} />
    </>
  );
}

export default Profile;
