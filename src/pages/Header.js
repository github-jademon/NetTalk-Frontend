import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const token = localStorage.getItem("token");
  const [check, setCheck] = useState(true);

  const activeStyle = {
    color: "blue",
    fontSize: "1rem",
  };

  const defaultStyle = {
    color: "black",
    fontSize: "1rem",
  };

  useEffect(() => {
    if (check) {
      loadUser();
      setCheck(false);
    }
  }, []);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

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
        localStorage.setItem("uuid", uuidv4());
      } else {
        console.log(response.data.data);
        setUser(response.data.data);
        localStorage.setItem("uuid", user.email);
      }
    } else {
      localStorage.setItem("uuid", uuidv4());
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
      </ul>
    </div>
  );
};

export default Header;
