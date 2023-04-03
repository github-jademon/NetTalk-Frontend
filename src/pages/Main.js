import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "pages";

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
    <div className="container">
      <h3 className="title">채팅방 목록</h3>
      {data.map((v, i) => (
        <Link to={"/room/" + v.id} key={i} className="rooms">
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
