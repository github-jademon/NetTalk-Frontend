import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Loader, Socket } from "pages";
import axios from "axios";

const Room = ({ user, setUser }) => {
  const [data, setData] = useState();
  const params = useParams();
  const id = params.id;

  const token = localStorage.getItem("token");
  // const [username, setUsername] = useState("test");
  // const [useremail, setUseremail] = useState("test");

  useEffect(() => {
    if (!data) {
      loadData();
      // loadUser();
    }
  }, []);

  const loadData = async () => {
    const response = await axios
      .get("/api/rooms/" + id)
      .catch((err) => console.log(err));
    console.log(response.data);
    setData(response.data);
  };

  // const loadUser = async () => {
  //   const response = await axios
  //     .get("/api/user/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .catch((err) => console.log(err));
  //   if (response.data.statusCode !== 200) {
  //     alert(response.data.responseMessage);
  //   } else {
  //     console.log(response.data);
  //     console.log("userload");
  //     setUsername(response.data.data.userid);
  //     setUseremail(response.data.data.email);
  //     console.log(username, data);
  //   }
  // };

  return data && user ? (
    <div className="container room">
      <div className="title">
        {data.id}. {data.title}
      </div>
      <div>{data.comment}</div>
      <hr />
      <Socket useremail={user.email} username={user.userid} />
    </div>
  ) : (
    <Loader />
  );
};

export default Room;
