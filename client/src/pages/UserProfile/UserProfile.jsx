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
import { Link } from "react-router-dom";

export default function ProfileUser() {
	const [hovered, setHovered] = useState(0);
	const [hidden, setHidden] = useState(false);
	const [dataUser, setDataUser] = useState({});
	const [booksBuyed, setBooksBuyed] = useState({});
	const [loading, setLoading] = useState(true);
	const [edit, setEdit] = useState({ change: false, edited: false });
	const [user, load] = useUser();
	const [page, setPage] = useState(0);
	const history = useHistory();
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
				const userHistory = await axios.get(
					`http://localhost:3001/cart/${userId}-0`
				);
				setBooksBuyed(userHistory.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};

		if (!load) getUser(user);
	}, [load, edit.edited, user]);

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

	const nextPage = async () => {
		console.log("a");
		console.log(booksBuyed.total);
		if (page + 5 < booksBuyed.total) {
			console.log("xd");
			setPage(page + 5);
			try {
				const userHistory = await axios.get(
					`http://localhost:3001/cart/${user}-${page + 5}`
				);
				console.log(userHistory);
				setBooksBuyed({
					...booksBuyed,
					books: [...booksBuyed.books, ...userHistory.data.books],
				});
			} catch (error) {
				console.log(error);
			}
		}
	};
	console.log(booksBuyed);
	const handleLogOut = async () => {
		try {
			await logOut();
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	if (user === undefined && !loading) {
		return <Error error="No estas autenticado" />;
	}

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
												<img
													src={Avatar}
													className={style.avatar}
													alt="avatar"
												/>
												<p className={style.user}>{dataUser.fullName}</p>
											</div>
											<div className={style.containerP}>
												{/* <label className={style.label}>Nombre: </label>
												<p className={style.p}>{dataUser.fullName}</p> */}
												<hr/>
												<label className={style.label}>E-mail</label>
												<p className={style.p}>{dataUser.email}</p>
												<hr/> 
												<label className={style.label}>Provincia</label>
												<p className={style.p}>{dataUser?.province}</p>
												<hr/>
												<label className={style.label}>Ciudad</label>
												<p className={style.p}>{dataUser?.city}</p>
												<hr/>
												<label className={style.label}>Dirección</label>
												<p className={style.p}>{dataUser?.address}</p>
												<hr/>
												<label className={style.label}>Código Postal</label>
												<p className={style.p}>{dataUser?.zipCode}</p>
												<hr/>
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
									<br></br>
								</div>
							</div>
							{/* {lo pongo por aca por ahora, despues muevanlo a donde quieran} */}
							<div className={style.shopping}>
								<h2 className={style.misCompras}>Mis compras</h2>
								{booksBuyed.books &&
									booksBuyed.books.map((book) => (
										<div>
											<h3 className={style.status}>{book.status}</h3>
											<div>
												<hr/>
												{book.Books.map((purchase) => (
													<div>
														<img src={purchase.image} className={style.portada} />
														<h3 className={style.name}>{purchase.name}</h3>
														<p className={style.info}>
															{purchase.price * purchase.Books_Carts.quantity}
														</p>
														<p className={style.info}>Cantidad {purchase.Books_Carts.quantity}</p>
														<Link to={`/detail/${purchase.id}`}>Detalle</Link>
													</div>
												))}
											</div>
											<hr />
										</div>
									))}
								<button onClick={nextPage} className={style.btn}>Ver más</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
