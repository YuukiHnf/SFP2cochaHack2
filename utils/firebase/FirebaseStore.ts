import { StringLike } from "@firebase/util";
import { getApp } from "firebase/app";
import {
  collection,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { MarkerType } from "../../components/googlemap/ArgumentDrawingManage";
import { isEmulating, storePort } from "./FirebaseInit";

export const db = getFirestore(getApp());

if (isEmulating) {
  connectFirestoreEmulator(db, "localhost", storePort);
}

export const getUserCollection = collection(db, "users");
//export const getObjectCollection = collection(db, "objects");
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

export type ObjectTimeLocations = {
  id: string;
  timeStamp: Timestamp;
  location: Location;
};

export type OBJECTPARAM = {
  id: string;
  objectName: string;
  //num: number;
  iconUrl: string;
  weight?: number;
  semiIconUrl: string;
  //initLocation: Location; objectTimeLocationsに統合
  createAt: Timestamp;
  objectTimeLocations?: ObjectTimeLocations[];
};

export type ObjectLocation = {
  objectId: string;
  locationTime: ObjectTimeLocations;
};

export type TaskBlock = {
  id: string;
  title: string;
  time: Timestamp | null;
  taskIds: string[];
  //objectLocations: ObjectLocation[];
  isInit?: boolean;
};

export type TaskProgressState = "UNDO" | "DOING" | "CHECK" | "DONE";

export type TaskContentType = {
  move: {
    location: Location;
    desc: string;
  }[];
  explaing: {
    iconId: MarkerType;
    location: Location;
    desc: string;
  }[];
};

export type TaskType = {
  id: string;
  kindOf: "HUMAN" | "OBJECT";
  title: string;
  taskState: TaskProgressState;
  team: string;
  by: string;
  content: TaskContentType;
};
