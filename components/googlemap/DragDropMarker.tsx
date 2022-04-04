import { Marker } from "@react-google-maps/api";
import React, { useState, VFC } from "react";
import {
  ObjectLocation,
  OBJECTPARAM,
} from "../../utils/firebase/FirebaseStore";

type Props = {
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  icon: google.maps.Icon;
  onStartDrag?: () => void;
  onEndDrag?: (e: google.maps.MapMouseEvent) => void;
};

/**
 * DragとDropができるMakerをつくる
 */

const DragDropMarker: VFC<Props> = ({
  position,
  icon,
  onStartDrag,
  onEndDrag,
}) => {
  // iconの大きさ変換
  const [iconParams, setIconParams] = useState<google.maps.Icon>(icon);

  const onDragStartUI = () => {
    setIconParams({
      ...iconParams,
      scaledSize: new window.google.maps.Size(50, 50),
    });
  };

  const onDragEndUI = () => {
    setIconParams({
      ...iconParams,
      scaledSize: new window.google.maps.Size(30, 30),
    });
  };

  return (
    <Marker
      position={position}
      icon={iconParams}
      draggable={true}
      onDragStart={() => {
        onDragStartUI();
        onStartDrag && onStartDrag();
      }}
      onDragEnd={(e: google.maps.MapMouseEvent) => {
        onDragEndUI();
        onEndDrag && onEndDrag(e);
      }}
    ></Marker>
  );
};

export default DragDropMarker;
