import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import baseurl from "../utils/constants";

function HeroProfile(props) {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUSer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(props);
    setUser(props.user);
    setCurrentUSer(props.currentUser);
  }, []);
  let followAuthor = () => {
    fetch(`${baseurl}/api/profiles/${user.username}/follow`, {
      method: user.following ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${currentUser.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("can't follow author");
        }
        return res.json();
      })
      .then((profile) => {
        setUser(profile.profile);
      })
      .catch((errors) => {
        setError(errors.error);
      });
  };
  let { username, email, bio, image } = props.user;
  return (
    <>
      <div className="bg-creme relative p-4 ">
        <div className="flex items-center flex-col justify-evenly ">
          <div className="flex items-center">
            <img
              className="w-16 rounded-3xl h-16"
              src={image}
              alt={username}
            ></img>
            <h1 className="blue text-3xl capitalize p-3">{username}</h1>
          </div>
          <a
            className="  text-xl p-3"
            href="/"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {email}
          </a>
          <p className="text-lg">{bio}</p>
        </div>
        {props.follow ? (
          <button
            onClick={followAuthor}
            className="absolute bottom-2 right-4 p-2 underline pink text-base"
          >
            {user.following ? "Unfollow" : "Follow"}
          </button>
        ) : (
          <NavLink
            to="/settings"
            className="absolute bottom-2 right-4 p-2 underline pink text-base"
          >
            Update settings
          </NavLink>
        )}
      </div>
    </>
  );
}

export default HeroProfile;
