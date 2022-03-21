import { map } from "@firebase/util";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import { ReactNode, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminPlaceState } from "../../features/adminSlice";

interface Props {
  children: ReactNode;
}

const mapContainerStyle = {
  width: "80%",
  height: "600px",
  margin: "10px 10px 0px auto",
};

const DefaultGoogleMapComponent: VFC<Props> = ({ children }) => {
  const placeParam = useAppSelector(selectAdminPlaceState);
  const mapOption: google.maps.MapOptions = {
    disableDefaultUI: true, // button無くす
    minZoom: placeParam.zoom,
    maxZoom: 40,
    rotateControl: true, // 効果なさそう
    gestureHandling: "cooperative",
    restriction: {
      latLngBounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(placeParam.center),
        new google.maps.LatLng(placeParam.center)
      ),
    },
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={placeParam.zoom}
        center={placeParam.center}
        options={mapOption}
      >
        {children}
      </GoogleMap>
    </div>
  );
};

export default DefaultGoogleMapComponent;
