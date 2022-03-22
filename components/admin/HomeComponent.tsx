import { Polygon } from "@react-google-maps/api";
import React from "react";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import TimeTable from "./TimeTable";

const _mapContainerStyle = {
  width: "80%",
  height: "600px",
  marginLeft: "auto",
  marginTop: "0",
  float: "left",
};

const _tableStyle: React.CSSProperties = {
  float: "left",
  width: "20%",
};

const rectAngleOption = {
  fillColor: "teal",
  fillOpactiy: 0.3,
  strokeColor: "teal",
  strokeOpacity: 0.3,
};

const HomeComponent = () => {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div style={_tableStyle}>
          <TimeTable />
        </div>
        <DefaultGoogleMapComponent mapContainerStyle={_mapContainerStyle}>
          <Polygon
            path={[
              new google.maps.LatLng(43.080180692594475, 141.34037284277449),
              new google.maps.LatLng(43.07991425690792, 141.34044258020887),
              new google.maps.LatLng(43.07994560234294, 141.34059814833174),
              new google.maps.LatLng(43.08020666961666, 141.3405176820613),
            ]}
            options={rectAngleOption}
          />
        </DefaultGoogleMapComponent>
      </div>
    </>
  );
};

export default HomeComponent;
