import { useEffect, useState } from "react";

import { ProtectedAPI } from "../api";

const useUser = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProtectedAPI.get("account/get_account");
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        setUser(null);
      }
    }

    fetchData();
  });

  return [user, setUser];
};

export default useUser;
