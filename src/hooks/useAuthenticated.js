import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("account/auth_test");
        if (res.status === 200) {
          if (!authenticated) setAuthenticated(true);
        }
      } catch (error) {
        if (authenticated) setAuthenticated(false);
      }
    }

    // see if we can skip this if false...running 2x initially
    // use ref or something
    fetchData();
  });

  return [authenticated, setAuthenticated];
};

export default useAuthenticated;
