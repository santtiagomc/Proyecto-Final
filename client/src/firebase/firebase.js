import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  // getBytes,
} from "firebase/storage";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,

  authDomain: process.env.REACT_APP_AUTHDOMAIN,

  projectId: process.env.REACT_APP_PROJECTID,

  storageBucket: process.env.REACT_APP_STORAGEBUCKET,

  messagingSenderId: process.env.REACT_APP_MESSASINGSENDERID,

  appId: process.env.REACT_APP_APPID,

  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);

export const userExist = async (uid) => {
  try {
    const res = await axios.get(`/user/${uid}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadFile = async (file, id) => {
  const storageRef = ref(storage, `books-image/${id ? id : uuidv4()}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
};
