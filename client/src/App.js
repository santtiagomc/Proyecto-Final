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
import ProfileUser from "./pages/ProfileUser/ProfileUser";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer"

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
      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={ProfileUser} />
      <Route path="/edit/:id" component={CreateBook} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
