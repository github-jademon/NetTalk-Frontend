import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/" activeStyle={activeStyle}>
            홈
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signin" activeStyle={activeStyle}>
            로그인
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signup" activeStyle={activeStyle}>
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
