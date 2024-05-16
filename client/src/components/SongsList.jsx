import { useState } from "react";
import { List } from "semantic-ui-react";
import SongListItem from "./SongListItem";

function SongsList({ songs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  let displaySongs = [];
  if (songs) {
    displaySongs = songs.map((song) => (
      <SongListItem
        key={song.id}
        song={song}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    ));
  }
  return <List>{displaySongs.length === 0 ? "No Songs" : displaySongs}</List>;
}

export default SongsList;
