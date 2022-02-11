import React from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Login from "../../components/Login";
import Sidebar from "../../components/Sidebar";

import useAuthenticated from "../../hooks/useAuthenticated";

export default function MainLayout() {
  const [authenticated, setAuthenticated] = useAuthenticated();

  return (
    <Flex h="100%">
      <Login isOpen={!authenticated} setAuthenticated={setAuthenticated} />
      <Sidebar setAuthenticated={setAuthenticated} />
      <Outlet context={[authenticated]} />
    </Flex>
  );
}
