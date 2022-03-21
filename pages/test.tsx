import { collectionGroup, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../utils/firebase/FirebaseStore";

const test = () => {
  useEffect(() => {
    const teamQuery = query(collectionGroup(db, "team"));
    //const querySnapshot =
  }, []);

  return <div>test</div>;
};

export default test;
