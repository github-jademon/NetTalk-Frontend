import React, { useCallback, useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const Chat = ({ roomId, uuid, name }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [check, setCheck] = useState(true);
  const scrollRef = useRef();
  const client = useRef({});

  const msgBox = messages.map((v, i) => (
    <div
      key={i}
      className={
        v.uuid === uuid ? "user" : v.type === "system" ? "system" : "partner"
      }
    >
      {v.type === "user" ? <div className="info">{v.name}</div> : null}
      <div className="text">{v.message}</div>
      {v.type === "system" ? null : <div className="date">{v.date}</div>}
    </div>
  ));

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  useEffect(() => {
    space();
  }, [messages]);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/stomp/chat"),
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        if (check) {
          onOpen();
          setCheck(false);
        }
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
          uuid, // 사용자 로그인시 uuid 고정 음 이메일로 할까..?
          message,
          date: new Date().toLocaleString(),
        }),
      });

      setMessage("");
    }
  };

  const onText = (e) => {
    setMessage(e.target.value);
  };

  const space = () => {
    console.log(scrollRef.current.scrollHeight + "px");
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
