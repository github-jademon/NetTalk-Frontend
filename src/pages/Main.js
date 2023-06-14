import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "pages";
import RoomList from "../assets/RoomList";

const Main = (props) => {
  const [data, setData] = useState();

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
    <div className="main-container">
      <img
        src={`${process.env.PUBLIC_URL}/hi.png`}
        alt=""
        className="advertisement"
      />
      <div className="container">
        <h3 className="title">채팅방 목록</h3>
        {data.map((v, i) => (
          <RoomList key={i} room={v} i={i} />
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Main;
