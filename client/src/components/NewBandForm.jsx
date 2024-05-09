import { useState } from "react";
import {
  FormField,
  Button,
  Checkbox,
  Form,
  Dropdown,
  Label,
} from "semantic-ui-react";

function NewBandForm({ genres, sessionUser }) {
  const [bandOptions, setBandOptions] = useState({});

  let genreOptions = [];
  if (genres[0] != undefined) {
    genreOptions = genres.map((genre) => {
      return {
        key: genre.id,
        text: genre.name,
        value: genre.name,
      };
    });
  }
  console.log(bandOptions);
  return (
    <Form>
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
      <FormField>
        <Label basic pointing="below">
          Add Members (optional)
        </Label>
      </FormField>
      <FormField>
        <Label basic pointing="below">
          Add Songs (optional)
        </Label>
      </FormField>
    </Form>
  );
}

export default NewBandForm;
