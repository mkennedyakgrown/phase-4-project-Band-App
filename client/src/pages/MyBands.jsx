import { useOutletContext } from "react-router-dom";
import { Header } from "semantic-ui-react";
import BandCard from "../components/BandCard";

function MyBands() {
  const { userBands, user } = useOutletContext();
  console.log(userBands);

  const displayBands = userBands.map((band) => {
    return <BandCard key={band.id} band={band} user={user} />;
  });

  return (
    <>
      <Header as="h1">My Bands</Header>
      {userBands.length === 0 ? <p>No Bands to Display</p> : null}{" "}
      {displayBands}
    </>
  );
}

export default MyBands;
