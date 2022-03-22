import { map } from "@firebase/util";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";
import { ReactNode, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminPlaceState } from "../../features/adminSlice";

interface Props {
  children: ReactNode;
  onMouseOver?: (e: google.maps.MapMouseEvent) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

const mapContainerStyle = {
  width: "80%",
  height: "600px",
  margin: "0 auto",
};

const DefaultGoogleMapComponent: VFC<Props> = ({
  children,
  onMouseOver,
  onClick,
}) => {
  const placeParam = useAppSelector(selectAdminPlaceState);
  const mapOption: google.maps.MapOptions = {
    disableDefaultUI: true, // button無くす
    minZoom: placeParam.zoom,
    maxZoom: 40,
    rotateControl: true, // 効果なさそう
    gestureHandling: "cooperative",
  };

  return (
    <div style={{ margin: "0 0 500 0" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={placeParam.zoom}
        center={placeParam.center}
        options={mapOption}
        onMouseOver={onMouseOver}
        onClick={onClick}
      >
        {children}
      </GoogleMap>
    </div>
  );
};

export default DefaultGoogleMapComponent;
