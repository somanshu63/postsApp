import React from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "./userContext";

class Header extends React.Component {
  static contextType = userContext;

  render() {
    const user = this.context.user;
    return (
      <div className="py-2 px-4 flex justify-between items-center bg-blue">
        <h2 className="text-xl pink">Blog App</h2>
        <nav className="flex items-center">
          <NavLink
            activeClassName="active"
            to={"/"}
            exact
            className="capitalize hover:scale-125 text-white text-base mx-4"
          >
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink
                activeClassName="active"
                to="/new-post"
                className="capitalize hover:scale-125 text-white text-base mx-4"
              >
                New Article
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/settings"
                className="capitalize hover:scale-125 text-white text-base mx-4"
              >
                Settings
              </NavLink>
              <NavLink
                activeClassName="active"
                to={`/profiles/${user.username}`}
                className="capitalize hover:scale-125 creme  text-base mx-4"
              >
                {user.username}
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => {
                  localStorage.removeItem("userToken");
                  this.props.handleLogIn(null);
                }}
                className="cursor-pointer capitalize hover:scale-125 text-white text-base mx-4"
              >
                logout
              </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink
                activeClassName="active"
                to="/login"
                className="capitalize hover:scale-125 text-white text-base mx-4"
              >
                login
              </NavLink>
              <NavLink
                activeClassName="active"
                to={"/signup"}
                className="capitalize hover:scale-125 text-white text-base mx-4"
              >
                signup
              </NavLink>
            </>
          )}
        </nav>
      </div>
    );
  }
}

export default Header;
