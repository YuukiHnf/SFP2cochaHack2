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
import { Comment, db, Location } from "../../utils/firebase/FirebaseStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";

type Props = {
  taskId: string;
  setPointingLocation: React.Dispatch<
    React.SetStateAction<{
      location: Location;
      text: string;
    } | null>
  >;
};

const GuestComment: VFC<Props> = memo(({ taskId, setPointingLocation }) => {
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
    <div style={{ marginLeft: "15px" }}>
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
            onClick={
              com.location
                ? () =>
                    setPointingLocation(
                      com.location
                        ? { location: com.location, text: com.text }
                        : null
                    )
                : () => {}
            }
          >
            <AccountCircleIcon />
            {/* <span>{`@${com.id}`}</span> */}
            <span>{`${com.text}`}</span>
            {com.location && (
              <span>
                <AddLocationIcon color="error" />
              </span>
            )}
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
