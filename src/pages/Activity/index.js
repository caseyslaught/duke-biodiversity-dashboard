import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useObservations from "../../hooks/useObservations";

import ResultsTable from "./components/ResultsTable";

const allCategories = ["Birds", "Insects", "Mammals", "Plants"];
const allMethods = ["Acoustic", "Camera trap", "DNA", "Drone"];
const allLevels = ["Floor", "Understory", "Canopy", "Emergent"];

export default function ActivityPage({ authenticated }) {
  const [filters, setFilters] = useState({
    categories: allCategories.join(),
    methods: allMethods.join(),
    levels: allLevels.join(),
  });

  const observations = useObservations({ authenticated, filters });

  const flatObservations = [];
  Object.keys(observations).forEach((method) => {
    observations[method].forEach((obs) => flatObservations.push(obs));
  });

  flatObservations.sort((a, b) =>
    a.datetime_created > b.datetime_created ? -1 : 1
  );

  console.log("flat", flatObservations);

  return (
    <Flex flex={1} padding={4}>
      <Box w="100%">
        <ResultsTable observations={flatObservations} />
      </Box>
    </Flex>
  );
}
