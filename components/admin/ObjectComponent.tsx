import { Button } from "@mui/material";
import {
  Circle,
  DrawingManager,
  InfoWindow,
  Marker,
  Polygon,
  Rectangle,
} from "@react-google-maps/api";
import { useCallback, useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import { selectTeamId } from "../../features/basicInfoSlice";
import useObjectHooks from "../../hooks/useObjectHooks";
import useSetObjectHooks from "../../hooks/useSetObjectHooks";
import { Location, SetObjectType } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import DragDropMarker from "../googlemap/DragDropMarker";
import MapSettingComponent from "../googlemap/MapSettingComponent";
import ObjectTable from "./ObjectTable";

import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { title } from "process";

/**
 * 2022/03/30
 *  初期位置は、全てのObjectをMarkerで表示しているので、無駄がある。変更するべき
 * @returns
 */
const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  const { saveInitObjectLocation, FilteredObjectParam } = useObjectHooks();
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

  const drawControlOption: google.maps.drawing.DrawingManagerOptions = {
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_LEFT,
      drawingModes: [
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.POLYGON,
      ],
    },
  };

  const PolygonOption = {};

  /**SetObjectについて */
  const { addSetObject } = useSetObjectHooks();
  const [editObj, setEditObj] = useState<
    google.maps.Circle | google.maps.Marker | google.maps.Polygon | null
  >(null);
  const [editTitle, setEditTitle] = useState<string>("");
  //console.log(editObj);

  const editObjView = (
    obj: google.maps.Circle | google.maps.Marker | google.maps.Polygon
  ) => {
    console.log(obj instanceof google.maps.Marker);
    if (obj instanceof google.maps.Circle) {
      obj = obj as google.maps.Circle;
      const center = obj.getCenter();
      console.log("circle");
      return (
        <>
          {center && (
            <>
              <Circle center={center} radius={obj.getRadius()} />
              <InfoWindow
                position={center}
                onCloseClick={() => {
                  setEditObj(null);
                  setEditTitle("");
                }}
              >
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (title.length === 0) return;
                      obj = obj as google.maps.Circle;
                      addSetObject({
                        desc: editTitle,
                        setObjectType: "GoogleCircle",
                        locations: [
                          { lat: center.lat(), lng: center.lng() },
                          { lat: obj.getRadius(), lng: 0 },
                        ],
                      } as Omit<SetObjectType, "id">);
                      setEditObj(null);
                      setEditTitle("");
                    }}
                  >
                    <SaveIcon color="success" />
                  </Button>
                  <Button
                    onClick={() => {
                      setEditObj(null);
                      setEditTitle("");
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </>
              </InfoWindow>
            </>
          )}
        </>
      );
    } else if (obj instanceof google.maps.Marker) {
      obj = obj as google.maps.Marker;
      const pos = obj.getPosition();
      console.log("marker");
      return (
        <>
          {pos && (
            <>
              <Marker position={pos} />
              <InfoWindow position={pos} onCloseClick={() => setEditObj(null)}>
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      if (title.length === 0) return;
                      addSetObject({
                        desc: editTitle,
                        setObjectType: "GoogleMarker",
                        locations: [{ lat: pos.lat(), lng: pos.lng() }],
                      } as Omit<SetObjectType, "id">);
                      setEditObj(null);
                      setEditTitle("");
                    }}
                  >
                    <SaveIcon color="success" />
                  </Button>
                  <Button
                    onClick={() => {
                      setEditObj(null);
                      setEditTitle("");
                    }}
                  >
                    <DeleteIcon color="error" />
                  </Button>
                </>
              </InfoWindow>
            </>
          )}
        </>
      );
    } else if (obj instanceof google.maps.Polygon) {
      obj = obj as google.maps.Polygon;
      console.log("Polygon");
      return (
        <>
          <Polygon path={obj.getPath()} />
          <InfoWindow
            position={obj.getPath().getAt(0)}
            onCloseClick={() => setEditObj(null)}
          >
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <Button
                onClick={() => {
                  if (title.length === 0) return;
                  obj = obj as google.maps.Polygon;
                  addSetObject({
                    desc: editTitle,
                    setObjectType: "GooglePolygon",
                    locations: obj
                      .getPath()
                      .getArray()
                      .map((_path, index) => {
                        _path = _path as google.maps.LatLng;
                        return { lat: _path.lat(), lng: _path.lng() };
                      }),
                  } as Omit<SetObjectType, "id">);
                  setEditObj(null);
                  setEditTitle("");
                }}
              >
                <SaveIcon color="success" />
              </Button>
              <Button onClick={() => setEditObj(null)}>
                <DeleteIcon color="error" />
              </Button>
            </>
          </InfoWindow>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        ptrObjectId={ptrObjectId}
        setPtrObjectId={setPtrObjectId}
      />
      <DefaultGoogleMapComponent
        onClick={useCallback((e: google.maps.MapMouseEvent) => {
          console.log(e.latLng?.lat(), e.latLng?.lng());
        }, [])}
      >
        <DrawingManager
          options={drawControlOption}
          onCircleComplete={(obj) => {
            setEditObj(obj);
            obj.setVisible(false);
          }}
          onMarkerComplete={(obj) => {
            setEditObj(obj);
            obj.setVisible(false);
          }}
          onPolygonComplete={(obj) => {
            setEditObj(obj);
            obj.setVisible(false);
          }}
        />
        {/* 新しいsetObject */}
        {editObj && editObjView(editObj)}
        {/* Objectの表示 */}
        {filterObjects.map((obj) =>
          obj.objectTimeLocations && obj.objectTimeLocations.length !== 0 ? (
            <DragDropMarker
              key={obj.id}
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
      </DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
