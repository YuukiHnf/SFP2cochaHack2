import { Marker } from "@react-google-maps/api";
import React, { VFC } from "react";
import {
  ObjectLocation,
  OBJECTPARAM,
} from "../../utils/firebase/FirebaseStore";

type Props = {
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  icon?: string | google.maps.Icon | google.maps.Symbol | undefined;
};

/**
 * DragとDropができるMakerをつくる
 */

const DragDropMarker: VFC<Props> = ({ position, icon }) => {
  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      onDragStart={() => console.log("Drag Start")}
      onDragEnd={() => console.log("Drag End")}
    ></Marker>
  );
};

export default DragDropMarker;
