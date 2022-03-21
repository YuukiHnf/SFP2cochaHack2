import { StringLike } from "@firebase/util";
import { getApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  Timestamp,
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

// Userテーブル
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

// teamテーブル
export type TEAM = {
  name: string;
  timeSche: DateSchedule;
  place: PLACE;
  taskBlock: TaskBlock;
};

export type Location = {
  lat: number;
  lng: number;
};

export type DateSchedule = {
  start: Timestamp | null;
  end: Timestamp | null;
};

export type PLACE = {
  center: { lat: number; lng: number };
  zoom: number;
  tilt?: number;
  heading?: number; // 設定できるようになったら入れる
};

export type OBJECTPARAM = {
  id: string;
  name: string;
  num: number;
  iconUrl: string;
  weight?: number;
  team: string;
};

export type TaskBlock = {};
