import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../firebase/auth";
import { useHistory } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo_booksNook_sinmargen.png";
import style from "./NavBar.module.css";
import { getGuestCart, getUserCart } from "../../redux/actions";

export default function NavBar() {
  const { user, cart, postCartResponse } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const navRef = useRef();

  let repeatedIdArrayCart = [];
  let uniqueIdArrayCart = [];
  let quantity = {};
  if (localStorage.length && localStorage.cart) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
    repeatedIdArrayCart.length &&
      repeatedIdArrayCart.forEach((el) => {
        quantity[el] = (quantity[el] || 0) + 1;
      });
  }

  let quantityCart;
  if (user && user.uid && cart.length && !cart.messageError) {
    quantityCart = cart.length;
  }

  useEffect(() => {
    if (user && user.uid) {
      setTimeout(function () {
        dispatch(getUserCart(user.uid));
      }, 400);
    } else {
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
  }, [user, postCartResponse]);

  const handleLogOut = async () => {
    try {
      await logOut();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className={style.nav}>
        <div>
          <Link to="/">
            <img id="logo" src={Logo} alt="bookstore" className={style.logo} />
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className={style.forms}>
          <div>
            <Link to="/create">
              <button className={style.button}>Crear</button>
            </Link>
          </div>
          {!user ? (
            <div>
              <Link to="/login">
                <button className={style.userBtn}>
                  <i className="fa-solid fa-user"></i>
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <button onClick={() => setShow(!show)} className={style.userBtn}>
                <i class="fa-solid fa-user"></i>
              </button>
              <div
                className={`${style.menu} ${show ? style.show : style.hide}`}
              >
                <ul className={style.list}>
                  <Link to="/profile">
                    <li onClick={() => setShow(false)} className={style.text}>
                      Cuenta
                    </li>
                  </Link>
                  <li onClick={handleLogOut} className={style.text}>
                    Cerrar sesion
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div>
            <Link to="/cart">
              <button className={style.cart}>
                <i className="fa-solid fa-cart-shopping"></i>
                {!user
                  ? <div className={style.number}>{uniqueIdArrayCart && uniqueIdArrayCart.length}</div>
                  : <div className={style.number}>{cart && !cart.messageError ? quantityCart : 0}</div>}
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
