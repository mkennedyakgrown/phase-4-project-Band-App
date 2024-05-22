import { Button } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function RemoveMemeberButton({ member, band, setBand }) {
  // Get the user and setUser from the outlet context
  const { user, setUser } = useOutletContext();

  // Handle click event when removing a band member
  function handleClick() {
    const body = { band_id: band.id, user_id: member.id };

    // API call to update band member
    fetch(`/api/bands/${band.id}/members/${member.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((r) => r.json())
      .then((data) => {
        // Update the user's member bands
        setUser({
          ...user,
          member_bands: user.member_bands.map((band) =>
            band.id !== data.id ? band : data
          ),
        });

        // Update the band's members list
        setBand({
          ...band,
          members: band.members.filter((m) => m.id !== member.id),
        });
      });
  }

  return <Button onClick={handleClick}>Remove Band Member</Button>;
}

export default RemoveMemeberButton;
