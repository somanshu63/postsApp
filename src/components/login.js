import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import baseurl from "../utils/constants";
import validate from "../utils/validate";
import Loading from "./loading";

function Login(props) {
  let errorsObj = {
    password: "",
    email: "",
  };
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(errorsObj);

  let handleInput = ({ target }) => {
    var { name, value } = target;
    validate(errors, name, value);

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    setErrors(errors);
  };
  let checkInput = () => {
    if (!email || !password) {
      errorsObj.email = "required email/password";
      setErrors(errorsObj);
    }
  };
  let login = () => {
    fetch(`${baseurl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          setLoading(false);
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        console.log(user);
        localStorage.setItem("userToken", JSON.stringify(user.user.token));
        props.handleLogIn(user.user);
        props.history.push("/");
      })
      .catch((errors) => {
        errorsObj.email = "invalid";
        setErrors(errorsObj);
      });
  };
  return (
    <>
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="login flex-col p-12 flex justify-center items-center">
          <h2 className="text-2xl p-2 blue">Login</h2>
          <div className="flex flex-row">
            <p className="text-red-500 text-lg">Don't have account?</p>
            <NavLink
              to="/signup"
              className={"text-green-500 text-xl underline px-2"}
            >
              Sign up
            </NavLink>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              checkInput();

              setLoading(true);
              login();
            }}
          >
            <span className="text-xs text-red-600 py-1">{errors.email}</span>
            <input
              placeholder="Enter Email"
              onChange={handleInput}
              className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
              type="text"
              name="email"
              value={email}
            ></input>
            <span className="text-xs text-red-600 py-1">{errors.password}</span>
            <input
              placeholder="Enter Password"
              onChange={handleInput}
              type="password"
              name="password"
              value={password}
              className="text-lg rounded-md w-70 py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900"
            ></input>
            <input
              className={`text-lg cursor-pointer rounded-md w-70 py-1 px-4 my-2 border-2 border-solid ${
                !email || !password
                  ? "border-red-500 text-red-500 bg-red-300"
                  : "border-green-700 text-green-700 bg-green-200"
              }`}
              type="submit"
              value="Login"
              disabled={!email || !password}
            ></input>
          </form>
        </div>
      )}
    </>
  );
}
export default withRouter(Login);
