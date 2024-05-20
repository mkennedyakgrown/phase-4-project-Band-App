import { Header } from "semantic-ui-react";
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { user } = useOutletContext();
  return (
    <>
      {user.id ? <Navigate to="/my-bands" /> : <Navigate to="/login" />}
      <main>
        <br />
        <Header as="h1">Home</Header>
      </main>
    </>
  );
}

export default Home;
