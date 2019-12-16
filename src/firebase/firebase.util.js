import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBHC8jpAOAfpci8-NRw0rbmB3oyrgHpVh4",
  authDomain: "react-ecommerce-c9395.firebaseapp.com",
  databaseURL: "https://react-ecommerce-c9395.firebaseio.com",
  projectId: "react-ecommerce-c9395",
  storageBucket: "react-ecommerce-c9395.appspot.com",
  messagingSenderId: "1078574276413",
  appId: "1:1078574276413:web:fdb91b63f4393278ad2f54",
  measurementId: "G-7KW2WDPH5H"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return null;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (err) {
      console.log("Error creating user", err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
