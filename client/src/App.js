import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreateBook from "./pages/CreateBook/CreateBook";
import Detail from "./pages/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path="/" component={Home} />
			<Route exact path="/create" component={CreateBook} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/detail/:id" component={Detail} />
		</BrowserRouter>
	);
}

export default App;
