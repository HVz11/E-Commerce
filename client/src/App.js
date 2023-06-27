import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import signin from "./user/signin";
import signup from "./user/signup";
import home from "./core/home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={home} />
        <Route path="/signin" exact Component={signin} />
        <Route path="/signup" exact Component={signup} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
