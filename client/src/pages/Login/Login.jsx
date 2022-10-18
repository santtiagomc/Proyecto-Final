import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";

import style from "./Login.module.css";

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

	const handleChangeUser = (user) => {
		if (user) {
			setCurrentState(3);
			console.log(user.displayName);
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
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	};

	if (state === 1) {
		return <div className={style.container}>Loading...</div>;
	}

	if (state === 3) {
		return (
			<div className={style.container}>Autenticado pero no registardo</div>
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
