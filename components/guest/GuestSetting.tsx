import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Switch,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectBasicInfo } from "../../features/basicInfoSlice";
import { selectAllGuestState } from "../../features/guestSlice";
import useGuestState from "../../hooks/useGuestState";

const GuestSetting = () => {
  const guestState = useAppSelector(selectAllGuestState);
  const basicInfo = useAppSelector(selectBasicInfo);
  const { setIsActive, setIsGPS } = useGuestState();

  const onHandleChangeActive = () => {
    setIsActive(!guestState.isActive);
  };
  const onHandleChangeGPS = () => {
    setIsGPS(!guestState.isGPS);
  };
  return (
    <div style={{ margin: "0 auto" }}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">{basicInfo.username}'s setting</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={guestState.isActive}
                onChange={onHandleChangeActive}
                name="Active"
              />
            }
            label="Active"
          />
          <FormHelperText>
            タスクを行うには状態をActiveにする必要があります
          </FormHelperText>
          <FormControlLabel
            control={
              <Switch
                checked={guestState.isGPS}
                onChange={onHandleChangeGPS}
                name="GPS"
              />
            }
            label="GPS"
          />
        </FormGroup>
        <FormHelperText>
          ナビゲーションを有効にするにはGPSをOnにする必要があります
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default GuestSetting;
