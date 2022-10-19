import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const singUp = async (email, password) => {
	try {
		const userAuth = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(userAuth);
		await axios.post("http://localhost:3001/user", {
			id: userAuth.user.uid,
			fullName: "Facundo Gonzalez",
			email: email,
		});
	} catch (error) {
		console.log(error.message);
	}
};

export const singIn = (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

export const sessionGoogle = async () => {
	const googleProvider = new GoogleAuthProvider();
	await singInGoogle(googleProvider);
};

const singInGoogle = async (googleProvider) => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const userExists = await axios.get(
			`http://localhost:3001/user/${res.user.uid}`
		);

		if (userExists.data.message) {
			await axios.post("http://localhost:3001/user", {
				id: res.user.uid,
				fullName: res.user.displayName,
				email: res.user.email,
			});
		}
	} catch (error) {
		console.error(error);
	}
};

export const logOut = async () => {
	await signOut(auth);
};

// export const userExist = async (user) => {
// 	try {
// 		const res = await axios.get(`http://localhost:3001/user/${user.uid}`);
// 		console.log(res.data);
// 		if (!res.messageError) {
// 			dispatch(userExist(user));
// 		} else {
// 			dispatch(userExist(user));
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return error;
// 	}
// };
