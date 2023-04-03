import React, { useCallback, useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const Chat = ({ roomId, uuid, name }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const client = useRef(null);

  const msgBox = messages.map((v, i) => (
    <div
      key={i}
      className={
        v.uuid === uuid ? "user" : v.type === "system" ? "system" : "partner"
      }
    >
      {v.type === "user" ? <div className="info">{v.name}</div> : null}
      <div className="text">{v.message}</div>
      {v.type === "system" ? null : <div>{i.date}</div>}
    </div>
  ));

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("/stomp/chat"),
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
          console.log(body);
          setMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
          space();
        });
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();

    // onOpen();
  };

  const onOpen = () => {
    const data = JSON.stringify({
      roomId: roomId,
      type: "system",
      name: "system",
      // message: name + "님이 입장하셨습니다",
    });
    client.current.publish("/pub/chat/enter", {}, data);
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const send = () => {
    if (!client.current.connected) {
      return;
    }

    if (message === "") {
      alert("메세지를 입력하세요.");
      document.getElementById("message").focus();
      return;
    } else {
      const data = JSON.stringify({
        roomId: roomId,
        type: "user",
        name,
        uuid, // 사용자 로그인시 uuid 고정 음 이메일로 할까..?
        message,
        date: new Date().toLocaleString(),
      });

      client.current.publish({
        destination: "/pub/chat/message",
        body: data,
      });

      setMessage("");
    }
  };

  const onText = (e) => {
    setMessage(e.target.value);
  };

  const space = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div className="talk room" ref={scrollRef}>
        {msgBox}
      </div>
      <div className="input">
        <input
          type="text"
          id="message"
          className="input-text"
          value={message}
          onChange={onText}
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              send();
            }
          }}
        ></input>
        <input type="button" value="보내기" onClick={send} />
      </div>
    </>
  );
};

export default Chat;
