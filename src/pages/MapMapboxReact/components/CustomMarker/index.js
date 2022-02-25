import { Circle, Icon } from "@chakra-ui/react";
import { FaHelicopter } from "react-icons/fa";
import { Marker } from "react-map-gl";

const config = {
  Drone: {
    color: "blue.600",
    icon: FaHelicopter,
  },
};

const CustomMarker = ({ data, setPopupData, method }) => {
  const { longitude, latitude } = data;

  const { color, icon } = config[method];

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="top"
      onClick={(e) => {
        setPopupData(data);
        e.originalEvent.stopPropagation();
      }}
    >
      <Circle bg="white" size="36px" boxShadow="inset 0 0 5px #000000">
        <Icon as={icon} color={color} fontSize="2em" />
      </Circle>
    </Marker>
  );
};

export default CustomMarker;
