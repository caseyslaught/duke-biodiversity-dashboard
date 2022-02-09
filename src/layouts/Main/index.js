import React from "react";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <Flex h="100%">
      <Sidebar />
      <Outlet />
    </Flex>
  );
}
