import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cards from "./components/Cards/Cards";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Cards />
    </BrowserRouter>
  );
}

export default App;
