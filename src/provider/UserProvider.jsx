import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASEURL } from "../index.jsx";
import { useAuth } from "./AuthProvider.jsx";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  async function getUserData() {
    setLoading(true)
    try {
      const user = (await axios.get(`${BASEURL}/user`)).data;
      setUser(user);
    } catch (err) {
      console.error(err);
    }
    setLoading(false)
  }
  useEffect(() => {
    if (token) axios.defaults.headers.common["token"] = "yahya__" + token;
    getUserData();
  }, [token]);
  return <UserContext.Provider value={{user,loading}}>{children}</UserContext.Provider>;
}

export function useUserData() {
  return useContext(UserContext);
}
