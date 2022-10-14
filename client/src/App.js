import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AddBooks from "./pages/AddBooks"

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/create" component={AddBooks}/>
    </BrowserRouter>
  );
}

export default App;
