import { getApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const storage = getStorage(getApp());

export const defaultImageStorage = ref(storage, "default");
