import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const token = localStorage.getItem("token");

  const activeStyle = {
    color: "blue",
    fontSize: "1rem",
  };

  const defaultStyle = {
    color: "black",
    fontSize: "1rem",
  };

  useEffect(() => {
    // loadData();
    loadUser();
  }, []);

  const loadUser = async () => {
    if (localStorage.getItem("token")) {
      const response = await axios
        .get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((err) => console.log(err));
      if (response.data.statusCode !== 200) {
        if (response.data.responseMessage === "만료된 jWT 토큰입니다.") {
          localStorage.removeItem("token");
        } else {
          alert(response.data.responseMessage);
        }
      } else {
        console.log(response.data.data);
        console.log("userload1");
        setUser(response.data.data);
      }
    } else {
      setUser({
        username: "test",
        useremail: "test",
      });
    }
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
        {/* <li><NavLink exact to="/about" activeStyle={activeStyle}>소개</NavLink></li> */}
        {/* <li><NavLink to="/about/react" activeStyle={activeStyle}>React 소개</NavLink></li> */}
      </ul>
    </div>
  );
};

export default Header;
