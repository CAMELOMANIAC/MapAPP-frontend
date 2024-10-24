import { IoMdCamera } from "react-icons/io";
import { Marker, MarkerProps } from "react-map-gl";

type MapMarkerProps = {
  latitude: number;
  longitude: number;
  displayName: string;
} & MarkerProps;

const MapMarker = ({ latitude, longitude, displayName, ...props }: MapMarkerProps) => {
  return (
    <Marker latitude={latitude} longitude={longitude} {...props}>
      <IoMdCamera />
      {displayName}
    </Marker>
  );
};

export default MapMarker;
