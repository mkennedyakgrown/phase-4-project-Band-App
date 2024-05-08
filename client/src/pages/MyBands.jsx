import { useOutletContext } from "react-router-dom";
import BandCard from "../components/BandCard";

function MyBands() {
  const { bands, users, userBands, sessionUser } = useOutletContext();

  const displayBands = bands.map((band) => {
    return <BandCard key={band.id} band={band} sessionUser={sessionUser} />;
  });

  return <>{displayBands}</>;
}

export default MyBands;
