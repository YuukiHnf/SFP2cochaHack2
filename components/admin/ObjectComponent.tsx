import {
  DrawingManager,
  InfoWindow,
  Marker,
  Polygon,
  Rectangle,
} from "@react-google-maps/api";
import { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminObjects,
  selectAdminTaskBlockInit,
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
  const objectInit = useAppSelector(selectAdminTaskBlockInit);

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

    ptrObjectId !== "" && setPtrObjectId("");
  };

  const rectAngleOption = {
    fillColor: "teal",
    fillOpactiy: 0.3,
    strokeColor: "teal",
    strokeOpacity: 0.3,
  };

  const drawControllOption = {
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ["marker", "circle", "polygon", "polyline", "rectangle"],
    },
  };

  const PolygonOption = {};

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        setPtrObjectId={setPtrObjectId}
      />
      <DefaultGoogleMapComponent
        onClick={(e: google.maps.MapMouseEvent) => {
          console.log(e.latLng?.lat(), e.latLng?.lng());
          onClickOnMap(e);
        }}
      >
        <DrawingManager drawingMode={google.maps.drawing.OverlayType.MARKER} />
        {objectInit?.objectLocations.map((obj) => (
          <Marker
            key={obj.objectId}
            position={obj.location}
            icon={{
              url:
                obj.objectId === ptrObjectId
                  ? objectParams.find((value) => value.id === obj.objectId)
                      ?.iconUrl ?? ""
                  : objectParams.find((value) => value.id === obj.objectId)
                      ?.semiIconUrl ?? "",
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        {/* // ここにまたPolygonなどを置いていく */}
        <Polygon
          path={[
            new google.maps.LatLng(43.080180692594475, 141.34037284277449),
            new google.maps.LatLng(43.07991425690792, 141.34044258020887),
            new google.maps.LatLng(43.07994560234294, 141.34059814833174),
            new google.maps.LatLng(43.08020666961666, 141.3405176820613),
          ]}
          options={rectAngleOption}
        />
        <InfoWindow position={new google.maps.LatLng(43.0802, 141.34045)}>
          <div>特設ステージ</div>
        </InfoWindow>
      </DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
