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
      <h3 className="title">안녕하세요. 메인페이지 입니다.</h3>
      {data.map((v, i) => (
        <Link to={"/room/" + v.id} key={i} className="rooms">
          <div>{i + 1}</div>
          <div>{v.title}</div>
          <div>{v.userCount}</div>
          <div>{v.maxCount}</div>
          <div>{v.comment}</div>
        </Link>
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default Main;
