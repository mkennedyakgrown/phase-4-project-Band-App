import { Button } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function RemoveMemeberButton({ member, band, setBand }) {
  const { user, setUser } = useOutletContext();
  function handleClick() {
    const body = { band_id: band.id, user_id: member.id };
    fetch(`/api/bands/${band.id}/members/${member.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser({
          ...user,
          member_bands: user.member_bands.map((band) =>
            band.id !== data.id ? band : data
          ),
        });
        setBand({
          ...band,
          members: band.members.filter((m) => m.id !== member.id),
        });
      });
  }
  return <Button onClick={handleClick}>Remove Band Member</Button>;
}

export default RemoveMemeberButton;
