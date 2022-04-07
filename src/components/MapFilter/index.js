import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronRight,
  FiFilePlus,
  FiGrid,
  FiLayers,
  FiMonitor,
} from "react-icons/fi";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Collapse,
  Flex,
  HStack,
  IconButton,
  VStack,
  useTheme,
} from "@chakra-ui/react";

export default function Filters({
  allDisplays,
  setShowFlights,
  setShowHeatmap,
  setShowObs,
  allCategories,
  allLevels,
  allMethods,
  setFilters,
}) {
  return (
    <VStack
      spacing={1}
      position="absolute"
      top="10px"
      right="10px"
      zIndex="999"
      background="gray.50"
      p={4}
      pt={2}
      pb={3}
      borderRadius="8px"
      minWidth="250px"
    >
      <FilterCheckboxes
        title="Displays"
        Icon={FiMonitor}
        initialExpanded={true}
        defaultValues={allDisplays}
        onChange={(newDisplays) => {
          setShowFlights(newDisplays.includes("Flights"));
          setShowHeatmap(newDisplays.includes("Heatmap"));
          setShowObs(newDisplays.includes("Observations"));
        }}
      >
        {allDisplays.map((dis) => (
          <Checkbox key={dis} value={dis}>
            {dis}
          </Checkbox>
        ))}
      </FilterCheckboxes>
      <FilterSection title="Filters">
        <FilterCheckboxes
          title="Category"
          Icon={FiGrid}
          initialExpanded={false}
          defaultValues={allCategories}
          onChange={(newCategories) => {
            setFilters((oldFilters) => ({
              ...oldFilters,
              categories: newCategories.join(),
            }));
          }}
        >
          {allCategories.map((cat) => (
            <Checkbox key={cat} value={cat}>
              {cat}
            </Checkbox>
          ))}
        </FilterCheckboxes>
        <FilterCheckboxes
          title="Collection method"
          Icon={FiFilePlus}
          initialExpanded={false}
          defaultValues={allMethods}
          onChange={(newMethods) => {
            setFilters((oldFilters) => ({
              ...oldFilters,
              methods: newMethods.join(),
            }));
          }}
        >
          {allMethods.map((method) => (
            <Checkbox key={method} value={method}>
              {method}
            </Checkbox>
          ))}
        </FilterCheckboxes>
        <FilterCheckboxes
          title="Forest layer"
          Icon={FiLayers}
          initialExpanded={false}
          defaultValues={allLevels}
          onChange={(newLevels) => {
            setFilters((oldFilters) => ({
              ...oldFilters,
              levels: newLevels.join(),
            }));
          }}
        >
          {allLevels.map((level) => (
            <Checkbox key={level} value={level}>
              {level}
            </Checkbox>
          ))}
        </FilterCheckboxes>
      </FilterSection>
    </VStack>
  );
}

const FilterCheckboxes = ({
  title,
  Icon,
  initialExpanded,
  defaultValues,
  onChange,
  children,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const theme = useTheme();

  return (
    <VStack align="flex-start" spacing={3} w="100%">
      <Flex align="center" justify="space-between" w="100%">
        <HStack align="center" spacing={2}>
          <Icon color={theme.colors.gray[500]} /> <Box>{title}</Box>
        </HStack>
        {expanded ? (
          <IconButton
            color={theme.colors.gray[500]}
            variant="ghost"
            size="sm"
            icon={<FiChevronDown />}
            onClick={() => setExpanded(false)}
          />
        ) : (
          <IconButton
            color={theme.colors.gray[500]}
            variant="ghost"
            size="sm"
            icon={<FiChevronRight />}
            onClick={() => setExpanded(true)}
          />
        )}
      </Flex>
      <Collapse in={expanded}>
        <CheckboxGroup defaultValue={defaultValues} onChange={onChange}>
          <VStack align="flex-start" ps={3} mb={2} w="100%">
            {children}
          </VStack>
        </CheckboxGroup>
      </Collapse>
    </VStack>
  );
};

const FilterSection = ({ title, children, initialExpanded = false }) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const theme = useTheme();

  return (
    <VStack align="flex-start" spacing={2} w="100%">
      <HStack justify="space-between" w="100%">
        <Box fontSize="1.1em">{title}</Box>
        {expanded ? (
          <IconButton
            color={theme.colors.gray[500]}
            variant="ghost"
            size="sm"
            icon={<FiChevronDown />}
            onClick={() => setExpanded(false)}
          />
        ) : (
          <IconButton
            color={theme.colors.gray[500]}
            variant="ghost"
            size="sm"
            icon={<FiChevronRight />}
            onClick={() => setExpanded(true)}
          />
        )}
      </HStack>

      <Collapse in={expanded} style={{ width: "100%" }}>
        <Flex direction="column" w="100%" mb={2}>
          {children}
        </Flex>
      </Collapse>
    </VStack>
  );
};
