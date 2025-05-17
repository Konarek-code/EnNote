import { useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/user/userSlice";

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email ?? "",
            name: "",
            createdAt: user.metadata.creationTime || new Date().toISOString(),
          })
        );
        console.log("Firebase createdAt:", user.metadata.creationTime);
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, []);

  return children;
};

export default AuthProvider;
