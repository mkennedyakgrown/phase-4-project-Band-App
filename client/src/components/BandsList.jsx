import { useState } from "react";
import { List } from "semantic-ui-react";
import BandListItem from "./BandListItem";

function BandsList({ bands }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let displayBands = [];

  // Check if bands exist
  if (bands) {
    // Map through bands to create BandListItem components
    displayBands = bands.map((band) => (
      <BandListItem
        key={band.id}
        band={band}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    ));
  }

  // Return a List component with bands or "No Bands" message
  return <List>{displayBands.length === 0 ? "No Bands" : displayBands}</List>;
}

export default BandsList;
