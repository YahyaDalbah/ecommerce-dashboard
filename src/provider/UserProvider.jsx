import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASEURL } from "../index.jsx";
import { useAuth } from "./AuthProvider.jsx";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    role: "",
    confirmEmail: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  async function getUserData() {
    setLoading(true);
    try {
      const userPromise = axios.get(`${BASEURL}/user`);
      const categoryPromise = axios.get(`${BASEURL}/category`);
      
      const [user, categories] = (
        await Promise.all([userPromise, categoryPromise])
      ).map((res) => res.data);
      setUser(user);
      setCategories(categories);
      setSubCategories(
        categories.reduce(
          (acc, category) => acc.concat(category.subCategories.map(subCategory => ({...subCategory,categoryName: category.name}))),
          []
        )
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = "yahya__" + token;
      getUserData();
    } else {
      setUser({ email: "", userName: "", role: "", confirmEmail: "" });
      setCategories([]);
      setSubCategories([])
    }
  }, [token]);
  return (
    <UserContext.Provider
      value={{
        user,
        categories,
        setCategories,
        loading,
        subCategories,
        setSubCategories,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserContext);
}
