import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../firebase/auth";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "./Logo.png";
import style from "./NavBar.module.css";

export default function NavBar() {
	const user = useSelector((state) => state.user);
	const [show, setShow] = useState(false);

	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	const handleShow = () => {
		show ? setShow(false) : setShow(true);
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
							<button onClick={handleShow} className={style.userBtn}>
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
							<button className={style.cart}>🛒</button>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
}
