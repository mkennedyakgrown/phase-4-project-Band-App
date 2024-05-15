import { Header } from "semantic-ui-react";
import { useOutletContext, Navigate } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  return (
    <>
      {user.id ? null : <Navigate to="/login" />}
      <main>
        <br />
        <Header as="h1">Home</Header>
      </main>
    </>
  );
}

export default Home;
