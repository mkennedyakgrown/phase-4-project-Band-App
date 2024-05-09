import { Button } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function RemoveMemeberButton({ user, band }) {
  const { userBands, setUserBands } = useOutletContext();
  function handleClick() {
    const body = { band_id: band.id, user_id: user.id };
    fetch(`/api/bands/${band.id}/members/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((data) =>
        setUserBands([
          ...userBands.splice(
            userBands.find((element) => element.id == band.id),
            1
          ),
          data,
        ])
      );
  }
  return <Button onClick={handleClick}>Remove Band Member</Button>;
}

export default RemoveMemeberButton;
