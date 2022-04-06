import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React, { Dispatch, SetStateAction } from "react";
import { Comment, db } from "../utils/firebase/FirebaseStore";

const useCommentHooks = () => {
  const getCommentsById = () => {};

  const uploadComment = async (
    newComment: Omit<Comment, "id" | "timeStamp">,
    taskId: string
  ) => {
    const commentCollect = collection(
      doc(collection(db, "tasks"), taskId),
      "comments"
    );

    const newCommentRef = await addDoc(commentCollect, {
      ...newComment,
      timeStamp: serverTimestamp(),
    });
  };

  return { getCommentsById, uploadComment };
};

export default useCommentHooks;
