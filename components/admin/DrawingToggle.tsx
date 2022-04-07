import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

//icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";
import { marker2Url, MarkerType } from "../googlemap/ArgumentDrawingManage";
import Image from "next/image";

/**
 * Edit用のUI操作設定
 * @returns
 */

type Props = {
  setIconMode: (_marker: MarkerType) => void;
  googleDrawingMode?: google.maps.drawing.OverlayType.MARKER | null;
};

const DrawingToggle: React.VFC<Props> = ({
  googleDrawingMode,
  setIconMode,
}) => {
  //const UIToggle = useAppSelector(selectToggle)
  const [alignment, setAligment] = React.useState<MarkerType | null>(null);

  const handleInputType = (
    event: React.MouseEvent<HTMLElement>,
    newInputMode: MarkerType
  ) => {
    setIconMode(newInputMode);
    setAligment(newInputMode);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleInputType}
      aria-label="text alignment"
    >
      <ToggleButton value="origin" aria-label="left aligned" color="success">
        <SwipeLeftIcon />
      </ToggleButton>
      <ToggleButton value="Up" aria-label="centered" color="success">
        <ArrowUpwardIcon />
      </ToggleButton>
      <ToggleButton value="Down" aria-label="centered" color="success">
        <ArrowDownwardIcon />
      </ToggleButton>
      <ToggleButton value="Left" aria-label="centered" color="success">
        <ArrowBackIcon />
      </ToggleButton>
      <ToggleButton value="Right" aria-label="centered" color="success">
        <ArrowRightAltIcon />
      </ToggleButton>
      <ToggleButton value="HumanPos" aria-label="centered" color="success">
        <Image src={marker2Url["HumanPos"]} width={22} height={20} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DrawingToggle;
