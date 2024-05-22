import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import BandMemberCard from "./BandMemberCard";

function BandMembersList({ band, setBand }) {
  // Initialize an empty array to store member cards
  let membersList = [];
  const membersLength = band.members ? band.members.length : 0;

  // Check if band name is defined
  if (band.name !== undefined) {
    // Map each band member to a BandMemberCard component
    const membersCards = band.members.map((member) => {
      return (
        <GridColumn key={`gridColumn${member.id}`}>
          <BandMemberCard
            key={member.id}
            member={member}
            band={band}
            setBand={setBand}
          />
        </GridColumn>
      );
    });

    // Divide the member cards into rows of 3
    while (membersCards.length > 0) {
      membersList.push(
        <GridRow key={`gridRow${membersList.length}`}>
          {membersCards.splice(0, 3)}
        </GridRow>
      );
    }
  }
  // Render the grid based on the number of members
  return (
    <>
      {membersLength >= 3 ? (
        <Grid columns={3} divided="vertically">
          {membersList}
        </Grid>
      ) : (
        <Grid columns={1}>{membersList}</Grid>
      )}
    </>
  );
}

export default BandMembersList;
