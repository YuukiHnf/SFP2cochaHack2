import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectChatTaskId,
  setChatInputLocation,
  setPointingLocation,
} from "../../features/uiHelperSlice";
import { memo, useEffect, useState } from "react";
import { Comment, db } from "../../utils/firebase/FirebaseStore";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddLocationIcon from "@mui/icons-material/AddLocation";

const CommentCard = () => {
  const commentTaskId = useAppSelector(selectChatTaskId);
  const [comments, setComments] = useState<Comment[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!db || commentTaskId === "") {
      return;
    }
    const commentCollect = query(
      collection(doc(collection(db, "tasks"), commentTaskId), "comments"),
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
  }, [commentTaskId]);

  if (commentTaskId === "" || !commentTaskId) {
    return <></>;
  }

  return (
    <Card sx={{ minWidth: 275 }} style={{ margin: "0 auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          チャットスペース
        </Typography>
        <CardActions>
          <Button size="small">場所を追加</Button>
        </CardActions>
        <CardActions>
          <Button size="small">場所をクリア</Button>
        </CardActions>
        <Typography variant="body2">
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
                          dispatch(
                            setPointingLocation({
                              location: com.location ?? { lat: 0, lng: 0 },
                              text: com.text,
                            })
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
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(CommentCard);
