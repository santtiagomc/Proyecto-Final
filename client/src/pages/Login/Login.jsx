import { useEffect, useState } from "react";
import { auth, userExist } from "../../firebase/firebase";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";

import style from "./Login.module.css";
import axios from "axios";

export default function Login() {
	const [currentUser, setCurrentUser] = useState(null);
	/*
		State
		0: inicializando
		1: Cargando
		2: login completo
		3: login no registrado
		4: guest 
	*/
	const [state, setCurrentState] = useState(0);

	useEffect(() => {
		setCurrentState(1);
		onAuthStateChanged(auth, handleChangeUser);
	}, []);

	const handleChangeUser = async (user) => {
		if (user) {
			const isRegister = await userExist(user.uid);
			// console.log(isRegister.response.data.messageError);
			// console.log(isRegister);
			if (isRegister.id || isRegister.message) {
				setCurrentState(2);
			} else {
				setCurrentState(3);
			}
		} else {
			setCurrentState(4);
			console.log("noHay");
		}
	};

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

	if (state === 1) {
		return <div className={`${style.container} ${style.ver}`}>Loading...</div>;
	}

	if (state === 2) {
		return (
			<div className={`${style.container} ${style.ver}`}>Ya estas logueado</div>
		);
	}

	if (state === 3) {
		return (
			<div className={`${style.container} ${style.ver}`}>
				Autenticado pero no registardo
			</div>
		);
	}

	// if (state === 4) {
	// 	return <div>.</div>;
	// }

	return (
		<div className={style.container}>
			<label>Correo</label>
			<input type="text"></input>
			<label>Contrasena</label>
			<input type="text"></input>
			<button>Crear</button>
			<hr />
			<button onClick={handleSesionGoogle}>Con google</button>
		</div>
	);
}
