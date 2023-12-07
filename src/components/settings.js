import React, { useContext, useEffect, useState } from "react";
import baseurl from "../utils/constants";
import validate from "../utils/validate";
import { userContext } from "./userContext";

function Settings(props) {
  let context = useContext(userContext);

  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let { image, username, bio, email } = context.user;
    setImageUrl(image);
    setUsername(username);
    setBio(bio);
    setEmail(email);
  }, []);
  let handleInput = ({ target }) => {
    let { name, value } = target;
    if (name === "email") {
      validate(error, name, value);
    }

    if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "imageUrl") {
      setImageUrl(value);
    } else if (name === "bio") {
      setBio(value);
    } else if (name === "error") {
      setError(value);
    }
  };
  let updateDetails = () => {
    let Password = password ? `password: password` : "";
    fetch(`${baseurl}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${context.user.token}`,
      },
      body: JSON.stringify({
        user: {
          image: imageUrl,
          username: username,
          bio: bio,
          email: email,
          Password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then((user) => {
        props.updateUser(user.user);
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let formControlClass =
    "text-lg rounded-md w-full py-1 px-4 my-2 border-2 border-solid border-blue-900 text-blue-900";
  return (
    <div className="bg-creme pb-32">
      <h2 className="capitalize text-2xl text-center p-4 blue ">add article</h2>
      <div className="text-center mx-auto w-2/5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            validate(error, email, password);
            if (error) {
              return setError("check email");
            }
            updateDetails();
          }}
        >
          <input
            placeholder="Enter profile picture URL"
            onChange={handleInput}
            className={formControlClass}
            type="text"
            name="imageURL"
            value={imageUrl}
          ></input>
          <input
            placeholder="Enter username"
            onChange={handleInput}
            className={formControlClass}
            type="text"
            name="username"
            value={username}
          ></input>
          <input
            placeholder="Enter email"
            onChange={handleInput}
            className={formControlClass}
            type="email"
            name="email"
            value={email}
          ></input>
          <textarea
            placeholder="Enter bio"
            onChange={handleInput}
            className={formControlClass}
            name="bio"
            value={bio}
            rows={3}
          ></textarea>
          <input
            placeholder="Enter new password"
            onChange={handleInput}
            className={formControlClass}
            type="password"
            name="password"
            value={password}
          ></input>
          <input
            type="submit"
            value="Update Details"
            className="text-lg rounded-md w-full py-1 px-4 bg-blue-300 blue my-2 border-2 border-solid border-blue-900 text-blue-900"
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Settings;
