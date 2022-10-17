import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AddBooks from "./pages/CreateBook/AddBooks";

import Home from "./pages/Home/Home.jsx";
import Detail from "./pages/Detail/Detail.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={AddBooks} />
      <Route exact path="/detail/:id" component={Detail} />
    </BrowserRouter>
  );
}

export default App;
