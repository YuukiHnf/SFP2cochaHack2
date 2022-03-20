import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import React, { useState, VFC } from "react";
import useAuthState from "../hooks/useAuthState";

interface Props {
  LoginType: "admin" | "guest";
  isSignUp: boolean;
}

const SignInForm2: VFC<Props> = ({ LoginType, isSignUp }) => {
  //const [signUp, setSignUp] = useState<boolean>(true);
  const { signInEmail, signUpEmail, signInGoogle } = useAuthState({
    LoginType,
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const teamId = "hokudaiFesta";
  return (
    <>
      <form noValidate autoComplete="off">
        <br />
        <TextField
          id="standard-basic"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <br />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={
            isSignUp
              ? () => signUpEmail(email, password, teamId)
              : () => signInEmail(email, password, teamId)
          }
        >
          {isSignUp ? "SignUp" : "Login"}
        </Button>
        <Button onClick={() => signInGoogle()}>GOOGLE</Button>
      </form>{" "}
    </>
  );
};

export default SignInForm2;
