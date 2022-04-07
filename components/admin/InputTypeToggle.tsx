import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  InputModeType,
  selectInputType,
  setInputType,
} from "../../features/uiHelperSlice";

import TouchAppIcon from "@mui/icons-material/TouchApp";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
/**
 * Edit用のUI操作設定
 * @returns
 */

const InputTypeToggle = () => {
  const InputType = useAppSelector(selectInputType);
  const dispatch = useAppDispatch();
  //const UIToggle = useAppSelector(selectToggle)

  const handleInputType = (
    event: React.MouseEvent<HTMLElement>,
    newInputType: InputModeType | null
  ) => {
    newInputType
      ? dispatch(setInputType(newInputType))
      : dispatch(setInputType("ORIGINAL"));
  };

  return (
    <ToggleButtonGroup
      value={InputType}
      exclusive
      color="primary"
      onChange={handleInputType}
      aria-label="text alignment"
    >
      <ToggleButton
        value="ORIGINANL"
        aria-label="left aligned"
        color="standard"
      >
        <TouchAppIcon />
      </ToggleButton>
      <ToggleButton value="ADD" aria-label="centered" color="standard">
        <AddTaskIcon />
        <ArrowRightIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default InputTypeToggle;
