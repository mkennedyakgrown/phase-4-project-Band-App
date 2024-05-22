import { useState } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { Header, Button, Divider } from "semantic-ui-react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function Login() {
  // State for controlling the login form visibility
  const [showLogin, setShowLogin] = useState(true);

  // Get the user data and setUser function from the outlet context
  const { user, setUser } = useOutletContext();

  return (
    <>
      {user.id ? <Navigate to="/" /> : null}
      <main>
        <br />
        {showLogin ? (
          <>
            {/* Display login header */}
            <Header as="h1">Login</Header>
            {/* Render the login form */}
            <LoginForm onLogin={setUser} />
            <Divider />
            <p>
              {/* Prompt to sign up if no account */}
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
            {/* Render the sign-up form */}
            <SignupForm onLogin={setUser} />
            <Divider />
            <p>
              {/* Prompt to login if already have an account */}
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
