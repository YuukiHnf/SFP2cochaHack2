import { Marker } from "@react-google-maps/api";
import { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlockInitObjectLocation,
} from "../../features/adminSlice";
import { selectTeamId } from "../../features/basicInfoSlice";
import useObjectHooks from "../../hooks/useObjectHooks";
import { ObjectLocation } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import ObjectTable from "./ObjectTable";

const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  const teamId = useAppSelector(selectTeamId);
  const { saveTaskBlock } = useObjectHooks({ teamId: teamId });
  const objectParams = useAppSelector(selectAdminObjects);
  const objectInit = useAppSelector(selectAdminTaskBlockInitObjectLocation);

  const onClickOnMap = (e: google.maps.MapMouseEvent) => {
    if (ptrObjectId === "") {
      //何も選択されていない時
      return;
    }
    // 今のObject
    const obj = objectInit.objectLocations.filter(
      (param) => param.objectId === ptrObjectId
    )[0];

    saveTaskBlock({
      ...objectInit,
      objectLocations: objectInit.objectLocations.map((_obj) => {
        return _obj.objectId === obj.objectId
          ? ({
              ..._obj,
              location: {
                lat: e.latLng?.lat() ?? _obj.location.lat,
                lng: e.latLng?.lng() ?? _obj.location.lng,
              },
            } as ObjectLocation)
          : _obj;
      }),
    });
    console.log("[Click]:", e.latLng);

    ptrObjectId !== "" && setPtrObjectId("");
  };

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        setPtrObjectId={setPtrObjectId}
      />
      <p>{ptrObjectId}</p>
      <DefaultGoogleMapComponent
        onClick={(e: google.maps.MapMouseEvent) => {
          console.log(e.latLng?.lat());
          onClickOnMap(e);
        }}
      >
        {objectInit?.objectLocations.map((obj) => (
          <Marker
            key={obj.objectId}
            position={obj.location}
            icon={{
              url:
                objectParams.find((value) => value.id === obj.objectId)
                  ?.iconUrl ?? "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
