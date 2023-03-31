import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Loader, Socket } from "pages";
import axios from "axios";

const Room = ({ user, setUser }) => {
  const [data, setData] = useState();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!data) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const response = await axios
      .get("/api/rooms/" + id)
      .catch((err) => console.log(err));
    console.log(response.data);
    setData(response.data);
  };

  return data && user ? (
    <div className="container room">
      <div className="title">
        {data.id}. {data.title}
      </div>
      <div>{data.comment}</div>
      <hr />
      {/* <Socket useremail={user.email} username={user.userid} id={id} /> */}
      <Socket />
    </div>
  ) : (
    <Loader />
  );
};

export default Room;
