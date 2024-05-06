import { Header } from "semantic-ui-react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const { bands, users } = useOutletContext();
  const displayBands = bands.map((band) => {
    return <li key={band}>{band}</li>;
  });
  const displayUsers = users.map((user) => {
    return <li key={user}>{user}</li>;
  });

  return (
    <>
      <main>
        <br />
        <Header as="h1">Home</Header>
        <ul>{displayBands}</ul>
        <ul>{displayUsers}</ul>
      </main>
    </>
  );
}

export default Home;
