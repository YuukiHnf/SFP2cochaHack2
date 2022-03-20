import { Button, Input } from "@mui/material";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef, useState } from "react";
import { PLACE } from "../../utils/firebase/FirebaseStore";

const initContainerStyle = {
  width: "80%",
  height: "400px",
};

const initMapState: PLACE = {
  zoom: 19,
  center: {
    lat: 43.08014911998283,
    lng: 141.34006823521992,
  },
  tilt: 0,
  heading: 90,
};
const options = {
  disableDefaultUI: false,
  // デフォルトUI（衛星写真オプションなど）をキャンセルします。
  zoomControl: true,
  rotateControl: true,
  keyboardShortcuts: true,
  clickableIcons: true,
};

const PlaceComponent = () => {
  const [mapState, setMapState] = useState(initMapState);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  console.log(mapState);

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY ?? ""}
      >
        <GoogleMap
          mapContainerStyle={initContainerStyle}
          center={mapState.center}
          zoom={mapState.zoom}
          tilt={mapState.tilt}
          heading={mapState.heading}
          options={options}
          onLoad={onMapLoad}
          onZoomChanged={() => {
            setMapState({
              ...mapState,
              zoom: mapRef.current?.getZoom() ?? initMapState.zoom,
            });
          }}
          onDragEnd={() => {
            setMapState({
              ...mapState,
              center: {
                lat:
                  mapRef.current?.getCenter()?.lat() ?? initMapState.center.lat,
                lng:
                  mapRef.current?.getCenter()?.lng() ?? initMapState.center.lng,
              },
            });
          }}
          onHeadingChanged={() => {
            console.log("head Change");
          }}
        ></GoogleMap>
      </LoadScript>
      <p>zoom:{mapState.zoom}</p>
      <p>
        loc:[ lat: {mapState.center.lat}, lng: {mapState.center.lng}]
      </p>
      {/* <p>tilt:0-45</p>
      <Input
        type="text"
        value={mapState.tilt}
        onChange={(e) =>
          setMapState({ ...mapState, tilt: Number(e.target.value) })
        }
      />
      <Button
        onClick={() => {
          mapRef.current?.setTilt(mapState.tilt);
        }}
      >
        Apply
      </Button> */}
      <p>heading</p>
      <Input
        type="text"
        value={mapState.heading}
        onChange={(e) =>
          setMapState({ ...mapState, heading: Number(e.target.value) })
        }
      />
      <Button
        onClick={() => {
          mapRef.current?.setHeading(mapState.heading);
        }}
      >
        Apply
      </Button>
    </>
  );
};

export default PlaceComponent;
