import { ListItem, Accordion, AccordionTitle } from "semantic-ui-react";
import BandCard from "./BandCard";

function BandListItem({ band, activeIndex, setActiveIndex }) {
  return (
    <ListItem key={band.id}>
      <Accordion>
        <AccordionTitle
          active={activeIndex === band.id}
          index={band.id}
          onClick={() => {
            activeIndex === band.id
              ? setActiveIndex(0)
              : setActiveIndex(band.id);
          }}
        >
          {band.name}
        </AccordionTitle>
        <Accordion.Content active={activeIndex === band.id}>
          <BandCard band={band} />
        </Accordion.Content>
      </Accordion>
    </ListItem>
  );
}

export default BandListItem;
