import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useUser() {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (userExist) => {
      setUser(userExist);
      setLoad(false);
    });
  }, []);
  console.log(user);
  return [user.uid, load];
}
