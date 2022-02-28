import { AiFillSound } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import { FaDna, FaHelicopter } from "react-icons/fa";

const style = {
  Acoustic: {
    color: "purple.600",
    colorScheme: "purple",
    icon: AiFillSound,
  },
  "Camera trap": {
    color: "green.600",
    colorScheme: "green",
    icon: BsFillCameraFill,
  },
  DNA: {
    color: "teal.600",
    colorScheme: "teal",
    icon: FaDna,
  },
  Drone: {
    color: "blue.600",
    colorScheme: "blue",
    icon: FaHelicopter,
  },
};

export default style;
