import { Form, Button, FormField, Confirm } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DeleteUser({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleDelete(e) {
    e.preventDefault();
    fetch(`/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        setUser({});
        navigate("/login");
      }
    });
  }

  return (
    <Form>
      <FormField>
        <Button color="red" onClick={() => setIsOpen(true)}>
          Delete User
        </Button>
        <Confirm
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          onConfirm={() => {
            setIsOpen(false);
            handleDelete();
          }}
        />
      </FormField>
    </Form>
  );
}

export default DeleteUser;
