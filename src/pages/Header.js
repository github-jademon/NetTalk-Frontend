import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  const defaultStyle = {
    color: "black",
    fontSize: "1rem",
  };

  return (
    <div>
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
        {/* <li><NavLink exact to="/about" activeStyle={activeStyle}>소개</NavLink></li> */}
        {/* <li><NavLink to="/about/react" activeStyle={activeStyle}>React 소개</NavLink></li> */}
      </ul>
    </div>
  );
};

export default Header;
