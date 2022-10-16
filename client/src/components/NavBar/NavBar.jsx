import React from "react";
import { Link } from "react-router-dom";
import style from "../../styles/NavBar.module.css";
import Logo from "./Logo.png";
import SearchBar from "../SearchBar/SearchBar";

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
					<Link to="">
						<button className={style.userBtn}>User</button>
					</Link>
				</div>
				<div>
					<Link to="">
						<button className={style.cart}>Cart</button>
					</Link>
				</div>
			</nav>
		</>
	);
}
