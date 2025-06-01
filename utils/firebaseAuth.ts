import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { store } from "@/store/store";
import { login } from "@/store/user/userSlice";

import { db } from "./firebaseConfig";
import { auth } from "./firebaseConfig";


export const register = async (
  email: string,
  password: string,
  name: string,
  gender: string
) => {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    name,
    email,
    createdAt: new Date(),
    gender,
  });

  await updateProfile(user, {
    displayName: name,
  });

  return userCredential;
};

export async function loginUser(email: string, password: string) {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  const docRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(docRef);
  const gender = userDoc.exists() ? userDoc.data()?.gender || "" : "";

  store.dispatch(
    login({
      name: user.displayName || "",
      email: user.email || "",
      uid: user.uid,
      createdAt: user.metadata?.creationTime || "",
      gender: gender,
    })
  );

  return user;
}
export const logoutUser = () => signOut(auth);

export const completeGoogleUserProfile = async (
  uid: string,
  name: string,
  gender: string
) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, {
    name,
    gender,
    createdAt: new Date(),
    email: auth.currentUser?.email || "",
  });

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    store.dispatch(
      login({
        uid,
        name,
        gender,
        email: auth.currentUser.email || "",
        createdAt: auth.currentUser.metadata?.creationTime || "",
      })
    );
  }
};
