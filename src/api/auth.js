import React from "react";

import { PublicAPI } from "./api";

export const useUser = () => {
  const [user, setUser] = React.useState("pending");

  React.useEffect(() => {
    const fetchUser = async () => {
      const currentUserStr = localStorage.getItem("current_user");
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        const millisDifference = new Date().getTime() - currentUser.lastRefresh;
        if (millisDifference >= currentUser.expiresIn * 1000) {
          const newUser = await refreshToken();
          setUser(newUser);
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export const getUser = () => {
  const currentUserStr = localStorage.getItem("current_user");
  if (currentUserStr) {
    const currentUser = JSON.parse(currentUserStr);
    const millisDifference = new Date().getTime() - currentUser.lastRefresh;
    if (millisDifference >= currentUser.expiresIn * 1000) {
      return refreshToken();
    } else {
      return currentUser;
    }
  }

  return null;
};

export const refreshToken = async () => {
  let currentUser = JSON.parse(localStorage.getItem("current_user"));

  try {
    const res = await PublicAPI.post("account/refresh/", {
      refresh: currentUser.refreshToken,
    });

    if (res.status === 200) {
      currentUser.accessToken = res.data.access_token;
      currentUser.lastRefresh = new Date().getTime();
      localStorage.setItem("current_user", JSON.stringify(currentUser));
      return currentUser;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};
