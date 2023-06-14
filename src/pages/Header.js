import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = {
    color: "#28C7F7",
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

  return (
    <div className="header">
      <div>
        <span>
          <NavLink
            to="/"
            className="logo"
            style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
          >
            <img src={`${process.env.PUBLIC_URL}/nettalk.png`} alt="nettalk" />
            <span className="logo-text1">Net</span>
            <span className="logo-text2">Talk</span>
          </NavLink>
        </span>
        {token ? (
          <ul>
            <li>
              <NavLink
                to="/createRoom"
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                채팅방생성
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypage"
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                마이페이지
              </NavLink>
            </li>
            <li>
              <div className="logout" onClick={() => logout()}>
                로그아웃
              </div>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink
                to="/signin"
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                로그인
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                style={({ isActive }) =>
                  isActive ? activeStyle : defaultStyle
                }
              >
                회원가입
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
