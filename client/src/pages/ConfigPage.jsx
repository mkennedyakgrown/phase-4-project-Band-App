import { Divider, Header } from "semantic-ui-react";
import CreateGenreForm from "../components/CreateGenreForm";
import CreateInstrumentForm from "../components/CreateInstrumentForm";

function ConfigPage() {
  return (
    <>
      <Header as="h1">Config Page</Header>
      <Divider />
      <CreateGenreForm />
      <Divider />
      <CreateInstrumentForm />
    </>
  );
}

export default ConfigPage;
