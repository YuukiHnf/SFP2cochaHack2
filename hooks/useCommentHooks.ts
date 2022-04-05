import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { Dispatch, SetStateAction } from "react";
import { Comment, db } from "../utils/firebase/FirebaseStore";

const useCommentHooks = () => {
  const getCommentsById = () => {};

  return { getCommentsById };
};

export default useCommentHooks;
