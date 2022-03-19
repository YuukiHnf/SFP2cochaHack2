import { getApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { authPort, isEmulating } from "./FirebaseInit";

export const auth = getAuth(getApp());

if (isEmulating) {
  connectAuthEmulator(auth, `http://localhost:${authPort}`);
}
