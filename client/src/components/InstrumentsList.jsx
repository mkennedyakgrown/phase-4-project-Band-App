import { List, ListItem } from "semantic-ui-react";

function InstrumentsList({ instruments }) {
  let displayInstruments = [];
  if (instruments) {
    displayInstruments = instruments.map((instrument) => (
      <ListItem key={instrument.id}>{instrument.name}</ListItem>
    ));
  }
  return <List>{displayInstruments}</List>;
}

export default InstrumentsList;
