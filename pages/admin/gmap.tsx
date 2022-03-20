import {
  Circle,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState, VFC } from "react";
const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 43.07979550453853,
  lng: 141.34033750385933,
};

const positionA = {
  lat: 43.07899550453853,
  lng: 141.34033750385933,
};

const positionB = {
  lat: 43.07989550453853,
  lng: 141.34033750385933,
};

const circleOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const divStyle = {
  background: "white",
  fontSize: 5.5,
};

const gmap: VFC = () => {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    return setSize(new window.google.maps.Size(0, -45));
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY ?? ""}
      onLoad={() => createOffsetSize()}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={positionA} />
        <Marker position={positionB} />
        <InfoWindow position={positionA} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>PositionA</h1>
          </div>
        </InfoWindow>
        <InfoWindow position={positionB} options={infoWindowOptions}>
          <div style={divStyle}>
            <h1>PositionB</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
    </LoadScript>
  );
};

export default gmap;
