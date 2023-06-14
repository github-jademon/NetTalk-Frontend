import React, { useState } from "react";
import axios from "axios";
import { setInterceptor } from "assets/setInterceptor";

const CreateRoom = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const submit = async () => {
    const token = localStorage.getItem("token");
    setInterceptor(token);
    const body = {
      room: {
        title: title,
        comment: comment,
      },
      username: username,
    };
    console.log(body);
    const res = await axios
      .post(`/api/rooms`, body)
      .catch((error) => console.log(error));

    console.log(res);
    window.location = "/";
  };

  return (
    <div className="auth-container">
      <div id="form">
        <div className="title">채팅방생성</div>
        <form name="form">
          <div>
            <label name="title">채팅방 제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label name="comment">채팅방 설명</label>
            <input
              type="comment"
              id="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <label name="username">닉네임</label>
            <input
              type="username"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <input type="button" value="생성하기" onClick={() => submit()} />
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
