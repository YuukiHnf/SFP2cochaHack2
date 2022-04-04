import {
  DrawingManager,
  InfoWindow,
  Marker,
  Polygon,
  Rectangle,
} from "@react-google-maps/api";
import { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import { selectTeamId } from "../../features/basicInfoSlice";
import useObjectHooks from "../../hooks/useObjectHooks";
import {
  Location,
  ObjectLocation,
  ObjectTimeLocations,
} from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import DragDropMarker from "../googlemap/DragDropMarker";
import MapSettingComponent from "../googlemap/MapSettingComponent";
import ObjectTable from "./ObjectTable";

/**
 * 2022/03/30
 *  初期位置は、全てのObjectをMarkerで表示しているので、無駄がある。変更するべき
 * @returns
 */
const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  const teamId = useAppSelector(selectTeamId);
  const { saveInitObjectLocation, FilteredObjectParam } = useObjectHooks({
    teamId: teamId,
  });
  const objectParams = useAppSelector(selectAdminObjects);
  const filterObjects = FilteredObjectParam();
  console.log(ptrObjectId);

  const onClickOnMap = (e: google.maps.MapMouseEvent) => {
    if (ptrObjectId === "") {
      //何も選択されていない時
      return;
    }
    // 今のObject
    const obj = filterObjects.filter((param) => param.id === ptrObjectId)[0];
    const objName = obj.objectName;
    const targetObject = objectParams.filter(
      (param) => param.objectName === objName
    );

    saveInitObjectLocation(
      targetObject.map((_obj) => _obj.id),
      targetObject.map((_obj) =>
        _obj.objectTimeLocations ? _obj.objectTimeLocations[0].id : ""
      ),
      {
        lat:
          e.latLng?.lat() ??
          (obj.objectTimeLocations
            ? obj.objectTimeLocations[0].location.lat
            : 0),
        lng:
          e.latLng?.lng() ??
          (obj.objectTimeLocations
            ? obj.objectTimeLocations[0].location.lng
            : 0),
      } as Location
    );

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
        ptrObjectId={ptrObjectId}
        setPtrObjectId={setPtrObjectId}
      />
      <DefaultGoogleMapComponent
      // onClick={(e: google.maps.MapMouseEvent) => {
      //   console.log(e.latLng?.lat(), e.latLng?.lng());
      //   onClickOnMap(e);
      // }}
      >
        <DrawingManager drawingMode={google.maps.drawing.OverlayType.MARKER} />
        {filterObjects.map((obj) =>
          obj.objectTimeLocations && obj.objectTimeLocations.length !== 0 ? (
            <DragDropMarker
              position={
                obj.objectTimeLocations
                  ? obj.objectTimeLocations[0].location
                  : { lat: 0, lng: 0 }
              }
              icon={{
                url:
                  obj.id === ptrObjectId
                    ? filterObjects.find((value) => value.id === obj.id)
                        ?.iconUrl ?? ""
                    : filterObjects.find((value) => value.id === obj.id)
                        ?.semiIconUrl ?? "",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onStartDrag={() => setPtrObjectId(obj.id)}
              onEndDrag={(e) => onClickOnMap(e)}
            />
          ) : (
            <></>
          )
        )}
        {/* // ここにまたPolygonなどを置いていく */}
        <MapSettingComponent />
        <InfoWindow position={new google.maps.LatLng(43.0802, 141.34045)}>
          <div>特設ステージ</div>
        </InfoWindow>
        <InfoWindow
          position={
            new google.maps.LatLng(43.080593077898364, 141.34089096515135)
          }
        >
          <div>特設ステージ2</div>
        </InfoWindow>
        <InfoWindow
          position={
            new google.maps.LatLng(43.08028541379676, 141.33959455686127)
          }
        >
          <div>演者待機場所</div>
        </InfoWindow>
      </DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
