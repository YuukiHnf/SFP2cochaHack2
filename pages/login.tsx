import { Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState, VFC } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAppSelector } from "../app/hooks";
import SignInForm from "../components/SignInForm";
import SignInForm2 from "../components/SignInForm2";
import { selectBasicInfo } from "../features/basicInfoSlice";

const login: VFC = () => {
  const [loginAdmin, setLoginAdmin] = useState<boolean>(true);
  const [signUp, setSignUp] = useState<boolean>(false);
  //console.log(loginAdmin ? "Admin" : "Guest");
  const basicInfo = useAppSelector(selectBasicInfo);
  const route = useRouter();

  useEffect(() => {
    if (basicInfo) {
      route.push(loginAdmin ? "/admin/" : "/guest/");
    }
  }, [basicInfo]);

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
