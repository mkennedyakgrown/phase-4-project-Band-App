import { useOutletContext, Navigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import UserCard from "../components/BandMemberCard";

function Profile() {
  const { user } = useOutletContext();
  return (
    <>
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">Profile</Header>
      <UserCard user={user} sessionUser={user} />
    </>
  );
}

export default Profile;
