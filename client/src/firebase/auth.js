import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const singUp = async ({ email, password, fullName }) => {
  try {
    const userAuth = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await axios.post("http://localhost:3001/user", {
      id: userAuth.user.uid,
      email,
      fullName,
    });
  } catch (error) {
    console.log(error);
    return "Un error ha ocurrido";
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
    console.log(error);
    return "Un error ha ocurrido";
  }
};

export const logOut = async () => {
  await signOut(auth);
};
