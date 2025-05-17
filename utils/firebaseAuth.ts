import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig";
import { login } from "@/store/user/userSlice";
import { store } from "@/store/store";

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  const auth = getAuth();

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await setDoc(doc(db, "users", user.uid), {
    name: name,
    email: email,
    createdAt: new Date(),
  });

  await updateProfile(userCredential.user, {
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

  store.dispatch(
    login({
      name: user.displayName || "",
      email: user.email || "",
      uid: user.uid,
      createdAt: user.metadata?.creationTime || "",
    })
  );

  return user;
}

export const logoutUser = () => signOut(auth);
