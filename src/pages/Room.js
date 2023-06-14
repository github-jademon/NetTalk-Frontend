import React, { useState, useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useParams } from "react-router";
import { Loader } from "pages";
import axios from "axios";
import { setInterceptor } from "assets/setInterceptor";

const Room = () => {
  const params = useParams();
  const roomId = params.id;
  const client = useRef({});
  const scrollRef = useRef();
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState();
  const [check, setCheck] = useState(false);
  const [socket, setSocket] = useState(false);
  const [owner, setOwner] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [uuid, setUuid] = useState();

  useEffect(() => {
    if (uuid == null) {
      return;
    }
    connect();

    return () => disconnect();
  }, [uuid]);

  useEffect(() => {
    console.log(messages);
    if (check) {
      try {
        space();
      } catch (e) {
        console.log(e);
      }
    }
  }, [messages, check]);

  useEffect(() => {
    if (!chatMessages) return;
    setMessages(chatMessages);
  }, [chatMessages]);

  const connect = () => {
    if (uuid == null) {
      return;
    }

    client.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("/stomp/chat"),
      debug: function (str) {
        console.log(str);
      },
      onConnect: () => {
        setSocket(true);
        if (chatMessages) setCheck(true);
        client.current.subscribe(
          `/sub/chat/room/${roomId}`,
          async ({ body }) => {
            console.log(body);
            setMessages((_chatMessages) => [
              ..._chatMessages,
              JSON.parse(body),
            ]);
            console.log(messages);
          }
        );
      },
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
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
          username: name,
          uuid: uuid,
          message,
          date: new Date().toLocaleString(),
        }),
      });

      setMessage("");
    }
  };

  useEffect(() => {
    if (!data) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem("token");

    setInterceptor(token);

    const response = await axios
      .get(`/api/rooms/${roomId}`)
      .catch((err) => console.log(err));

    console.log(response.data);

    setData(response.data.room);
    setChatMessages(response.data.messages);

    if (response.data.user) {
      setOwner(response.data.user.owner === "true" ? true : false);
      setUuid(response.data.user.email);
      setName(response.data.user.name);
    }

    if (response.data.user == null) {
      localStorage.setItem("uuid", uuidv4());
      setUuid(localStorage.getItem("uuid"));
    }
  };

  const onChangeName = async () => {
    const body = {
      email: uuid,
      name: name,
    };

    axios
      .post(`/api/rooms/${roomId}/name`, body)
      .catch((err) => console.log(err));

    setChangeName(false);
  };

  const onDelete = async () => {
    if (
      !window.confirm("정말 " + (owner ? "삭제하" : "나가") + "시겠습니까?")
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    setInterceptor(token);

    client.current.publish({
      destination: "/pub/chat/exit",
      body: JSON.stringify({
        roomId: roomId,
        type: "system",
        username: name,
      }),
    });

    const response = await axios
      .delete(`/api/rooms/${roomId}`)
      .catch((err) => console.log(err));

    console.log("!!!!!!!!!!!!!!!!!!!!!", response.data);
    window.location = "/";
  };

  const onOpen = async () => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat/enter",
      body: JSON.stringify({
        roomId: roomId,
        type: "system",
        username: name,
      }),
    });

    onChangeName();

    setCheck(true);
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

  return data ? (
    <div className="container room">
      <div className="room-header">
        <div className="title">
          {roomId}. {data.title}
        </div>
        <div>
          <input
            type="button"
            value="이름 변경"
            onClick={() => setChangeName(true)}
          />
          <input
            type="button"
            value={owner === true ? "삭제" : "나가기"}
            onClick={onDelete}
          />
        </div>
      </div>
      <div>{data.comment}</div>
      <hr />
      {!check ? (
        <div className="input-modal">
          {!socket || chatMessages ? (
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
                />
                <input type="button" value="확인" onClick={onOpen} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {changeName ? (
            <div className="input-modal">
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
                        onChangeName();
                      }
                    }}
                  />
                  <input type="button" value="확인" onClick={onChangeName} />
                  <input
                    type="button"
                    value="취소"
                    onClick={() => setChangeName(false)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="talk room" ref={scrollRef}>
                {messages ? (
                  <>
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
                        {v.type === "user" ? (
                          <div className="info">{v.username}</div>
                        ) : null}
                        <div className="text">{v.message}</div>
                        {v.type === "system" ? null : (
                          <div className="date">{v.date}</div>
                        )}
                      </div>
                    ))}
                  </>
                ) : null}
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
          )}
        </>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Room;
