import { List } from "semantic-ui-react";
import BandSongListItem from "./BandSongListItem";

function BandSongsList({ band, setBand }) {
  const displaySongs = band.songs
    ? band.songs.map((song) => (
        <BandSongListItem
          key={song.id}
          song={song}
          band={band}
          setBand={setBand}
        />
      ))
    : [];
  return <List>{displaySongs.length === 0 ? "No Songs" : displaySongs}</List>;
}

export default BandSongsList;
