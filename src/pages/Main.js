import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "title1",
    userCount: 1,
    maxCount: 10,
    comment: "comment1",
  },
  {
    id: 2,
    title: "title2",
    userCount: 2,
    maxCount: 10,
    comment: "comment2",
  },
  {
    id: 3,
    title: "title3",
    userCount: 3,
    maxCount: 10,
    comment: "comment3",
  },
  {
    id: 4,
    title: "title4",
    userCount: 4,
    maxCount: 10,
    comment: "comment4",
  },
  {
    id: 5,
    title: "title5",
    userCount: 5,
    maxCount: 10,
    comment: "comment5",
  },
  {
    id: 6,
    title: "title6",
    userCount: 6,
    maxCount: 10,
    comment: "comment6",
  },
];

const Main = (props) => {
  // const [data, setData] = useState([]);

  return (
    <div className="container">
      <h3>안녕하세요. 메인페이지 입니다.</h3>
      {data.map((v, i) => (
        <Link to={"/room/" + v.id} key={i} className="room">
          <div>{i + 1}</div>
          <div>{v.title}</div>
          <div>{v.userCount}</div>
          <div>{v.maxCount}</div>
          <div>{v.comment}</div>
        </Link>
      ))}
    </div>
  );
};

export default Main;
