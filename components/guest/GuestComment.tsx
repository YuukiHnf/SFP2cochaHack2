import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
  VFC,
} from "react";
import { Comment, db } from "../../utils/firebase/FirebaseStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { GuestInputType } from "./GuestHome";
import { TextField } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

type Props = {
  taskId: string;
};

const GuestComment: VFC<Props> = memo(({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    const commentCollect = query(
      collection(doc(collection(db, "tasks"), taskId), "comments"),
      orderBy("timeStamp", "desc")
    );

    const unSub = onSnapshot(commentCollect, (commentSnaps) => {
      if (commentSnaps.empty) return;
      setComments(
        commentSnaps.docs.map(
          (snap) => ({ ...snap.data(), id: snap.id } as Comment)
        )
      );
    });

    return () => unSub();
  }, []);

  console.log(comments);

  return (
    <div>
      {comments ? (
        comments.map((com) => (
          <div
            key={com.id}
            style={{
              display: "flex",
              alignItems: "center",
              wordBreak: "break-all",
              margin: "12px",
            }}
          >
            <AccountCircleIcon />
            {/* <span>{`@${com.id}`}</span> */}
            <span>{`${com.text}`}</span>
            {com.timeStamp && (
              <span style={{ fontSize: "14px", color: "gray" }}>
                {`  ${com.timeStamp.toDate().toLocaleString()} ` ?? ""}
              </span>
            )}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
});

export default GuestComment;
