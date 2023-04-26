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

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return token ? (
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
            to="/mypage"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            마이페이지
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/createRoom"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            채팅방생성
          </NavLink>
        </li>
        <li>
          <div className="logout" onClick={() => logout()}>
            로그아웃
          </div>
        </li>
      </ul>
    </div>
  ) : (
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
