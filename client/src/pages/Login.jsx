import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Header, Button, Divider } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const { setUser } = useOutletContext();

  return (
    <>
      <main>
        <br />
        {showLogin ? (
          <>
            <Header as="h1">Login</Header>
            <LoginForm onLogin={setUser} />
            <Divider />
            <p>
              Don't have an account ? &nbsp;
              <Button
                color="blue"
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </Button>
            </p>
          </>
        ) : (
          <>
            <SignupForm onLogin={onLogin} />
            <Divider />
            <p>
              Already have an account ? &nbsp;
              <Button
                color="blue"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </Button>
            </p>
          </>
        )}
      </main>
    </>
  );
}

export default Login;
