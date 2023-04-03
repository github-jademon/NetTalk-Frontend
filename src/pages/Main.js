import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "pages";

const Main = (props) => {
  const [data, setData] = useState();
  const [name, setName] = useState("adf");
  const [uuid, setUuid] = useState();

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios
      .get("/api/rooms")
      .catch((err) => console.log(err));
    setData(response.data);
  };

  return data ? (
    <div className="container">
      <h3 className="title">채팅방 목록</h3>
      {data.map((v, i) => (
        <Link
          to={"/room/" + v.id}
          state={{ name: name, uuid: uuid }}
          key={i}
          className="rooms"
        >
          <div className="number">{i + 1}</div>
          <div className="title">{v.title}</div>
          <div className="comment">{v.comment}</div>
          <div className="count">
            {v.userCount} / {v.maxCount}
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default Main;
