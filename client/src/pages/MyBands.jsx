import { useOutletContext } from "react-router-dom";
import BandCard from "../components/BandCard";

function MyBands() {
  const { userBands, sessionUser } = useOutletContext();
  console.log(userBands);

  const displayBands = userBands.map((band) => {
    return <BandCard key={band.id} band={band} sessionUser={sessionUser} />;
  });

  return <>{displayBands}</>;
}

export default MyBands;
