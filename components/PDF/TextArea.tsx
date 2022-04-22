import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, VFC } from "react";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DoneIcon from "@mui/icons-material/Done";
import BackspaceIcon from "@mui/icons-material/Backspace";

const CardStyle: React.CSSProperties = {
  margin: "10, 0, 10, 0",
};

// const TextArea = () => {
//   return (
//     <Card style={CardStyle}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           概要
//         </Typography>
//         <Typography variant="body2">
//           各バンドが体育館横特設ステージで曲を演奏し、観客を盛り上げる。
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

const SubTitleStyle: React.CSSProperties = {
  color: "#222222",
};

type Props = {
  title: string;
  description: string;
};

const TextArea: VFC<Props> = ({ title, description }) => {
  const [ptrTitle, setPtrTitle] = useState<string>(title ?? "");
  const [ptrDescription, setPtrDescription] = useState<string>(
    description ?? ""
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    setPtrTitle(title);
    setPtrDescription(description);
  }, [title, description]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <h3 style={SubTitleStyle}>{ptrTitle}</h3>
        <span style={{ alignSelf: "center" }}>
          <IconButton
            aria-label="edit"
            color="success"
            onClick={() => setIsEdit(true)}
            disabled={isEdit}
          >
            <EditIcon />
          </IconButton>
          {isEdit && (
            <IconButton
              aria-label="save"
              color="info"
              onClick={() => setIsEdit(false)}
            >
              <SaveIcon />
            </IconButton>
          )}
          {isEdit && (
            <IconButton
              aria-label="Done"
              color="default"
              onClick={() => setIsEdit(false)}
            >
              <BackspaceIcon />
            </IconButton>
          )}
        </span>
      </div>
      {isEdit ? (
        <TextareaAutosize
          aria-label="input text"
          placeholder="empty textarea"
          style={{ width: "90%", margin: "0 auto" }}
          value={ptrDescription}
          onChange={(e) => setPtrDescription(e.target.value)}
        />
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>{ptrDescription}</p>
      )}
    </>
  );
};

export default TextArea;
