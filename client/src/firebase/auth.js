import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const singUp = (email, password) =>
	createUserWithEmailAndPassword(auth, email, password);

export const singIn = (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

export const userExist = async (uid) => {
	try {
		const res = await axios.get(`http://localhost:3001/user/${uid}`);
		console.log(res.data);
		return res.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
