import { useState } from "react";
import { sessionGoogle, singUp } from "../../firebase/auth";

import style from "./Register.module.css";

export default function Register() {
	const [user, setUser] = useState({
		email: "",
		password: "",
		fullName: "",
		province: "",
		city: "",
		zipCode: "",
		address: "",
	});
	const [error, setError] = useState({
		email: "",
		password: "",
		fullName: "",
		province: "",
		city: "",
		zipCode: "",
		address: "",
	});

	const handleChange = ({ target: { name, value } }) => {
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userAuth = await singUp(user.email, user.password);
	};

	const handleSignInGoogle = async () => {
		try {
			await sessionGoogle();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={style.container}>
				<div className={style.inputContainer}>
					<label className={style.label}>Email</label>
					<input onChange={handleChange} type="text" name="email"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Contrasena</label>
					<input onChange={handleChange} type="text" name="password"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Nombre Completo</label>
					<input onChange={handleChange} type="text" name="fullName"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Provincia</label>
					<input onChange={handleChange} type="text" name="province"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Ciudad</label>
					<input onChange={handleChange} type="text" name="city"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Codigo Postal</label>
					<input onChange={handleChange} type="text" name="zipCode"></input>
				</div>
				<div className={style.inputContainer}>
					<label className={style.label}>Direccion</label>
					<input onChange={handleChange} type="text" name="address"></input>
				</div>
				<button>Crear</button>
			</form>
			<div className={style.register}>
				<button onClick={handleSignInGoogle}>Con google</button>
			</div>
		</>
	);
}
