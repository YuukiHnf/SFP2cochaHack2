import { getApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { isEmulating, storePort } from "./FirebaseInit";

export const db = getFirestore(getApp());

if (isEmulating) {
  connectFirestoreEmulator(db, "localhost", storePort);
}
