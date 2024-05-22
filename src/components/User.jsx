import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider.jsx";
import axios from "axios";

function Logout() {
  const { setToken, setRefreshToken } = useAuth();
  return (
    <button
      onClick={() => {
        setToken();
        setRefreshToken();
      }}
    >
      Logout
    </button>
  );
}

function Login() {
  const [err, setErr] = useState("");
  const { setToken, setRefreshToken } = useAuth();

  async function logIn(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecommerce-api-three-drab.vercel.app/auth/login",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        }
      );
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    } catch (err) {
      if (err.response.data.message) {
        setErr(err.response.data.err);
      }
    }
  }

  return (
    <form className="" onSubmit={logIn}>
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="text" name="password" id="password" placeholder="password" />
      {err && <p className="text-red-500">{err}</p>}
      <button>Login</button>
    </form>
  );
}
function Signup() {
  const [err, setErr] = useState("");
  const { setToken, setRefreshToken } = useAuth();

  async function signUp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post(
        "https://ecommerce-api-three-drab.vercel.app/auth/signup",
        Object.fromEntries(formData)
      );
      // setToken(res.data.accessToken);
      // setRefreshToken(res.data.refreshToken);
      console.log(res.data);
    } catch (err) {
      if (err.response.data.message) {
        setErr(err.response.data.err);
      }
      console.log(err);
    }
  }

  return (
    <form className="" onSubmit={signUp}>
      <input type="text" name="userName" id="userName" placeholder="username" />
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="text" name="password" id="password" placeholder="password" />
      <input
        type="text"
        name="cPassword"
        id="cPassword"
        placeholder="confirm password"
      />
      <select name="role" id="role">
        <option value="">select your role</option>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      {err && <p className="text-red-500">{err}</p>}
      <button>Signup</button>
    </form>
  );
}
function UserForm({ children, method }) {
  const [err, setErr] = useState("");
  const { setToken, setRefreshToken } = useAuth();

  async function doMethod(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await axios.post(
        `https://ecommerce-api-three-drab.vercel.app/auth/${method}`,
        Object.fromEntries(formData)
      );
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    } catch (err) {
      if (err.response.data.message) {
        if (err.response.data.err.includes("cPassword")) {
          setErr("confirm your password");
        } else {
          
          setErr(err.response.data.err);
        }
      }
    }
  }

  return (
    <form className="my-10 mx-5" onSubmit={doMethod}>
      {children}
      {err && <p className="text-red-500">{err}</p>}
      <button>{method === "login" ? "Login" : "Signup"}</button>
    </form>
  );
}

export default function User() {
  const { token } = useAuth();
  return (
    <div>
      <p></p>
      {token ? (
        <Logout />
      ) : (
        <>
          <UserForm method={"login"}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
            />
          </UserForm>
          <UserForm method={"signup"}>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="username"
            />
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
            />
            <input
              type="text"
              name="cPassword"
              id="cPassword"
              placeholder="confirm password"
            />
            <select
              className="block my-2 border border-black outline-none"
              name="role"
              id="role"
            >
              <option value="">select your role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </UserForm>
        </>
      )}
    </div>
  );
}
