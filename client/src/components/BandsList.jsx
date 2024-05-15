import { useState } from "react";
import { List } from "semantic-ui-react";
import BandListItem from "./BandListItem";

function BandsList({ bands }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let displayBands = [];
  if (bands) {
    displayBands = bands.map((band) => (
      <BandListItem
        key={band.id}
        band={band}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    ));
  }
  return <List>{displayBands.length === 0 ? "No Bands" : displayBands}</List>;
}

export default BandsList;
