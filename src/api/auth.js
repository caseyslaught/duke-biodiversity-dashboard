import { PublicAPI } from "./index";

export const refreshToken = async () => {
  let currentUser = JSON.parse(localStorage.getItem("current_user"));
  if (!currentUser) return null;

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
