import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Loader } from "pages";
import axios from "axios";

const Room = () => {
  const [data, setData] = useState();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await axios
      .get("/api/rooms/" + id)
      .catch((err) => console.log(err));
    console.log(response.data);
    setData(response.data);
  };

  return data ? (
    <div className="container room">
      <div className="title">
        {data.id}. {data.title}
      </div>
      <div>{data.comment}</div>
      <hr />
      <div className="talk">
        <div className="partner">
          <div className="info">ㅎㅇ</div>
          <div className="text">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
        </div>
        <div className="user">
          <div className="info">ㅎㅇ</div>
          <div className="text">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
        </div>
        <div className="user">
          <div className="info">ㅎㅇ</div>
          <div className="text">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
        </div>
      </div>
      <div className="input">
        <input type="text" className="input-text" />
        <input type="button" value="보내기" />
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Room;
