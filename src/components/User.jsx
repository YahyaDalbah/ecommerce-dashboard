import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider.jsx";
import axios from "axios";
import Loading from "../pageSections/Loading.jsx";
import { Link } from "react-router-dom";
import { BASEURL } from "../index.jsx";
import ErrorMessage from "../UIcomponents/ErrorMessage.jsx";

function Logout() {
  const { token, setToken, setRefreshToken } = useAuth();
  const [loading, setLoading] = useState(false); 
  const [user, setUser] = useState("");

  useEffect(() => {
    setLoading(true);
    if (token) axios.defaults.headers.common["token"] = "yahya__" + token;
    axios
      .get(`${BASEURL}/user`)
      .then((user) => {
        setLoading(false);
        setUser(user.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }, [token, setLoading]);
  return (
    <div>
      {!loading ? (
        <>
          <div>
            <h1 className="page-title">the user page with his data</h1>
            <p>email: {user.email}</p>
            <p>name: {user.userName}</p>
            <p>role: {user.role}</p>
            <p>is email confirmed: {user.confirmEmail ? "yes" :"no"}</p>
          </div>
          <button
            className="black-button"
            onClick={() => {
              setToken();
              setRefreshToken();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}
    </div>
  );
}
function UserForm({ children, method }) {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState();
  const { setToken, setRefreshToken } = useAuth();

  async function doMethod(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASEURL}/auth/${method}`,
        Object.fromEntries(formData)
      );
      setToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      setLoading(false);
    } catch (err) {
      if (err.response.data.message) {
        if (err.response.data.err.includes("cPassword")) {
          setErr("confirm your password");
        } else {
          setErr(err.response.data.err);
        }
        setLoading(false);
      }
    }
  }

  return (
    <>
      <form className="my-10 mr-5" onSubmit={doMethod}>
        {children}
        {err && <ErrorMessage err={err} />}
        {method === "login" && <Link className="text-blue-400 block" to={"/recoverPassword"}>forgot password?</Link>}
        <button className="black-button">
          {method === "login" ? "Login" : "Signup"}
        </button>
        {loading && <Loading />}
      </form>
    </>
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
          <h1 className="page-title">
            login / signup (each form works dependently)
          </h1>

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
