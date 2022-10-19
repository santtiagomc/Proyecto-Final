import { useState } from "react";
import { sessionGoogle, singIn } from "../../firebase/auth";

import style from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleGoogle = async () => {
		try {
			await sessionGoogle();
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = ({ target: { name, value } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userLog = await singIn(user.email, user.password);
			console.log(userLog);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={style.container}>
				<h2>Login</h2>
				<label>Correo</label>
				<input onChange={handleChange} type="text" name="email"></input>
				<label>Contrasena</label>
				<input onChange={handleChange} type="password" name="password"></input>
				<button>Log in</button>
				<hr />
			</form>
			<button onClick={handleGoogle}>Con google</button>
			<Link to="register">
				<p className={style.ver}>No tienes una cuenta?</p>
			</Link>
		</>
	);
}
