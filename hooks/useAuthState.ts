import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, logout, selectBasicInfo } from "../features/basicInfoSlice";
import { auth } from "../utils/firebase/FirebaseAuth";

/**
 * useAuthState フックの戻り値の型。
 */
export type AuthState = {
  isSignedIn: boolean;
  isLoading: boolean;
  userId: string | undefined;
  userName: string | undefined;
  avatarUrl: string | undefined;
};

/**
 * useAuthState が返す初期値。
 * Next.js のサーバーサイドレンダリング時もこの値になる。
 */
const INITIAL_AUTH_STATE: AuthState = {
  isSignedIn: false,
  isLoading: true,
  userId: undefined,
  userName: undefined,
  avatarUrl: undefined,
};

interface Props {
  LoginType: "Admin" | "Guest";
}

const useAuthState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ userId: user.uid, teamId: "hokudaiSai" }));
        //console.log(user.uid);
      }
    });
    return () => unSub();
  }, [dispatch]);

  return {};
};

export default useAuthState;
