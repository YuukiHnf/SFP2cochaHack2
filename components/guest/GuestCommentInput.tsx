import { TextField } from "@mui/material";
import { useState, VFC } from "react";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  taskId: string;
};

const GuestCommentInput: VFC<Props> = ({ taskId }) => {
  const [inputComment, setInputComment] = useState<string>("");

  return (
    <div style={{ margin: "30px", position: "relative", display: "flex" }}>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        style={{ width: "80%" }}
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
      />
      <SendIcon style={{ width: "10%", flex: "right" }} />
    </div>
  );
};

export default GuestCommentInput;
