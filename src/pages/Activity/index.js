import React from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

import useDroneObservations from "../../hooks/useDroneObservations";

export default function ActivityPage() {
  const [authenticated] = useOutletContext();
  const droneObservations = useDroneObservations({ authenticated });

  // TODO: try to prevent obs running twice

  return (
    <Flex flex={1} align="center" justify="center">
      <Box>Activity</Box>
    </Flex>
  );
}
