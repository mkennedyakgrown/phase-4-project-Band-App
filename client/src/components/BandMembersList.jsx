import {
  Header,
  Divider,
  Segment,
  Grid,
  GridRow,
  GridColumn,
} from "semantic-ui-react";
import BandMemberCard from "./BandMemberCard";

function BandMembersList({ band, setBand }) {
  let membersList = [];
  if (band.name !== undefined) {
    const membersCards = band.members.map((member) => {
      return (
        <GridColumn>
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
      membersList.push(<GridRow>{membersCards.splice(0, 3)}</GridRow>);
    }
  }

  return (
    <Grid columns={3} divided="vertically">
      {membersList}
    </Grid>
  );
}

export default BandMembersList;
