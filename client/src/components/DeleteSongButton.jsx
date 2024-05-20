import { useFormik } from "formik";
import { Button } from "semantic-ui-react";

function DeleteSongButton({ song, band, setBand }) {
  const formik = useFormik({
    initialValues: {
      song_id: song.id,
    },
    onSubmit: (values) => {
      console.log("Deleting", values);
      fetch(`/api/songs/${song.id}`, {
        method: "DELETE",
      }).then((data) => {
        setBand({
          ...band,
          songs: band.songs.filter((s) => s.id !== song.id),
        });
      });
    },
  });
  return (
    <Button type="submit" onClick={formik.handleSubmit}>
      Delete Song
    </Button>
  );
}

export default DeleteSongButton;
