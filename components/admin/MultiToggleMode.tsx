import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Dispatch, memo, SetStateAction, useState, VFC } from "react";

import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddTaskIcon from "@mui/icons-material/AddTask";

type Props = {
  formats: string[];
  setFormats: Dispatch<SetStateAction<string[]>>;
};

const MultiToggleMode: VFC<Props> = ({ formats, setFormats }) => {
  //const [formats, setFormats] = useState(() => ["bold", "italic"]);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      color="primary"
      style={{ float: "right" }}
      orientation="vertical"
    >
      <ToggleButton value="MemberPosition" aria-label="MemberPosition">
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value="TaskState" aria-label="TaskState">
        <FormatListBulletedIcon />
      </ToggleButton>
      <ToggleButton value="AddTask" aria-label="AddTask">
        <AddTaskIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(MultiToggleMode);
