import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Button,
} from "semantic-ui-react";

function BandCard({ band, sessionUser }) {
  const bandMembers = band.members.map((member) => member.username).join(", ");
  return (
    <Card key={band.id}>
      <CardContent>
        <CardHeader>{band.name}</CardHeader>
        <CardDescription>
          Managed By: {band.owner.username}
          <br />
          Members: {bandMembers}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        {sessionUser.id === band.owner.id && (
          <Button basic color="green" href={`/manage-bands/${band.id}`}>
            Manage
          </Button>
        )}
        <Button basic color="blue" href={`/bands/${band.id}`}>
          View
        </Button>
      </CardContent>
    </Card>
  );
}

export default BandCard;
