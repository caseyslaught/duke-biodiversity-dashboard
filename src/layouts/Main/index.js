import React from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Login from "../../components/Login";
import Sidebar from "../../components/Sidebar";

export default function MainLayout({ authenticated, setAuthenticated }) {
  return (
    <Flex h="100%" pl="80px">
      <Login isOpen={!authenticated} setAuthenticated={setAuthenticated} />
      <Sidebar setAuthenticated={setAuthenticated} />
      <Outlet context={[authenticated]} />
    </Flex>
  );
}
