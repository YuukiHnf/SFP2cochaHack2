import { InfoWindow, Polygon } from "@react-google-maps/api";
import React, { useState } from "react";

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

/**
 * 常に表示するObjectを表示
 */
const MapSettingComponent = () => {
  const [tapping, setTapping] = useState<"Stage1" | "Stage2" | "Stage3" | null>(
    null
  );
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
        onClick={() => {
          setTapping("Stage1");
        }}
      />
      {tapping === "Stage1" && (
        <InfoWindow position={new google.maps.LatLng(43.0802, 141.34045)}>
          <div>特設ステージ</div>
        </InfoWindow>
      )}
      <Polygon
        path={[
          new google.maps.LatLng(43.0804520248051, 141.34076490132765),
          new google.maps.LatLng(43.08056056624953, 141.34078953690962),
          new google.maps.LatLng(43.08058513929558, 141.34100093572096),
          new google.maps.LatLng(43.08048043135694, 141.34108944861845),
        ]}
        options={rectAngleOption2}
        onClick={() => {
          setTapping("Stage2");
        }}
      />
      {tapping === "Stage2" && (
        <InfoWindow
          position={
            new google.maps.LatLng(43.080593077898364, 141.34089096515135)
          }
        >
          <div>特設ステージ2</div>
        </InfoWindow>
      )}
      <Polygon
        path={[
          new google.maps.LatLng(43.080280605678226, 141.3396075386151),
          new google.maps.LatLng(43.080195433795495, 141.3396365507385),
          new google.maps.LatLng(43.080239465016405, 141.339986544303),
          new google.maps.LatLng(43.080325145143576, 141.33997157158686),
        ]}
        options={rectAngleOption3}
        onClick={() => {
          setTapping("Stage3");
        }}
      />
      {tapping === "Stage3" && (
        <InfoWindow
          position={
            new google.maps.LatLng(43.08028541379676, 141.33959455686127)
          }
        >
          <div>演者待機場所</div>
        </InfoWindow>
      )}
    </>
  );
};

export default MapSettingComponent;
