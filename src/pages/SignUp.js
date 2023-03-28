import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordck, setPasswordck] = useState("");

  const submit = async () => {
    const body = {
      email: email,
      userid: userid,
      password: password,
      passwordck: passwordck,
    };
    console.log(body);
    const res = await axios
      .post(`/auth/signup`, body)
      .catch((error) => console.log(error));

    alert(res.data.responseMessage);
    console.log(res);
  };

  return (
    <div className="container">
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
          <label name="userid">아이디</label>
          <input
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
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
        <div>
          <label name="passwordck">비밀번호확인</label>
          <input
            type="password"
            id="passwordck"
            value={passwordck}
            onChange={(e) => setPasswordck(e.target.value)}
          />
        </div>
        <input type="button" value="회원가입" onClick={() => submit()} />
      </form>
      <li>
        <NavLink to="/signin">이미 회원이신가요? 로그인</NavLink>
      </li>
      <li>
        <NavLink to="/password">비밀번호를 잊으셨나요? 비밀번호변경</NavLink>
      </li>
    </div>
  );
};

export default SignUp;
