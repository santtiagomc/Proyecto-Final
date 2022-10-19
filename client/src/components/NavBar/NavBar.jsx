import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../firebase/auth";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo.png";
import style from "./NavBar.module.css";

export default function NavBar() {
	const user = useSelector((state) => state.user);

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
				{!user ? (
					<div>
						<Link to="/login">
							<button className={style.userBtn}>👤</button>
						</Link>
					</div>
				) : (
					<div>
						<button onClick={logOut} className={style.userBtn}>
							👤 logOut
						</button>
					</div>
				)}
				<div>
					<Link to="/cart">
						<button className={style.cart}>🛒</button>
					</Link>
				</div>
			</nav>
		</>
	);
}
