import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = {
    color: "blue",
    fontSize: "1rem",
  };

  const defaultStyle = {
    color: "black",
    fontSize: "1rem",
  };

  return (
    <div className="header">
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signin"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            로그인
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            회원가입
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
