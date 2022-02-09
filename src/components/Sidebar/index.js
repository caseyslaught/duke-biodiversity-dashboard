import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import { FiActivity, FiList, FiMap, FiMoon } from "react-icons/fi";

import Logo from "../../assets/images/duke.png";

export default function Sidebar() {
  const linkConfig = {
    mb: "30px",
    _activeLink: { color: "blue.700" },
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      h="100%"
      w="80px"
      p={4}
      background="white"
      color="gray.400"
      fontSize="2.8em"
      boxShadow="md"
    >
      <Flex direction="column" align="center">
        <Link as={NavLink} to="/">
          <Image src={Logo} alt="Duke logo" mb="60px" />
        </Link>
        <Link as={NavLink} to="/activity" {...linkConfig}>
          <FiList />
        </Link>
        <Link as={NavLink} to="/map" {...linkConfig}>
          <FiMap />
        </Link>
        <Link as={NavLink} to="/metrics" {...linkConfig}>
          <FiActivity />
        </Link>
      </Flex>

      <Box visibility="hidden">
        <FiMoon />
      </Box>
    </Flex>
  );
}
