import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionTitle,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function SongListItem({ song, activeIndex, setActiveIndex, currUser }) {
  // Initialize variables
  let members = [];
  let bandName = "";

  // Check if song exists
  if (song) {
    // Map members
    members = song.members.map((member) => {
      // Get instrument for each member
      const instrument = song.songs_users_instruments.filter(
        (inst) => inst.user_id === member.id
      )[0];

      // Return JSX for each member
      return (
        <ListItem key={member.id}>
          <Link
            key={`song-${song.id}-member-${member.id}`}
            to={`/users/${member.username}`}
          >
            {member.first_name} {member.last_name}
          </Link>{" "}
          - {instrument.instrument.name}
          <br />*{instrument.notes}*
        </ListItem>
      );
    });

    // Check if current user exists
    if (currUser) {
      // Get band name for the current user
      bandName = currUser.member_bands.filter(
        (band) => band.id === song.band_id
      )[0].name;
    }
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
            <Header as="h3">Band:</Header>
            <p>{bandName}</p>
            <Header as="h3">Members:</Header>
            <List>{members.length === 0 ? "No Members" : members}</List>
          </Accordion.Content>
        </Accordion>
      </Card>
    </ListItem>
  );
}

export default SongListItem;
