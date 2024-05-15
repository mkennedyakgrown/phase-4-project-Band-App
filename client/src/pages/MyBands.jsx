import { useOutletContext, Navigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import BandCard from "../components/BandCard";

function MyBands() {
  const { userBands, user } = useOutletContext();

  const displayBands = userBands.map((band) => {
    return <BandCard key={band.id} band={band} />;
  });

  return (
    <>
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">My Bands</Header>
      {userBands.length === 0 ? <p>No Bands to Display</p> : null}{" "}
      {displayBands}
    </>
  );
}

export default MyBands;
