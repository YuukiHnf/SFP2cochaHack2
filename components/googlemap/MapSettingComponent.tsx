import { Button } from "@mui/material";
import { Circle, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import React, { memo, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectSetObjects } from "../../features/setObjectSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useSetObjectHooks from "../../hooks/useSetObjectHooks";

const rectAngleOption = {
  fillColor: "teal",
  fillOpactiy: 0.3,
  strokeColor: "teal",
  strokeOpacity: 0.3,
};
const rectAngleOption2 = {
  fillColor: "black",
  fillOpactiy: 0.3,
  strokeColor: "black",
  strokeOpacity: 0.3,
};

const rectAngleOption3 = {
  fillColor: "gray",
  fillOpactiy: 0.3,
  strokeColor: "gray",
  strokeOpacity: 0.3,
};

const rectAngleOption4 = {
  fillColor: "darkgreen",
  fillOpactiy: 0.3,
  strokeColor: "darkgreen",
  strokeOpacity: 0.3,
};

const rectAngleOption5 = {
  fillColor: "darkred",
  fillOpactiy: 0.3,
  strokeColor: "darkred",
  strokeOpacity: 0.3,
};

/**
 * 常に表示するObjectを表示
 */
const MapSettingComponent = () => {
  const [tappingIndex, setTappingIndex] = useState<number>(-1);
  const setObjects = useAppSelector(selectSetObjects);
  const { deleteSetObject } = useSetObjectHooks();
  console.log(tappingIndex);
  return (
    <>
      {setObjects &&
        setObjects.map((setObj, index) => {
          switch (setObj.setObjectType) {
            case "GooglePolygon":
              return (
                <>
                  <Polygon
                    key={setObj.id}
                    path={setObj.locations}
                    options={
                      setObj.desc.endsWith("ステージ")
                        ? rectAngleOption
                        : setObj.desc.endsWith("テント")
                        ? rectAngleOption4
                        : rectAngleOption3
                    }
                    onClick={() => {
                      setTappingIndex(index);
                    }}
                  />
                </>
              );
            case "GoogleMarker":
              return (
                <Marker
                  key={setObj.id}
                  position={setObj.locations[0]}
                  label={setObj.desc[0]}
                  onClick={() => {
                    setTappingIndex(index);
                  }}
                />
              );
            case "GoogleCircle":
              return (
                <Circle
                  key={setObj.id}
                  center={setObj.locations[0]}
                  radius={setObj.locations[1].lat}
                  options={rectAngleOption5}
                  onClick={() => {
                    setTappingIndex(index);
                  }}
                />
              );
            default:
              return <></>;
          }
        })}
      {tappingIndex != -1 && (
        <InfoWindow
          position={setObjects[tappingIndex].locations[0]}
          onCloseClick={() => setTappingIndex(-1)}
        >
          <>
            <div>{setObjects[tappingIndex].desc}</div>
            <Button
              onClick={() => deleteSetObject(setObjects[tappingIndex].id)}
            >
              <DeleteIcon color="error" />
            </Button>
            <Button>
              <EditIcon color="success" />
            </Button>
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default memo(MapSettingComponent);
