import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState, VFC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import SignInForm from "../components/SignInForm";
import SignInForm2 from "../components/SignInForm2";

const login: VFC = () => {
  const [loginAdmin, setLoginAdmin] = useState<boolean>(true);
  const [signUp, setSignUp] = useState<boolean>(true);
  //console.log(loginAdmin ? "Admin" : "Guest");

  return (
    <>
      <div style={{ alignContent: "center" }}>
        <FormControlLabel
          control={
            <Switch
              checked={loginAdmin}
              onChange={(e) => setLoginAdmin(e.target.checked)}
              name="checkedB"
              color="primary"
            />
          }
          label={loginAdmin ? "Admin" : "Guest"}
        />
        <br />
        <FormControlLabel
          control={
            <Switch
              checked={signUp}
              onChange={(e) => {
                setSignUp(e.target.checked);
              }}
              name="SignUp"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          }
          label={signUp ? "SignUp" : "Login"}
        />
        <br />
        <TextField
          id="standard-basic"
          label="teamName"
          value={"hokudaiFesta"}
        />
        <br />
      </div>
      {loginAdmin ? (
        <SignInForm2 LoginType="admin" isSignUp={signUp} />
      ) : (
        <SignInForm2 LoginType="guest" isSignUp={signUp} />
      )}
    </>
  );
};

export default login;
