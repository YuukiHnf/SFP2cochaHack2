import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useState, VFC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import SignInForm from "../components/SignInForm";

const login: VFC = () => {
  const [loginAdmin, setLoginAdmin] = useState<boolean>(true);
  //console.log(loginAdmin ? "Admin" : "Guest");

  return (
    <>
      {loginAdmin ? (
        <>
          <SignInForm LoginType="Admin" />
        </>
      ) : (
        <SignInForm LoginType="Guest" />
      )}

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
        <TextField
          id="standard-basic"
          label="teamName"
          value={"hokudaiFesta"}
        />
        <br />
      </div>

      {/* <FormControlLabel
        control={
          <Switch
            checked={loginAdmin}
            onChange={(e) => {
              setLoginAmdin(e.target.checked);
            }}
            name="Admin"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label={loginAdmin ? "Admin" : "Guest"}
      />

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

      <form noValidate autoComplete="off">
        <TextField id="standard-basic" label="teamName" />
        <br />
        <TextField id="standard-basic" label="email" />
        <br />
        <TextField
          id="standard-basic"
          label="password"
          type="password"
          autoComplete="current-password"
        />
        <br />
        <Button variant="contained" color="primary">
          {signUp ? "SignUp" : "Login"}
        </Button>
      </form> */}
    </>
  );
};

export default login;
