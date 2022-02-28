import { Circle, Icon } from "@chakra-ui/react";
import { Marker } from "react-map-gl";

import style from "../style";

const CustomMarker = ({ data, setPopupData, method }) => {
  const { longitude, latitude } = data;
  const { color, icon } = style[method];

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
      <Circle bg="white" size="36px" boxShadow="inset 0 0 5px rgba(0,0,0,.5)">
        <Icon as={icon} color={color} fontSize="1.8em" />
      </Circle>
    </Marker>
  );
};

export default CustomMarker;
