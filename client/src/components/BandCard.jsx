import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "semantic-ui-react";

function BandCard({ band }) {
  const bandMembers = band.members.map((member) => member.username).join(", ");
  return (
    <Card key={band.id} href={`/bands/${band.id}`}>
      <CardContent>
        <CardHeader>{band.name}</CardHeader>
        <CardDescription>
          Managed By: {band.owner.username}
          <br />
          Members: {bandMembers}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default BandCard;
