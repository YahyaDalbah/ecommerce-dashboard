import axios from "axios";
import React, { useState } from "react";
import { BASEURL } from "../../index.jsx";
import Loading from "../../pageSections/Loading.jsx";
import ErrorMessage from "../../UIcomponents/ErrorMessage.jsx";
import { Navigate } from "react-router-dom";

export default function RecoverPassword() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  async function sendCode(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("email")) {
      setErr("please provide your email");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${BASEURL}/auth/sendCode`,
        Object.fromEntries(formData)
      );
      setIsCodeSent(true);
      setErr("");
    } catch (err) {
      const data = err.response.data.err.split(":")[1];
      setErr(data);
    }
    setLoading(false);
  }
  async function changePassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get("email")) {
      setErr("please provide your email");
      return;
    }
    if (!formData.get("password")) {
      setErr("please provide your new password");
      return;
    }
    if (!formData.get("code")) {
      setErr("please provide the code");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${BASEURL}/auth/forgetPassword`,
        Object.fromEntries(formData)
      );

      setShouldRedirect(true);
    } catch (err) {
      const data = err.response.data.err.split(":")[1];
      setErr(data);
    }
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        <div className="mr-5">
          <h1 className="page-title">Recover user password</h1>
          <form onSubmit={isCodeSent ? changePassword : sendCode}>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {isCodeSent && (
              <>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  id={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <input type="text" name="code" id="code" placeholder="code" />
              </>
            )}
            {err && <ErrorMessage err={err} />}
            <button className="black-button">
              {isCodeSent ? "change password" : "send code"}
            </button>
            {shouldRedirect && (
              <Navigate replace={true} to="/recoverPassword/passwordChanged" />
            )}
          </form>
        </div>
      )}
    </>
  );
}
