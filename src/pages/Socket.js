import React, { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import Loader from "./Loader";

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [check, setCheck] = useState(false);
  const [socket, setSocket] = useState(false);
  const [name, setName] = useState();
  const [uuid, setUuid] = useState(localStorage.getItem("uuid"));
  const scrollRef = useRef();
  const client = useRef({});

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   setUuid(localStorage.getItem("token"));
    // } else
    if (uuid === null) {
      localStorage.setItem("uuid", uuidv4());
      setUuid(localStorage.getItem("uuid"));
    }
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    if (check) {
      try {
        space();
      } catch (e) {
        console.log(e);
      }
    }
  }, [messages]);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/stomp/chat"),
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        setSocket(true);
        client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
          console.log(body);
          setMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
        });
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const onOpen = () => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat/enter",
      body: JSON.stringify({
        roomId: roomId,
        type: "system",
        name: name,
      }),
    });
    setCheck(true);
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
      client.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({
          roomId: roomId,
          type: "user",
          name,
          uuid: uuid, // 사용자 로그인시 uuid 고정 음 이메일 암호화 해야하나...
          message,
          date: new Date().toLocaleString(),
        }),
      });

      setMessage("");
    }
  };

  const space = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  return !check ? (
    <div className="input-modal">
      {!socket ? (
        <Loader />
      ) : (
        <div className="input-name-container">
          <div className="title">이름!</div>
          <div className="input-name">
            <input
              type="text"
              id="message"
              className="input-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  onOpen();
                }
              }}
            ></input>
            <input type="button" value="확인" onClick={onOpen} />
          </div>
        </div>
      )}
    </div>
  ) : (
    <>
      <div className="talk room" ref={scrollRef}>
        {messages.map((v, i) => (
          <div
            key={i}
            className={
              v.uuid === uuid
                ? "user"
                : v.type === "system"
                ? "system"
                : "partner"
            }
          >
            {v.type === "user" ? <div className="info">{v.name}</div> : null}
            <div className="text">{v.message}</div>
            {v.type === "system" ? null : <div className="date">{v.date}</div>}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          id="message"
          className="input-text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
