import { Header } from "semantic-ui-react";
import NavBar from "../components/NavBar";

function ErrorPage() {
  return (
    <>
      <NavBar user={{}} setUser={() => {}} />
      <Header as="h1" textAlign="center">
        Oops! Something went wrong...
      </Header>
    </>
  );
}

export default ErrorPage;
