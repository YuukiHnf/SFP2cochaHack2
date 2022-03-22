import { Marker } from "@react-google-maps/api";
import { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlockInitObjectLocation,
} from "../../features/adminSlice";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import ObjectTable from "./ObjectTable";

const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  const objectParams = useAppSelector(selectAdminObjects);
  const objectInit = useAppSelector(selectAdminTaskBlockInitObjectLocation);

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        setPtrObjectId={setPtrObjectId}
      />
      <p>{ptrObjectId}</p>
      <DefaultGoogleMapComponent>
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
            onMouseDown={() => {
              setPtrObjectId(obj.objectId);
            }}
            onMouseOver={() => {
              ptrObjectId !== "" && setPtrObjectId("");
            }}
            onMouseUp={(e: google.maps.MapMouseEvent) => {
              ptrObjectId !== "" && setPtrObjectId("");
            }}
          />
        ))}
      </DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
