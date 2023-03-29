import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Main, Room, SignUp, NotFound, SignIn } from "pages";

const App = () => {
  const [user, setUser] = useState({
    username: "",
    useremail: "",
  });
  return (
    <>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <div className="main">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            {/* <Route path="/product/*" element={<Product />}></Route> */}
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/room/:id"
              element={<Room user={user} setUser={setUser} />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
