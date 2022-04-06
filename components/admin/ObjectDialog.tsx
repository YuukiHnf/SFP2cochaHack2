import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  Input,
  List,
  ListItem,
  ListItemButton,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MobileTimePicker } from "@mui/lab";
import { useAppSelector } from "../../app/hooks";
import { selectAdminTimeSche } from "../../features/adminSlice";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newTime: Date | null, title: string) => void;
  onDelete?: () => void;
}

export const ObjectDialog = (props: SimpleDialogProps) => {
  const { onClose, open, onSave, onDelete } = props;
  const [inputTitle, setInputTitle] = useState("");
  const timeSche = useAppSelector(selectAdminTimeSche);
  const [inputTime, setInputTime] = useState<Date | null>(
    new Date(timeSche.start?.toDate() ?? "December 17, 1995 03:24:00")
  );

  useEffect(() => {
    timeSche.start && setInputTime(timeSche.start.toDate());
  }, [timeSche]);

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
        <ListItem alignItems="center">
          <Button
            variant="contained"
            onClick={() => {
              onSave(inputTime, inputTitle);
              onClose();
            }}
          >
            {" SAVE "}
          </Button>
        </ListItem>
        <ListItem alignItems="center">
          <Button variant="outlined" color="error" onClick={() => onClose()}>
            CANCEL
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};
