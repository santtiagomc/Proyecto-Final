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
  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  await axios.post("http://localhost:3001/user", {
    id: userAuth.user.uid,
    email,
    fullName,
  });
};

export const singIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const sessionGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  console.log(googleProvider);
  await singInGoogle(googleProvider);
};

const singInGoogle = async (googleProvider) => {
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
};

export const logOut = async () => {
  await signOut(auth);
};
