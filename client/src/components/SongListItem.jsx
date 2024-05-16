import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionTitle,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function SongListItem({ song, activeIndex, setActiveIndex }) {
  let members = [];
  let instruments = [];
  if (song) {
    members = song.members.map((member) => (
      <Link
        key={`song-${song.id}-member-${member.id}`}
        to={`/users/${member.username}`}
      >
        <ListItem key={member.id}>{member.name}</ListItem>
      </Link>
    ));
    instruments = song.instruments.map((instrument) => (
      <ListItem key={`song-${song.id}-instrument-${instrument.id}`}>
        {instrument.name}
      </ListItem>
    ));
  }
  return (
    <ListItem key={song.id}>
      <Card>
        <Accordion>
          <AccordionTitle
            active={activeIndex === song.id}
            index={song.id}
            onClick={() => {
              activeIndex === song.id
                ? setActiveIndex(0)
                : setActiveIndex(song.id);
            }}
          >
            {song.name}
          </AccordionTitle>
          <Accordion.Content active={activeIndex === song.id}>
            {/* <Header as="h3">Band: {song.band.name}</Header> */}
            <Header as="h3">Members:</Header>
            <List>{members.length === 0 ? "No Members" : members}</List>
            <Header as="h3">Instruments:</Header>
            <List>
              {instruments.length === 0 ? "No Instruments" : instruments}
            </List>
          </Accordion.Content>
        </Accordion>
      </Card>
    </ListItem>
  );
}

export default SongListItem;
