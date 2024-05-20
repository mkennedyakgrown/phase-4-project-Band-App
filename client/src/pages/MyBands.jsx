import { useOutletContext, Navigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import BandCard from "../components/BandCard";

function MyBands() {
  const { user } = useOutletContext();

  const displayBands = user.member_bands
    ? user.member_bands.map((band) => {
        return <BandCard key={band.id} band={band} />;
      })
    : [];

  return (
    <>
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">My Bands</Header>
      {displayBands.length === 0 ? <p>No Bands to Display</p> : displayBands}
    </>
  );
}

export default MyBands;
