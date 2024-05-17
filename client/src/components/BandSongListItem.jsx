import { Button, Divider, Item, ItemHeader, List } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import DeleteSongButton from "./DeleteSongButton";

function BandSongListItem({ song, band, setBand }) {
  const { user } = useOutletContext();
  const [isActive, setIsActive] = useState(false);

  const membersList = song.members
    ? song.members.map((member) => {
        const instrument = song.songs_users_instruments.filter(
          (inst) => inst.user_id === member.id
        );
        return (
          <List.Item key={member.id}>
            {member.first_name} {member.last_name}:{" "}
            {instrument[0].instrument.name}
          </List.Item>
        );
      })
    : null;

  return (
    <Item fluid="horizontal">
      <ItemHeader as="h3">
        {song.name}{" "}
        {band.owner_id === user.id ? (
          <Button onClick={() => setIsActive(!isActive)}>Edit</Button>
        ) : null}
      </ItemHeader>
      <List>{membersList}</List>
      {isActive ? (
        <DeleteSongButton song={song} band={band} setBand={setBand} />
      ) : null}
      <Divider />
    </Item>
  );
}

export default BandSongListItem;
