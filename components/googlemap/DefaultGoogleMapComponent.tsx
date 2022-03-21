import { map } from "@firebase/util";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import { ReactNode, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminPlaceState } from "../../features/adminSlice";

interface Props {
  children: ReactNode;
}

const mapContainerStyle = {
  ///CSS props
  height: "80%",
  width: "80%",
  margin: "0 auto",
};

const DefaultGoogleMapComponent: VFC<Props> = ({ children }) => {
  const placeParam = useAppSelector(selectAdminPlaceState);
  const mapOption = {
    disableDefaultUI: false,
    minZoom: placeParam.zoom,
  };

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={placeParam.zoom}
      center={placeParam.center}
      options={mapOption}
    >
      {children}
    </GoogleMap>
  );
};

export default DefaultGoogleMapComponent;
