import { useState } from "react";
import {
  FormField,
  Button,
  Checkbox,
  Form,
  Dropdown,
  Label,
} from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function NewBandForm({ genres }) {
  const { userBands, setUserBands } = useOutletContext();
  const [bandOptions, setBandOptions] = useState({});

  let genreOptions = [];
  if (genres[0] != undefined) {
    genreOptions = genres.map((genre) => {
      return {
        key: genre.id,
        text: genre.name,
        value: genre.id,
      };
    });
  }
  console.log(bandOptions);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/bands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bandOptions.name,
        genre_id: bandOptions.genre,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setUserBands(...userBands, data);
        setBandOptions({});
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField
        onChange={(e) =>
          setBandOptions({ ...bandOptions, name: e.target.value })
        }
      >
        <Label basic pointing="below">
          Band Name
        </Label>
        <input placeholder="Band Name" value={bandOptions.name} />
      </FormField>
      <FormField>
        <Label basic pointing="below">
          Genre
        </Label>
        <Dropdown
          placeholder="Select Genre"
          selection
          options={genreOptions}
          value={bandOptions.genre}
          onChange={(e, data) => {
            setBandOptions({ ...bandOptions, genre: data.value });
          }}
        />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default NewBandForm;
