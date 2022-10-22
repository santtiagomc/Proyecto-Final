import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../firebase/auth";
import { useHistory } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo.png";
import style from "./NavBar.module.css";

export default function NavBar() {
  const { user } = useSelector(state => state);
  const [show, setShow] = useState(false);
  const history = useHistory();

  let uniqueIdArrayCart
  if (localStorage.length) {
    let repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)]
  }

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
                <button className={style.userBtn}>👤</button>
              </Link>
            </div>
          ) : (
            <div className={style.userBtn}>
              <button onClick={() => setShow(!show)} className={style.userBtn}>
                👤
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
              <button className={style.cart}>🛒{uniqueIdArrayCart && uniqueIdArrayCart.length}</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
