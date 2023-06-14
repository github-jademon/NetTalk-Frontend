import React from "react";

const Main = ({ room, i }) => {
  const [openRoom, setOpenRoom] = React.useState(false);

  return (
    <>
      <div className="rooms" onClick={() => setOpenRoom(true)}>
        <div className="number">{i + 1}</div>
        <div className="title">{room.title}</div>
        <div className="comment">{room.comment}</div>
      </div>
      {openRoom ? (
        <div className="input-modal" onClick={() => setOpenRoom(false)}>
          <div className="input-name-container">
            <div className="title">{room.title}</div>
            <div>{room.comment}</div>
            <input
              type="button"
              value="참가하기"
              onClick={() => {
                window.location.href = "/room/" + room.id;
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Main;
