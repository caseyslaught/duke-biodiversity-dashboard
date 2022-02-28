import { Badge, Box, Image, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { Popup } from "react-map-gl";

import style from "../style";

const CustomPopup = ({ data, setPopupData }) => {
  const {
    category,
    datetime_created,
    level,
    longitude,
    latitude,
    method,
    photo_href,
  } = data;
  return (
    <Popup
      anchor="bottom"
      closeButton={false}
      longitude={Number(longitude)}
      latitude={Number(latitude)}
      closeOnClick={false}
      onClose={() => setPopupData(null)}
    >
      <Box position="relative">
        <Badge colorScheme={style[method].colorScheme} mb={1}>
          {method}
        </Badge>
        <Table variant="simple" size="sm" mb={2}>
          <Tbody>
            <Tr>
              <Td p={1}>Date</Td>
              <Td p={1}>{new Date(datetime_created).toDateString()}</Td>
            </Tr>
            <Tr>
              <Td p={1}>Category</Td>
              <Td p={1}>{category}</Td>
            </Tr>
            <Tr>
              <Td p={1}>Species</Td>
              <Td p={1}>unidentified</Td>
            </Tr>
            <Tr>
              <Td p={1}>Forest level</Td>
              <Td p={1}>{level}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Image src={photo_href} alt="observation" />
      </Box>
    </Popup>
  );
};

export default CustomPopup;
