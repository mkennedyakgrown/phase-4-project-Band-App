import { Divider, Header } from "semantic-ui-react";
import CreateGenreForm from "../components/CreateGenreForm";
import CreateInstrumentForm from "../components/CreateInstrumentForm";
import { Navigate, useOutletContext } from "react-router-dom";

function ConfigPage() {
  const { user } = useOutletContext();
  return (
    <>
      {/* Redirect to login if user is not logged in */}
      {user.id ? null : <Navigate to="/login" />}
      <Header as="h1">Config Page</Header>
      <Divider />
      <CreateGenreForm />
      <Divider />
      <CreateInstrumentForm />
    </>
  );
}

export default ConfigPage;
