import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Accordion,
  AccordionTitle,
  AccordionContent,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function EditUserName({ user, setUser }) {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState(user.username);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setIsActive(false);
        navigate(`/users/${username}`);
      }
    });
  }

  return (
    <Accordion>
      <AccordionTitle active={isActive}>
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Edit Name"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <Button type="submit">Submit</Button>
          </FormField>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditUserName;
