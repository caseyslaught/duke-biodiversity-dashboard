import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { extendTheme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import "mapbox-gl/dist/mapbox-gl.css";

import App from "./App";

const config = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "html, body": {
        height: "100vh",
        background: "gray.50",
      },
      "#root": {
        height: "100%",
      },
    },
  },
  shadows: {
    outline: "0",
  },
};

const theme = extendTheme(config);

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <ColorModeScript initialColorMode={config.initialColorMode} />
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
