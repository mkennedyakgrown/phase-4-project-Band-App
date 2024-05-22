import { useOutletContext, Navigate } from "react-router-dom";
import { Header } from "semantic-ui-react";
import BandCard from "../components/BandCard";

function MyBands() {
  const { user } = useOutletContext();

  // Map through the member bands to display BandCard for each band
  const displayBands = user.member_bands
    ? user.member_bands.map((band) => {
        return <BandCard key={band.id} band={band} />;
      })
    : [];

  return (
    <>
      {/* Redirect to login if user is not logged in */}
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">My Bands</Header>
      {/* Display bands or message if no bands */}
      {displayBands.length === 0 ? <p>No Bands to Display</p> : displayBands}
    </>
  );
}

export default MyBands;
