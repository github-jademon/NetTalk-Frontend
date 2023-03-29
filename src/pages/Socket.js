import React, { useEffect, useState } from "react";

const Socket = ({ username, useremail }) => {
  const [message, setMessage] = useState("");
  const socket = new WebSocket("ws://localhost:8080/ws/chat");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    openSocket();
  }, []);

  const openSocket = () => {
    console.log("open");
    socket.onmessage = onMessage;
    socket.onopen = onOpen;
    socket.onclose = onClose;
  };

  const sendMessage = () => {
    var str = username + " : " + message;

    console.log(str);
    socket.send(
      JSON.stringify({
        type: "user",
        useremail,
        username,
        message,
      })
    );
    setMessage("");
  };

  const onClose = (e) => {
    socket.send(
      JSON.stringify({
        type: "system",
        useremail: "system",
        username: "system",
        message: username + "님이 퇴장하셨습니다.",
      })
    );
  };

  const onOpen = (e) => {
    console.log("????????");
    socket.send(
      JSON.stringify({
        type: "system",
        useremail: "system",
        username: "system",
        message: username + "님이 입장하셨습니다.",
      })
    );
    console.log("????????");
  };

  const onMessage = (msg) => {
    var {
      type,
      useremail: senderUseremail,
      username: senderUsername,
      message,
    } = JSON.parse(msg.data);

    setMessages((messages) => {
      return [
        ...messages,
        {
          me: senderUseremail === useremail,
          type,
          useremail: senderUseremail,
          message,
          username: senderUsername,
        },
      ];
    });

    console.log(messages);
  };
  return (
    <>
      <div className="talk" id="talk">
        {messages.map((v, i) => {
          return (
            <div
              key={i}
              className={
                v.me ? "user" : v.type === "system" ? "system" : "partner"
              }
            >
              {v.type === "system" ? (
                ""
              ) : (
                <div className="info">{v.username}</div>
              )}
              {/* <div className="info">{v.email}</div> */}
              <div className="text">{v.message}</div>
            </div>
          );
        })}
      </div>
      <div className="input">
        <input
          type="text"
          className="input-text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input type="button" value="보내기" onClick={() => sendMessage()} />
      </div>
    </>
  );
};

export default Socket;
