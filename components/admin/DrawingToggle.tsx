import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  InputModeType,
  selectInputType,
  setInputType,
} from "../../features/uiHelperSlice";

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
      color="primary"
      onChange={handleInputType}
      aria-label="text alignment"
    >
      <ToggleButton value="origin" aria-label="left aligned" color="standard">
        <SwipeLeftIcon />
      </ToggleButton>
      <ToggleButton value="Up" aria-label="centered" color="standard">
        <ArrowUpwardIcon />
      </ToggleButton>
      <ToggleButton value="Down" aria-label="centered" color="standard">
        <ArrowDownwardIcon />
      </ToggleButton>
      <ToggleButton value="Left" aria-label="centered" color="standard">
        <ArrowBackIcon />
      </ToggleButton>
      <ToggleButton value="Right" aria-label="centered" color="standard">
        <ArrowRightAltIcon />
      </ToggleButton>
      <ToggleButton value="HumanPos" aria-label="centered" color="standard">
        <Image src={marker2Url["HumanPos"]} width={22} height={20} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default DrawingToggle;
