import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("account/auth_test");
        if (res.status === 200) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    }

    fetchData();
  }, []);

  return [authenticated, setAuthenticated];
};

export default useAuthenticated;
