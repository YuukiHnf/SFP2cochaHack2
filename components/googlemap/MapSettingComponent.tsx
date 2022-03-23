import { Polygon } from "@react-google-maps/api";
import React from "react";

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

/**
 * 常に表示するObjectを表示
 */
const MapSettingComponent = () => {
  return (
    <>
      <Polygon
        path={[
          new google.maps.LatLng(43.080180692594475, 141.34037284277449),
          new google.maps.LatLng(43.07991425690792, 141.34044258020887),
          new google.maps.LatLng(43.07994560234294, 141.34059814833174),
          new google.maps.LatLng(43.08020666961666, 141.3405176820613),
        ]}
        options={rectAngleOption}
      />
      <Polygon
        path={[
          new google.maps.LatLng(43.0804520248051, 141.34076490132765),
          new google.maps.LatLng(43.08056056624953, 141.34078953690962),
          new google.maps.LatLng(43.08058513929558, 141.34100093572096),
          new google.maps.LatLng(43.08048043135694, 141.34108944861845),
        ]}
        options={rectAngleOption2}
      />
    </>
  );
};

export default MapSettingComponent;
