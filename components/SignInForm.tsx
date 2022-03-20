import { VFC } from "react";

import { auth as authUI } from "firebaseui";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase/FirebaseAuth";

const uiConfigAdmin: authUI.Config = {
  signInFlow: "popup",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    // FacebookAuthProvider.PROVIDER_ID,
    //GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/admin",
};

const uiConfigGuest: authUI.Config = {
  signInFlow: "popup",
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    // FacebookAuthProvider.PROVIDER_ID,
    // GoogleAuthProvider.PROVIDER_ID,
    // TwitterAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: "/guest",
};

interface Props {
  LoginType: "Admin" | "Guest";
}

const SignInForm: VFC<Props> = ({ LoginType }) => {
  console.log(LoginType === "Admin" ? uiConfigAdmin : uiConfigGuest);
  return (
    <StyledFirebaseAuth
      firebaseAuth={auth}
      uiConfig={LoginType === "Admin" ? uiConfigAdmin : uiConfigGuest}
    ></StyledFirebaseAuth>
  );
};

export default SignInForm;
