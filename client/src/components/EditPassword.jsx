import { useState } from "react";
import {
  Button,
  Form,
  FormField,
  Input,
  Accordion,
  AccordionTitle,
  AccordionContent,
  Label,
} from "semantic-ui-react";

function EditPassword({ user, setUser }) {
  const [isActive, setIsActive] = useState(false);
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_password: newPassword,
        previous_password: previousPassword,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setPreviousPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsActive(false);
        alert("Password changed");
      } else if (r.status === 401) {
        alert("Incorrect password");
      }
    });
  }

  return (
    <Accordion>
      <AccordionTitle active={isActive}>
        <Button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Cancel" : "Change Password"}
        </Button>
      </AccordionTitle>
      <AccordionContent active={isActive}>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label>Previous Password</Label>
            <Input
              id="previous-password"
              type="password"
              value={previousPassword}
              onChange={(e) => setPreviousPassword(e.target.value)}
              autoComplete="password"
            />
          </FormField>
          <FormField>
            <Label>New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="password"
            />
          </FormField>
          <FormField>
            <Label>Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="password"
            />
          </FormField>
          <Button type="submit">Submit</Button>
        </Form>
      </AccordionContent>
    </Accordion>
  );
}

export default EditPassword;
