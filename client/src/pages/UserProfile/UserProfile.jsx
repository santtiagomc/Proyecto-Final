import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../helpers/useUser";
import axios from "axios";
import Error from "../../components/Error/Error";
import style from "./UserProfile.module.css";
import {
	FaUser,
	FaShoppingCart,
	FaUserEdit,
	ImArrowLeft,
} from "react-icons/all";
import { useHistory } from "react-router-dom";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";
import { logOut } from "../../firebase/auth";
import Avatar from "./avatar.png";

export default function ProfileUser() {
	const [hovered, setHovered] = useState(0);
	const [hidden, setHidden] = useState(false);
	const history = useHistory();
	const [dataUser, setDataUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState({ change: false, edited: false });
	const [user, load] = useUser();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	useEffect(() => {
		const getUser = async (userId) => {
			try {
				const res = await axios.get(`http://localhost:3001/user/${userId}`);
				setDataUser(res.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (!load) getUser(user);
	}, [load, edit.edited]);

	const onSubmit = async (data) => {
		try {
			await axios.put("http://localhost:3001/user", {
				...data,
				id: user,
			});
			setEdit({ ...edit, change: !edit.change, edited: !edit.edited });
		} catch (error) {
			console.log(error);
		}
	};

	if (user === undefined && !loading) {
		return <Error error="No estas autenticado" />;
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
		<div className={style.container}>
			{loading ? (
				<img src={Loader} alt="Logo loader" className={style.loader} />
			) : (
				<>
					<div
						className={
							!hidden ? style.navigation : `${style.navigation} ${style.active}`
						}
					>
						<ul>
							<li onClick={() => history.goBack()}>
								{/* <i className="fa-solid fa-house"></i> */}
								<ImArrowLeft className={style.i} />
								<span className={style.title}>Regresar</span>
							</li>
							<li className={hovered === 1 && style.hovered}>
								<FaUser className={style.i} />
								<span className={style.title}>Perfil</span>
							</li>
							<li className={hovered === 4 && style.hovered}>
								<FaUserEdit className={style.i} />
								<span
									className={style.title}
									onClick={() => setEdit({ ...edit, change: !edit.change })}
								>
									Editar perfil
								</span>
							</li>
							<li className={hovered === 3 && style.hovered}>
								<FaShoppingCart className={style.i} />
								<span className={style.title}>Historial de compras</span>
							</li>
							{/* <li className={hovered === 5 && style.hovered}>
        						<MdPassword className={style.i} />
        						<span className={style.title}>Cambiar contraseña</span>
    						</li> */}
							<li className={hovered === 6 && style.hovered}>
								<i className="fa-solid fa-arrow-right-from-bracket"></i>
								<span onClick={handleLogOut} className={style.title}>
									Cerrar sesión
								</span>
							</li>
						</ul>
					</div>
					<div>
						<div
							className={!hidden ? style.main : `${style.main} ${style.active}`}
						>
							<div className={style.topbar}>
								<div
									className={style.toggle}
									onClick={
										hidden ? () => setHidden(false) : () => setHidden(true)
									}
								>
									<i className="fa-solid fa-bars"></i>
								</div>
								{/* <div className={style.search}>
        					<label>
            				<input type="text" placeholder="Búsque aquí" />
            				<i class="fa-solid fa-magnifying-glass"></i>
        					</label>
    						</div> */}
								<div className={style.logo}></div>
							</div>

							<div>
								<div className={style.option}>
									{!edit.change ? (
										<>
											<div className={style.containerA}>
												<img src={Avatar} className={style.avatar} />
												<p className={style.user}>{dataUser.fullName}</p>
											</div>
											<div className={style.containerP}>
												{/* <label className={style.label}>Nombre: </label>
            								<p className={style.p}>{dataUser.fullName}</p> */}
												<label className={style.label}>
													Email{" "}
												</label>
												<p className={style.p}>{dataUser.email}</p>
												<label className={style.label}>Provincia </label>
												<p className={style.p}>{dataUser?.province}</p>
												<label className={style.label}>Ciudad </label>
												<p className={style.p}>{dataUser?.city}</p>
												<label className={style.label}>Dirección </label>
												<p className={style.p}>{dataUser?.address}</p>
												<label className={style.label}>Código Postal </label>
												<p className={style.p}>{dataUser?.zipCode}</p>
											</div>
										</>
									) : (
										<form
											className={style.form}
											onSubmit={handleSubmit(onSubmit)}
										>
											<input
												className={style.input}
												type="text"
												placeholder="Provincia"
												{...register("province", {
													maxLength: 40,
													value: null,
												})}
											></input>
											{errors.province?.type === "maxLength" && (
												<p className={style.error}>maximo 40</p>
											)}
											<input
												className={style.input}
												type="text"
												placeholder="Ciudad"
												{...register("city", {
													maxLength: 40,
													value: null,
												})}
											></input>
											{errors.city?.type === "maxLength" && (
												<p className={style.error}>maximo 40</p>
											)}
											<input
												className={style.input}
												type="text"
												placeholder="Dirección"
												{...register("address", {
													maxLength: 40,
													value: null,
												})}
											></input>
											{errors.address?.type === "maxLength" && (
												<p className={style.error}>maximo 40</p>
											)}
											<input
												className={style.input}
												type="text"
												placeholder="Código Postal"
												{...register("zipCode", {
													maxLength: 5,
													value: null,
													pattern: /^[0-9]*$/,
												})}
											></input>
											{errors.zipCode?.type === "maxLength" && (
												<p className={style.error}>maximo 5</p>
											)}
											{errors.zipCode?.type === "pattern" && (
												<p className={style.error}>Solo numeros</p>
											)}
											<button className={style.button}>Confirmar</button>
											<button
												className={style.button}
												onClick={() =>
													setEdit({ ...edit, change: !edit.change })
												}
											>
												Cancelar
											</button>
										</form>
									)}
									{/* <div>
<h2>Historial de compras</h2>
<h4>Compra 1</h4>
<h4>Compra 2</h4>
<h4>Compra 3</h4>
<button>Ver todas 🛒</button>
</div> */}
									<br></br>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
