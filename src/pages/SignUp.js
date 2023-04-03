import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordck, setPasswordck] = useState("");
  const [valid_email, setValidEmail] = useState("");
  const [valid_userid, setValidUserid] = useState("");
  const [valid_password, setValidPassword] = useState("");

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

    if (res.data.responseMessage) {
      alert(res.data.responseMessage);
    } else {
      setValidEmail(res.data.valid_email);
      setValidPassword(res.data.valid_password);
      setValidUserid(res.data.valid_userid);
    }

    console.log(res);
  };

  return (
    <div className="auth-container">
      <div id="form">
        <div className="title">회원가입</div>
        <form name="form">
          <div>
            <label name="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {valid_email ? (
              <span className="valid-ck">{valid_email}</span>
            ) : null}
          </div>
          <div>
            <label name="userid">아이디</label>
            <input
              type="text"
              id="userid"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
            />
            {valid_userid ? (
              <span className="valid-ck">{valid_userid}</span>
            ) : null}
          </div>
          <div>
            <label name="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {valid_password ? (
              <span className="valid-ck">{valid_password}</span>
            ) : null}
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
    </div>
  );
};

export default SignUp;
