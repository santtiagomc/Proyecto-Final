import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userExist } from "./redux/actions";
import { BrowserRouter, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home/Home";
import CreateBook from "./pages/CreateBook/CreateBook";
import Detail from "./pages/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
<<<<<<< HEAD
import ProfileUser from "./pages/ProfileUser/ProfileUser"
=======
import Register from "./pages/Register/Register";
>>>>>>> 14ff7d6c670c75a8abcacafa84a9922a3b1d8e97

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			dispatch(userExist(user));
		});
	}, [dispatch]);

	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path="/" component={Home} />
			<Route exact path="/create" component={CreateBook} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/detail/:id" component={Detail} />
			<Route path="/cart" component={Cart}/>
			<Route path="/Perfil" component={ProfileUser} />
		</BrowserRouter>
	);
}

export default App;
