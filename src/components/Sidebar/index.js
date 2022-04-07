import React from "react";
import { NavLink } from "react-router-dom";
import { Flex, IconButton, Image, Link } from "@chakra-ui/react";
import { FiActivity, FiList, FiLogOut, FiMap } from "react-icons/fi";

import Logo from "../../assets/images/duke.png";

export default function Sidebar({ setAuthenticated }) {
  const linkConfig = {
    mb: "30px",
    _activeLink: { color: "blue.700" },
  };

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      direction="column"
      align="center"
      justify="space-between"
      h="100%"
      w="80px"
      p={4}
      background="white"
      color="gray.400"
      fontSize="5xl"
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
        <Link as={NavLink} to="/report" {...linkConfig}>
          <FiActivity />
        </Link>
      </Flex>

      <IconButton
        variant="ghost"
        fontSize="3xl"
        icon={<FiLogOut />}
        onClick={() => {
          localStorage.clear();
          setAuthenticated(false);
        }}
      />
    </Flex>
  );
}
