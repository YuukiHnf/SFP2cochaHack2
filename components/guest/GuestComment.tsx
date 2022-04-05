import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { Comment, db } from "../../utils/firebase/FirebaseStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GuestCommentInput from "./GuestCommentInput";

type Props = {
  taskId: string;
};

const GuestComment: VFC<Props> = ({ taskId }) => {
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    const commentCollect = collection(
      doc(collection(db, "tasks"), taskId),
      "comments"
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
            <span
              style={{ fontSize: "14px", color: "gray" }}
            >{`  ${com.timeStamp.toDate().toLocaleString()}`}</span>
          </div>
        ))
      ) : (
        <></>
      )}
      <GuestCommentInput taskId={taskId} />
    </div>
  );
};

export default GuestComment;
