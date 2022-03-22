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
import { useState } from "react";
import { MobileTimePicker } from "@mui/lab";
import { useAppSelector } from "../../app/hooks";
import { selectAdminTimeSche } from "../../features/adminSlice";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  onClose: (newTime: Date | null, title: string) => void;
}

export const TimeDialog = (props: SimpleDialogProps) => {
  const { onClose, open } = props;
  const [inputTitle, setInputTitle] = useState("");
  const timeSche = useAppSelector(selectAdminTimeSche);
  const [inputTime, setInputTime] = useState<Date | null>(
    new Date(timeSche.start?.toDate() ?? "December 17, 1995 03:24:00")
  );

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason && reason == "backdropClick") onClose(inputTime, inputTitle);
    onClose(inputTime, inputTitle);
  };

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
        <DialogTitle>{"Time"}</DialogTitle>
        <ListItem>
          <MobileTimePicker
            onChange={(e) => {
              setInputTime(e);
            }}
            minTime={timeSche.start?.toDate()}
            maxTime={timeSche.end?.toDate()}
            value={inputTime}
            renderInput={(p) => (
              <TextField variant="filled" {...p} color="info" />
            )}
          />
        </ListItem>
        <ListItem alignItems="center">
          <Button variant="contained">{" SAVE "}</Button>
        </ListItem>
        <ListItem alignItems="center">
          <Button variant="outlined" color="error">
            DELETE
          </Button>
        </ListItem>
      </List>
    </Dialog>
  );
};
