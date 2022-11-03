import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../firebase/auth";
import { useHistory } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo_booksNook_sinmargen.png";
import style from "./NavBar.module.css";
import { getGuestCart, getUserCart } from "../../redux/actions";
import { AiFillHome } from "react-icons/ai";

export default function NavBar() {
  const { user, cart, postCartResponse, userDb, postCheckoutResponse } =
    useSelector((state) => state);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
  if (user && user.uid && cart && cart.length && !cart.messageError) {
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
  }, [dispatch, user, postCartResponse, postCheckoutResponse]);

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
      <nav
        className={
          pathname === "/admin" || pathname === "/profile"
            ? `${style.nav} ${style.none}`
            : style.nav
        }
      >
        <div>
          <Link to="/landing">
            <img id="logo" src={Logo} alt="bookstore" className={style.logo} />
          </Link>
        </div>
        <div>
          <SearchBar />
        </div>
        <div className={`${style.forms} ${isOpen && style.open}`}>
          {!user ? (
            <>
              <div>
                <Link to="/login" className={style.aa}>
                  <button className={style.guestBtn}>
                    Iniciar sesión
                    {/* <i className="fa-solid fa-user"></i> */}
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/cart" className={style.aa}>
                  <button className={style.cart}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    {!user ? (
                      <div className={style.number}>
                        {uniqueIdArrayCart && uniqueIdArrayCart.length}
                      </div>
                    ) : (
                      <div className={style.number}>
                        {cart && !cart.messageError ? quantityCart : 0}
                      </div>
                    )}
                  </button>
                </Link>
              </div>
            </>
          ) : userDb ? (
            userDb.role === "Admin++" || userDb.role === "Admin" ? (
              <div>
                <Link to="/admin" className={style.aa}>
                  <button className={style.buttonDash}>Dashboard</button>
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => setShow(!show)}
                    className={style.userBtn}
                  >
                    <i class="fa-solid fa-user"></i>
                  </button>
                  <div
                    className={`${style.menu} ${show ? style.show : style.hide
                      }`}
                  >
                    <ul className={style.list}>
                      <Link to="/profile" className={style.aa}>
                        <li
                          onClick={() => setShow(false)}
                          className={style.text}
                        >
                          Mi cuenta
                        </li>
                      </Link>
                      <li onClick={handleLogOut} className={style.text}>
                        Cerrar sesión
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <Link to="/cart" className={style.aa}>
                    <button className={style.cart}>
                      <i className="fa-solid fa-cart-shopping"></i>
                      {!user ? (
                        <div className={style.number}>
                          {uniqueIdArrayCart && uniqueIdArrayCart.length}
                        </div>
                      ) : (
                        <div className={style.number}>
                          {cart && !cart.messageError ? quantityCart : 0}
                        </div>
                      )}
                    </button>
                  </Link>
                </div>
              </>
            )
          ) : null}
          <Link to="/home">
            <AiFillHome className={style.homeIcon} />
          </Link>
        </div>

        <div
          className={`${style.navToggle} ${isOpen && style.open}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={style.bar}></div>
        </div>
      </nav>
    </>
  );
}
