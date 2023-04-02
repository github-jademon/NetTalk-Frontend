import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const body = {
      email: email,
      password: password,
    };
    const res = await axios
      .post(`/auth/login`, body)
      .catch((error) => console.log(error));

    alert(res.data.responseMessage);
    console.log(res);
    if (res.data.data.token.accessToken) {
      localStorage.setItem("token", res.data.data.token.accessToken);
    }
  };

  return (
    <div className="auth-container">
      <form name="form">
        <div>
          <label name="email">이메일</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label name="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="button" value="로그인" onClick={() => submit()} />
      </form>
      <li>
        <NavLink to="/signup">아직 회원이 아니신가요? 회원가입</NavLink>
      </li>
      <li>
        <NavLink to="/password">비밀번호를 잊으셨나요? 비밀번호변경</NavLink>
      </li>
    </div>
  );
};

export default SignIn;
