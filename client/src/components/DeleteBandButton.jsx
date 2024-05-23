import { Form, Button, FormField, Confirm } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function DeleteBandButton({ band, user }) {
  const { setUser } = useOutletContext();
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
        // Update user state
        r.json().then((data) =>
          setUser({
            ...user,
            member_bands: [
              ...user.member_bands.filter((b) => b.id !== band.id),
            ],
          })
        );
        // Redirect to my-bands page
        navigate(`/my-bands`);
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
