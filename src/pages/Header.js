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

  // const loadData = async () => {
  //   if (token) {
  //     const response = await axios
  //       .get("/api/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .catch((err) => console.log(err));
  //     console.log(response.data);
  //     setUser(response.data);
  //   }
  // };
  const loadUser = async () => {
    const response = await axios
      .get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    if (response.data.statusCode !== 200) {
      alert(response.data.responseMessage);
    } else {
      console.log(response.data.data);
      console.log("userload");
      setUser(response.data.data);
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
