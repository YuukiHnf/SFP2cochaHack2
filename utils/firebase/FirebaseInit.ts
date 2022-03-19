// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const isEmulating = true; //window.location.hostname === "localhost";
export const storePort = 8080;
export const storagePort = 9199;
export const authPort = 9099;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
  authDomain: isEmulating ? "localhost" : process.env.NEXT_PUBLIC_FB_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECTID,
  storageBucket: isEmulating ? "" : process.env.NEXT_PUBLIC_FB_STORAGEBUCKET,
  messagingSenderId: isEmulating
    ? ""
    : process.env.NEXT_PUBLIC_FB_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FB_APPID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getApp = () => app;
