import React from "react";
import { useParams } from "react-router";

const Room = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <div>{id}</div>
      <div></div>
    </div>
  );
};

export default Room;
