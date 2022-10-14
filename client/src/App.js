import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AddBooks from "./pages/AddBooks"

import Home from "./pages/Home/Home.jsx";
import Detail from "./pages/Detail/Detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={AddBooks}/>
      <Route exact path="/detail/:id" component={Detail} />
      {/* <Route exact path="/create-book" component={create} /> */}
    </BrowserRouter>
  );
}

export default App;
