import React, { useState } from "react";
import { FiChevronDown, FiChevronRight, FiGlobe } from "react-icons/fi";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Collapse,
  Flex,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  VStack,
  useTheme,
} from "@chakra-ui/react";

const categories = ["Birds", "Insects", "Mammals", "Plants"];
const layers = ["Floor", "Understory", "Canopy", "Emergent"];
const methods = ["Acoustic", "Camera trap", "DNA", "Drone"];

export default function Filters() {
  const [display, setDisplay] = useState("highlights");

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
      <FilterSection title="Display">
        <RadioGroup value={display} onChange={setDisplay}>
          <VStack spacing={2} align="flex-start" ps={1}>
            <Radio value="heatmap">Heatmap</Radio>
            <Radio value="highlights">Highlights</Radio>
          </VStack>
        </RadioGroup>
      </FilterSection>
      <FilterSection title="Filters">
        <FilterCheckboxes title="Category" defaultValues={categories}>
          {categories.map((cat) => (
            <Checkbox key={cat} value={cat}>
              {cat}
            </Checkbox>
          ))}
        </FilterCheckboxes>
        <FilterCheckboxes title="Collection method" defaultValues={methods}>
          {methods.map((method) => (
            <Checkbox key={method} value={method}>
              {method}
            </Checkbox>
          ))}
        </FilterCheckboxes>
        <FilterCheckboxes title="Forest layer" defaultValues={layers}>
          {layers.map((layer) => (
            <Checkbox key={layer} value={layer}>
              {layer}
            </Checkbox>
          ))}
        </FilterCheckboxes>
      </FilterSection>
    </VStack>
  );
}

const FilterCheckboxes = ({ title, defaultValues, children }) => {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  return (
    <VStack align="flex-start" spacing={3} w="100%">
      <Flex align="center" justify="space-between" w="100%">
        <HStack align="center" spacing={2}>
          <FiGlobe color={theme.colors.gray[500]} /> <Box>{title}</Box>
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
        <CheckboxGroup defaultValue={defaultValues}>
          <VStack align="flex-start" ps={3} mb={2} w="100%">
            {children}
          </VStack>
        </CheckboxGroup>
      </Collapse>
    </VStack>
  );
};

const FilterSection = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);
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
