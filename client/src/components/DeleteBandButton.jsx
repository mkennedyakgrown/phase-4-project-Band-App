import { Form, Button, FormField, Confirm } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DeleteBandButton({ band, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function handleDelete() {
    fetch(`/api/bands/${band.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => {
      if (r.ok) {
        navigate(`/`);
      }
    });
  }

  return (
    <Form>
      <FormField>
        <Button color="red" onClick={() => setIsOpen(true)}>
          Delete Band
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

export default DeleteBandButton;
