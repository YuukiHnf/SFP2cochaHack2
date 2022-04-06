import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { memo, useState } from "react";

import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddTaskIcon from "@mui/icons-material/AddTask";

const MultiToggleMode = () => {
  const [formats, setFormats] = useState(() => ["bold", "italic"]);

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
      <ToggleButton value="bold" aria-label="bold">
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        <FormatListBulletedIcon />
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        <AddTaskIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(MultiToggleMode);
