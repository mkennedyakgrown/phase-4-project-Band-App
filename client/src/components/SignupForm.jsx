import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Button,
  Input,
  FormField,
  Form,
  Label,
  Header,
} from "semantic-ui-react";

function SignupForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const { setUser } = useOutletContext();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        email,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
        setUsername("");
        setPassword("");
        setPasswordConfirmation("");
        setEmail("");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h1">Signup</Header>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password_confirmation">Password Confirmation</Label>
        <Input
          id="password_confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </FormField>
      {errors.map((err) => (
        <li key={err}>{err}</li>
      ))}
    </Form>
  );
}

export default SignupForm;
