import React, { useCallback, useRef, useState, useEffect } from "react";

const Chat = ({ roomId }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [chkLog, setChkLog] = useState(false); // 첫실행시
  const [socketData, setSocketData] = useState();
  const scrollRef = useRef();

  const ws = useRef(null);

  const msgBox = messages.map((v, i) => (
    <div key={i} className={v.name === name ? "user" : "partner"}>
      <div className="info">{v.name}</div>
      <div className="text">{v.message}</div>
      <div>{i.data}</div>
    </div>
  ));

  useEffect(() => {
    if (socketData !== undefined) {
      loadData();
    }
  }, [socketData]);

  const loadData = async () => {
    const tempData = messages.concat(socketData);
    console.log(tempData);
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
    console.log(message);
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
        message,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);

      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMessage("");
  });

  const space = () => {
    console.log(scrollRef.current.scrollTop);
    console.log(scrollRef.current.scrollHeight);
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
      <div id="talk" className="talk room" ref={scrollRef}>
        {msgBox}
      </div>
      <div id="sendZone" className="input">
        <input
          type="text"
          id="msg"
          className="input-text"
          value={message}
          onChange={onText}
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              send();
            }
          }}
        ></input>
        <input type="button" value="보내기" id="btnSend" onClick={send} />
      </div>
    </>
  );
};

export default Chat;
