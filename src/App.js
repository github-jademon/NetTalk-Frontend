import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Main, Room, SignUp, NotFound, SignIn, Mypage } from "pages";
import CreateRoom from "pages/CreateRoom";

const App = () => {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/createRoom" element={<CreateRoom />}></Route>
            <Route path="/room/:id" element={<Room />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
