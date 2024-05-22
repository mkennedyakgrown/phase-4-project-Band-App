import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Button,
} from "semantic-ui-react";
import { NavLink, useOutletContext } from "react-router-dom";

function BandCard({ band }) {
  const { user } = useOutletContext();

  // Generate a list of band member names
  const bandMembers = band.members
    .map((member) => `${member.first_name} ${member.last_name}`)
    .join(", ");

  return (
    <Card key={band.id}>
      <CardContent>
        {/* Band name */}
        <CardHeader>{band.name}</CardHeader>
        {/* Band genre and manager */}
        <CardDescription>
          Genre: {band.genre.name}
          <br />
          Managed By: {band.owner.first_name} {band.owner.last_name}
          <br />
          Members: {bandMembers}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        {/* Conditional rendering of management buttons based on user */}
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
