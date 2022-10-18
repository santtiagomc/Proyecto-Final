import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";

export default function NavBar() {
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
				<div>
					<Link to="/create">
						<button className={style.button}>Crear</button>
					</Link>
				</div>
				<div>
					<Link to="/login">
						<button className={style.userBtn}>👤</button>
					</Link>
				</div>
				<div>
					<Link to="/cart">
						<button className={style.cart}>🛒</button>
					</Link>
				</div>
			</nav>
		</>
	);
}
