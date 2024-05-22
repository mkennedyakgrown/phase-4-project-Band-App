import { Grid, GridRow, GridColumn } from "semantic-ui-react";
import BandMemberCard from "./BandMemberCard";

function BandMembersList({ band, setBand }) {
  let membersList = [];
  if (band.name !== undefined) {
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
    while (membersCards.length > 0) {
      membersList.push(
        <GridRow key={`gridRow${membersList.length}`}>
          {membersCards.splice(0, 3)}
        </GridRow>
      );
    }
  }

  return (
    <>
      {membersList.length >= 3 ? (
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
