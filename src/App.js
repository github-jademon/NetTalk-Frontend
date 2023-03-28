import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Main, Room, SignUp, NotFound, SignIn } from "pages";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <div className="main">
            <Routes>
              <Route path="/" element={<Main />}></Route>
              {/* <Route path="/product/*" element={<Product />}></Route> */}
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/room/:id" element={<Room />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
