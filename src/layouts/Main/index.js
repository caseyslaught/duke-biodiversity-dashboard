import React from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Login from "../../components/Login";
import Sidebar from "../../components/Sidebar";

export default function MainLayout() {
  return (
    <Flex h="100%">
      <Login isOpen={true} />
      <Sidebar />
      <Outlet />
    </Flex>
  );
}
