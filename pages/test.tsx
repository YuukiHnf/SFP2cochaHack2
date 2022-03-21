import { collectionGroup, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../utils/firebase/FirebaseStore";

const test = () => {
  useEffect(() => {
    (async () => {
      const teamQuery = query(collectionGroup(db, "team"));
      const querySnapshot = await getDocs(teamQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    })();
  }, []);

  return <div>test</div>;
};

export default test;
