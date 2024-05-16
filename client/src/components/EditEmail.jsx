import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Accordion,
  AccordionTitle,
  AccordionContent,
} from "semantic-ui-react";

function EditEmail({ user, setUser, currUser }) {
  const [isActive, setIsActive] = useState(false);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedUser) => setUser(updatedUser));
        currUser.email = email;
        setIsActive(false);
      }
    });
  }

  return (
    <Accordion>
      <AccordionTitle active={isActive}>
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Edit Email"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Button type="submit">Submit</Button>
          </FormField>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditEmail;
