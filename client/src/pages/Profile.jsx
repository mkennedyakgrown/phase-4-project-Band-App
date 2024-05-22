import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "semantic-ui-react";
import UserInfo from "../components/UserInfo";

function Profile() {
  // State for the current user
  const [currUser, setCurrUser] = useState({});
  // Get the username from the URL params
  const { username } = useParams();

  // Fetch user data when component mounts
  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((r) => r.json())
      .then((data) => {
        setCurrUser(data);
      });
  }, []);

  return (
    <>
      {/* Redirect to login if username is undefined */}
      {username === "undefined" ? <Navigate to="/login" /> : null}
      <Header as="h1">Profile</Header>
      {/* Display user information */}
      <UserInfo currUser={currUser} setCurrUser={setCurrUser} />
    </>
  );
}

export default Profile;
