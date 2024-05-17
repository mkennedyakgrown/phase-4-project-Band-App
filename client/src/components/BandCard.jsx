import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Button,
} from "semantic-ui-react";
import { NavLink, useOutletContext } from "react-router-dom";

function BandCard({ band }) {
  const { setCurrBand, user } = useOutletContext();
  const bandMembers = band.members
    .map((member) => `${member.first_name} ${member.last_name}`)
    .join(", ");
  return (
    <Card key={band.id}>
      <CardContent>
        <CardHeader>{band.name}</CardHeader>
        <CardDescription>
          Genre: {band.genre.name}
          <br />
          Managed By: {band.owner.first_name} {band.owner.last_name}
          <br />
          Members: {bandMembers}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        {user.id === band.owner.id ? (
          <NavLink to={`/bands/${band.id}`}>
            <Button basic color="green">
              Manage
            </Button>
          </NavLink>
        ) : (
          <NavLink to={`/bands/${band.id}`}>
            <Button basic color="blue">
              View
            </Button>
          </NavLink>
        )}
      </CardContent>
    </Card>
  );
}

export default BandCard;
