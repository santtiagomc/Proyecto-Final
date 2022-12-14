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
  let response = await axios.post("/user", {
    id: userAuth.user.uid,
    email,
    fullName,
  });
  return response.data
};

export const singIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const sessionGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  let response = await singInGoogle(googleProvider);
  return response
};

export const singInGoogle = async (googleProvider) => {
  const res = await signInWithPopup(auth, googleProvider);
  const userExists = await axios.get(
    `/user/${res.user.uid}`
  );

  if (userExists.data.message) {
    await axios.post("/user", {
      id: res.user.uid,
      fullName: res.user.displayName,
      email: res.user.email,
    });
  }
};

export const logOut = async () => {
  await signOut(auth);
};
