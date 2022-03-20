import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, VFC } from "react";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/basicInfoSlice";
import { auth } from "../utils/firebase/FirebaseAuth";

interface Props {
  children: React.ReactNode;
}

const AuthComponent: VFC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ userId: user.uid, teamId: "hokudaiFesta" }));
        //console.log(user);
      }
    });
    return () => unSub();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthComponent;
