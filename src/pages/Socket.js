import React, { useCallback, useRef, useState, useEffect } from "react";

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chkLog, setChkLog] = useState(false); // 첫실행시
  const [socketData, setSocketData] = useState();
  const [uuid, setUuid] = useState();
  const scrollRef = useRef();
  const ws = useRef(null);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

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
    setUuid(uuidv4());
  }, []);

  useEffect(() => {
    if (socketData !== undefined) {
      loadData();
    }
  }, [socketData]);

  const loadData = async () => {
    const tempData = messages.concat(socketData);
    // console.log(tempData);
    await setMessages(tempData);
    space();
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:8080/ws/chat");

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const onText = (e) => {
    setMessage(e.target.value);
  };

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }

    if (message !== "") {
      const data = {
        roomId: roomId,
        name,
        uuid,
        type: "user",
        message,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          const data = {
            roomId: roomId,
            type: "system",
            name: "system",
            message: name + "님이 입장하셨습니다",
          };
          const temp = JSON.stringify(data);
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("message").focus();
      return;
    }
    setMessage("");
  });

  const space = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <input
        disabled={chkLog}
        placeholder="이름을 입력하세요."
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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
