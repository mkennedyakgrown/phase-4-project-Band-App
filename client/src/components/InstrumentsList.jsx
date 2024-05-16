import { useState, useEffect } from "react";
import { List, ListItem, Button } from "semantic-ui-react";
import AddInstrumentForm from "./AddInstrumentForm";

function InstrumentsList({ user, setUser, currUser }) {
  const [isActive, setIsActive] = useState(false);
  const [instruments, setInstruments] = useState(currUser.instruments);
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    setInstruments(currUser.instruments);
  }, [currUser]);
  let displayInstruments = [];
  if (instruments) {
    displayInstruments = instruments.map((instrument) => (
      <ListItem key={instrument.id}>
        {instrument.name}
        {isActive ? (
          <Button
            onClick={() =>
              setInstruments(instruments.filter((i) => i.id !== instrument.id))
            }
          >
            Remove
          </Button>
        ) : null}
      </ListItem>
    ));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ instruments: [...instruments, ...selections] }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          currUser = user;
          setInstruments(user.instruments);
        });
        setIsActive(false);
      }
    });
  }

  return (
    <List>
      {currUser.id === user.id ? (
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Edit Instruments"}
        </Button>
      ) : null}
      {displayInstruments}
      {isActive ? (
        <AddInstrumentForm
          user={user}
          selections={selections}
          setSelections={setSelections}
        />
      ) : null}{" "}
      {isActive ? <Button onClick={handleSubmit}>Submit</Button> : null}
    </List>
  );
}

export default InstrumentsList;
