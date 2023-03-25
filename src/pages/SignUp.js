import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    const body = {
      email: email,
      userid: userid,
      password: password,
    };
    console.log(body);
    axios
      .post(`/auth/signup`, body)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(body);
  }

  return (
    <div>
      <form name="form">
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          id="userid"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="button" value="회원가입" onClick={() => submit()} />
      </form>
      <li>
        <NavLink to="/signup">이미 회원이신가요? 로그인</NavLink>
      </li>
      <li>
        <NavLink to="/password">비밀번호를 잊으셨나요? 비밀번호변경</NavLink>
      </li>
    </div>
  );
};

export default SignUp;
