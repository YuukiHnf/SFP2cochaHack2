import { TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState, VFC } from "react";
import SendIcon from "@mui/icons-material/Send";
import { GuestInputType } from "./GuestHome";

type Props = {
  taskId: string;
  guestInput: GuestInputType;
  setGuestInput: Dispatch<SetStateAction<GuestInputType>>;
};

const GuestCommentInput: VFC<Props> = ({
  taskId,
  guestInput,
  setGuestInput,
}) => {
  //const [inputComment, setInputComment] = useState<string>("");

  return (
    <div style={{ margin: "30px", position: "relative", display: "flex" }}>
      <TextField
        id="standard-basic"
        label="Text"
        variant="standard"
        style={{ width: "80%" }}
        value={guestInput.commentText}
        onChange={(e) =>
          setGuestInput({ ...guestInput, commentText: e.target.value })
        }
      />
      <SendIcon style={{ width: "10%", flex: "right" }} />
    </div>
  );
};

export default GuestCommentInput;
