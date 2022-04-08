import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectChatInput,
  selectChatTaskId,
  selectInputType,
  setChatInputInit,
  setChatInputLocation,
  setChatInputText,
  setInputType,
  setPointingLocation,
  setPointingLocationNULL,
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
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useCommentHooks from "../../hooks/useCommentHooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";

const CommentCard = () => {
  const commentTaskId = useAppSelector(selectChatTaskId);
  const [comments, setComments] = useState<Comment[]>([]);
  const dispatch = useAppDispatch();

  const InputType = useAppSelector(selectInputType);
  const ChatInput = useAppSelector(selectChatInput);
  const basicInfo = useAppSelector(selectBasicInfo);

  const { uploadComment } = useCommentHooks();

  useEffect(() => {
    if (!db || commentTaskId === "") {
      return;
    }
    const commentCollect = query(
      collection(doc(collection(db, "tasks"), commentTaskId), "comments"),
      orderBy("timeStamp", "desc")
    );

    const unSub = onSnapshot(commentCollect, (commentSnaps) => {
      if (commentSnaps.empty) setComments([]);
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

  const handleComment = () => {
    if (ChatInput.commentText.length === 0) {
      return;
    }

    ChatInput.pointerLocation
      ? uploadComment(
          {
            text: ChatInput.commentText,
            sendBy: basicInfo.userId,
            location: ChatInput.pointerLocation,
          },
          commentTaskId
        )
      : uploadComment(
          { text: ChatInput.commentText, sendBy: basicInfo.userId },
          commentTaskId
        );

    dispatch(setChatInputInit());
  };

  console.log("[Comment]" + commentTaskId, comments);

  return (
    <Card sx={{ minWidth: 275 }} style={{ margin: "0 auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          チャットスペース
        </Typography>
        {/* <CardActions> */}
        <div
          style={{ marginLeft: "10px", position: "relative", display: "flex" }}
        >
          <Button
            size="small"
            onClick={() => dispatch(setInputType("CHATINPUT"))}
          >
            {!(InputType === "CHATINPUT") ? "場所を伝える" : "戻る"}
          </Button>
          {/* </CardActions>
          <CardActions> */}
          <Button
            size="small"
            onClick={() => {
              dispatch(setInputType("ORIGINAL"));
              dispatch(setChatInputInit());
              dispatch(setPointingLocationNULL());
            }}
            color="secondary"
          >
            場所をクリア
          </Button>
          {/* </CardActions> */}
        </div>
        <Typography>
          <div
            style={{ margin: "30px", position: "relative", display: "flex" }}
          >
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
              style={{ width: "80%" }}
              value={ChatInput.commentText}
              onChange={(e) => dispatch(setChatInputText(e.target.value))}
            />
            <Button
              size="small"
              variant="outlined"
              fullWidth={false}
              color="inherit"
              disabled={ChatInput.commentText.length === 0}
              onClick={() => {
                handleComment();
              }}
            >
              <SendIcon />
            </Button>
          </div>
        </Typography>
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
