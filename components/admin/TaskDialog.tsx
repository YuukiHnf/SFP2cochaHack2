import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Input, List, ListItem } from "@mui/material";
import { useCallback, useState } from "react";
export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  onDelete?: () => void;
  onExplaing: (title: string) => void;
}

export const TaskDialog = (props: SimpleDialogProps) => {
  const { onClose, open, onSave, onDelete, onExplaing } = props;
  const [inputTitle, setInputTitle] = useState("");

  const handleClose = useCallback(
    (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
      setInputTitle("");
      if (reason && reason == "backdropClick") onClose();
      onClose();
    },
    []
  );

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{"Title"}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Input
            value={inputTitle}
            type="text"
            autoFocus
            margin={"none"}
            fullWidth={false}
            onChange={(e) => setInputTitle(e.target.value)}
          />
        </ListItem>
        <DialogTitle>{"NEXT"}</DialogTitle>
        <ListItem alignItems="center">
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              onExplaing(inputTitle);
              onClose();
            }}
          >
            {"Explaing"}
          </Button>
        </ListItem>
        <ListItem alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              onSave(inputTitle);
              onClose();
            }}
          >
            {" SAVE "}
          </Button>
        </ListItem>
        <ListItem alignItems="center">
          <Button variant="outlined" color="error" onClick={() => onClose()}>
            DELETE
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};
