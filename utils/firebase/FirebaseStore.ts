import { getApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
} from "firebase/firestore";
import { isEmulating, storePort } from "./FirebaseInit";

export const db = getFirestore(getApp());

if (isEmulating) {
  connectFirestoreEmulator(db, "localhost", storePort);
}

export const getUserCollection = collection(db, "users");
export const getObjectCollection = collection(db, "objects");
export const getTeamCollection = collection(db, "team");
export const getPlaceCollection = (teamId: string) =>
  collection(doc(collection(db, "users"), teamId), "place");

export type USER = {
  uid: string;
  username: string;
  avatarUrl?: string;
  timeSche?: DateSchedule[];
  isActive: boolean;
  isGPS: boolean;
  location?: Location;
  teamId: string;
  isAdmin: boolean;
  taskId: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type DateSchedule = {
  start: Date;
  end: Date;
};

export type PLACE = {
  center: { lat: number; lng: number };
  zoom: number;
  tilt?: number;
  heading?: number; // 設定できるようになったら入れる
};
