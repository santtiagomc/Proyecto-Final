import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	getStorage,
	// ref,
	// uploadBytes,
	// getDownloadURL,
	// getBytes,
} from "firebase/storage";
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
const storage = getStorage(app);
// const analytics = getAnalytics(app);

// export const userExist = async (uid) => {
//   const docRef = // consulta a db
// }