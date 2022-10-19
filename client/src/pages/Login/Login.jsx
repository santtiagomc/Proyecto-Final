import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import { singIn, userExist } from "../../firebase/auth";

import style from "./Login.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Login() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [currentState, setCurrentState] = useState(0);
	const userrrr = useSelector((state) => state.user);
	console.log(userrrr);
	/*
		State
		0: inicializando
		1: Cargando
		2: login completo
		3: login no registrado
		4: guest 
	*/

	// const handleChangeUser = async (user) => {
	// 	console.log(user);
	// 	if (user) {
	// 		const isRegister = await userExist(user.uid);
	// 		// console.log(isRegister.response.data.messageError);
	// 		// console.log(isRegister);
	// 		if (isRegister.id || isRegister.message) {
	// 			setCurrentState(2);
	// 		} else {
	// 			setCurrentState(3);
	// 		}
	// 	} else {
	// 		setCurrentState(4);
	// 		console.log("noHay");
	// 	}
	// };

	const handleSesionGoogle = async () => {
		const googleProvider = new GoogleAuthProvider();
		await singInGoogle(googleProvider);
	};

	const singInGoogle = async (googleProvider) => {
		try {
			const res = await signInWithPopup(auth, googleProvider);
			console.log(res.user.email, res.user.displayName, res.user.uid);
			const response = await axios.post("http://localhost:3001/user", {
				id: res.user.uid,
				fullName: res.user.displayName,
				email: res.user.email,
			});
			console.log(res, response.data);
		} catch (error) {
			console.error(error);
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
	// if (state === 4) {
	// 	return <div>.</div>;
	// }

	return (
		<form onSubmit={handleSubmit} className={style.container}>
			<h2>Login</h2>
			<label>Correo</label>
			<input onChange={handleChange} type="text" name="email"></input>
			<label>Contrasena</label>
			<input onChange={handleChange} type="password" name="password"></input>
			<button>Log in</button>
			<hr />
			<button onClick={handleSesionGoogle}>Con google</button>
			<Link to="register">
				<p className={style.ver}>No tienes una cuenta?</p>
			</Link>
		</form>
	);
}
