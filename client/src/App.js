import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userExist } from "./redux/actions";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./pages/Home/Home";
import CreateBook from "./pages/CreateBook/CreateBook";
import Detail from "./pages/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import Stripe from "./pages/Stripe/Stripe";
import Dashboard from "./pages/Dashboard/Dashboard";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserProfile from "./pages/UserProfile/UserProfile";


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
      <Switch>
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/" component={Home} />
        <Route exact path="/create" component={CreateBook} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route path="/detail/:id" component={Detail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/stripe" component={Stripe} />
        <Route exact path="/profile" component={UserProfile} />
        <Route path="/edit/:id" component={CreateBook} />
        <Route exact path="/admin" component={Dashboard} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
