import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = "yahya__" + token;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      //only when user logs out
      delete axios.defaults.headers.common["token"];
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }, [token, refreshToken]);
  async function refreshAccessToken() {
    try {
      const response = await axios.post(
        "https://ecommerce-api-three-drab.vercel.app/auth/refresh",
        { refreshToken: localStorage.getItem("refreshToken") }
      );
      setToken(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 1000 * 60 * 60); //ms * s * m
      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  const contextValue = useMemo(
    //only change when component rerenders, this component only rerenders when token changes but this is a good practise
    () => ({
      token,
      setToken,
      refreshToken,
      setRefreshToken,
      loading,
      setLoading,
    }),
    [token, refreshToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
