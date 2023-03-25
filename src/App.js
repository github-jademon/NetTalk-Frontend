import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Main, Product, SignUp, NotFound, SignIn } from "pages";

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            {/* <Route path="/product/*" element={<Product />}></Route> */}
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
